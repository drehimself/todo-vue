import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: true,
    filter: 'all',
    todos: [],
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    },
    updateLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    retrieveTodos(context) {
      context.commit('updateLoading', true)
      db.collection('todos').get()
      .then(querySnapshot => {
        let tempTodos = []
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed,
            timestamp: doc.data().timestamp,
          }
          tempTodos.push(data)
        })

        context.commit('updateLoading', false)
        const tempTodosSorted = tempTodos.sort((a, b) => {
          return a.timestamp.seconds - b.timestamp.seconds
        })

        context.commit('retrieveTodos', tempTodosSorted)
      })
    },
    addTodo(context, todo) {
      db.collection('todos').add({
        title: todo.title,
        completed: false,
        timestamp: new Date(),
      })
      .then(docRef => {
        context.commit('addTodo', {
          id: docRef.id,
          title: todo.title,
          completed: false,
        })
      })

    },
    updateTodo(context, todo) {
      db.collection('todos').doc(todo.id).set({
        // id: todo.id,
        title: todo.title,
        completed: todo.completed,
        timestamp: todo.timestamp,
      })
      .then(() => {
        context.commit('updateTodo', todo)
      })
    },
    deleteTodo(context, id) {
      db.collection('todos').doc(id).delete()
        .then(() => {
          context.commit('deleteTodo', id)
        })
    },
    checkAll(context, checked) {
      db.collection('todos').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            completed: checked
          })
          .then(() => {
            context.commit('checkAll', checked)
          })
        })
      })
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    clearCompleted(context) {
      db.collection('todos').where('completed', '==', true).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            .then(() => {
              context.commit('clearCompleted')
            })
          })
        })
    }
  }
})

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filter: "all",
        todos: [
            {
                id: 1,
                title: "Be awesome",
                date: "7:00 AM",
                completed: true,
                editing: false
            },
            {
                id: 2,
                title: "Grab cup of coffee",
                date: "9:00 AM",
                completed: false,
                editing: false
            },
            {
                id: 3,
                title: "Practise Vue.js",
                date: "11:30 AM",
                completed: false,
                editing: false
            },
            {
                id: 4,
                title: "Design something",
                date: "14:00 PM",
                completed: false,
                editing: false
            },
            {
                id: 5,
                title: "Meet John Doe",
                date: "16:00 PM",
                completed: false,
                editing: false
            }
        ]
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos[index] = todo;
        },
        removeTodo(state, index) {
            state.todos.splice(index, 1);
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state) {
            state.todos.forEach(function(todo) {
                todo.completed = true;
            });
        },
        uncheckAll(state) {
            state.todos.forEach(function(todo) {
                todo.completed = false;
            });
        }
    },
    actions: {
        updateTodo(context, todo) {
            context.commit('updateTodo', todo);
        }
    }
});
<template v-cloak>
    <div>
        <div class="input-wrapper">
            <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo" />
            <button class="btn" @click="addTodo" :disabled="!newTodo">Add</button>
        </div>
        <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
                <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label">{{ todo.title }}</div>
                <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" placeholder="Enter something" autofocus />
                <!--<a v-bind:style="[todo.completed ? {'text-decoration': 'line-through'} : '']" v-on:click="todo.completed = !todo.completed">{{ todo.title }}</a>-->
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &#x2715;
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todo-list',
        data() {
            return {
                newTodo: '',
                idForTodo: 4,
                todos: [
                    {
                        id: 1,
                        title: 'Finish Vue.js practise',
                        completed: false,
                        editing : false
                    },
                    {
                        id: 2,
                        title: 'Take over world',
                        completed: false,
                        editing : false
                    },
                    {
                        id: 3,
                        title: 'Beat Istanbul',
                        completed: false,
                        editing : false
                    }
                ]
            }
        },
        methods: {
            addTodo() {
                if(this.newTodo !== '' || this.newTodo !== null) { // already secured it via :disabled but just in case
                    this.todos.push({
                        id: this.idForTodo,
                        title: this.newTodo,
                        completed: false,
                        editing : false
                    });

                    this.newTodo = '';
                    this.idForTodo++;
                }
            },
            editTodo(todo) {
                todo.editing = true;
            },
            doneEdit(todo) {
                if(todo.title !== '') {
                    todo.editing = false;
                }
            },
            removeTodo(index) {
                this.todos.splice(index, 1);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .input-wrapper {
        display: flex;
        padding-bottom: 1rem;
    }

    .todo-input {
        width: 100%;
        font-size: 1em;
        padding: .75rem;
        border: 1px solid #1c1c1c;
        background-color: #fff;
        border-radius: 0;
        margin: 0 1em 0 0;
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        font-size: 1em;
        padding: .75rem;
        border: 1px solid #fff;
    }

    .todo-item-edit {
        font-size: 1em;
        padding: .75rem;
        border: 1px solid #1c1c1c;
    }

    button {
        border-radius: 0;
        margin: 0;
        border: 0;
        cursor: pointer;
        font-size: 1em;
    }

    button:disabled {
        cursor: not-allowed;
    }

    .btn {
        padding: .75rem 1rem;
        color: #fff;
        background-color: #4ada99;
    }

    .btn:not(:disabled):hover {
        background-color: #25b373;
    }

    a {
        cursor: pointer;
    }

    .todo-item {
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 1rem;
    }

    .remove-item:hover {
        color: #000;
    }
</style>

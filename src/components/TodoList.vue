<template v-cloak>
    <div class="animated fadeIn">
        <div class="input-wrapper">
            <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo" />
            <input type="text" class="todo-input-date" placeholder="When?" v-model="date" />
            <button class="btn" @click="addTodo" :disabled="!newTodo">Add</button>
        </div>
        <div class="filters">
          <a :class="{active: filter === 'all'}" @click="changeFilter('all')">All</a>
          <a :class="{active: filter === 'completed'}" @click="changeFilter('completed')">Completed</a>
          <a :class="{active: filter === 'uncompleted'}" @click="changeFilter('uncompleted')">Uncompleted</a>
        </div>
        <h3>Todos</h3>
        <div v-if="todos.length > 0">
            <!--<hr>-->
            <span class="tip">Pro tip: Double click to edit item.</span>
            <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" />
            </transition-group>
            <hr>
            <div class="extra-container">
                <a @click="checkAll" v-if="remaining > 0">
                  <span>Check all</span>
                </a>
                <a @click="uncheckAll" v-else>
                  <span>Uncheck all</span>
                </a>
                <span v-if="filter === 'all'">{{todosFiltered.length}} items</span>
                <span v-else-if="filter === 'completed'">{{todosFiltered.length}} item(s) completed</span>
                <span v-else-if="filter === 'uncompleted'">{{remaining}} item(s) left</span>
            </div>
        </div>
        
        <div v-else class="todo-item-label">All done!</div>
    </div>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
  name: "todo-list",
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: "",
      date: "",
      idForTodo: 6,
      filter: "all",
      /*todos: this.$store.state.todos*/
    };
  },
  computed: {
      todos() {
          return this.$store.state.todos
      },
    remaining() {
      return this.$store.state.todos.filter(todo => !todo.completed).length;
    },
    todosFiltered() {
      if ("completed" === this.$store.state.filter) {
        return this.$store.state.todos.filter(todo => todo.completed);
      } 
      else if ("uncompleted" === this.$store.state.filter) {
        return this.$store.state.todos.filter(todo => !todo.completed);
      } 
      else {
        return this.$store.state.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo !== "" && this.newTodo !== null) {
        // already secured it via :disabled but just in case

          this.$store.commit('addTodo', {
              id: this.idForTodo,
              title: this.newTodo,
              date: this.date,
              completed: false,
              editing: false
          });

        this.newTodo = "";
        this.date = "";
        this.idForTodo++;
      }
    },
    checkAll() {
      this.$store.commit('checkAll');
    },
    uncheckAll() {
        this.$store.commit('uncheckAll');
    },
    changeFilter(filter) {
      this.$store.commit('updateFilter', filter);
    }
  }
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css);

.input-wrapper {
  display: flex;
  padding-bottom: 1rem;
}

.todo-input {
  width: 70%;
  font-size: 1em;
  padding: 0.75rem;
  border: 1px solid #1c1c1c;
  background-color: #fff;
  border-radius: 0;
  margin: 0 1em 0 0;
}

.todo-input-date {
  width: 30%;
  font-size: 1em;
  padding: 0.75rem;
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
  padding: 0.75rem;
  border: 1px solid #fff;
}

.todo-item-edit {
  font-size: 1em;
  padding: 0.75rem;
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
  padding: 0.75rem 1rem;
  color: #fff;
  background-color: #4ada99;
}

.btn:not(:disabled):hover {
  background-color: #25b373;
}

a {
  color: #4ada99;
  cursor: pointer;
}

a.active {
  border-bottom: 2px solid #4ada99;
  padding-bottom: 4px;
  cursor: pointer;
}

.todo-item,
.extra-container {
  /*margin-bottom: 1em;*/
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

.completed {
  text-decoration: line-through;
  color: #c3cdd6;
}

.todo-date {
  color: grey;
}

.tip {
  font-size: 12px;
  font-style: italic;
}

.filters a {
  margin-right: 1em;
}

/* Checkbox */
.check {
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 18px;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}

/*.check:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}*/

.check svg {
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #c8ccd4;
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
}

.check svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}

.check svg polyline {
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
}

.check:hover:before {
  opacity: 1;
}

.check:hover svg {
  stroke: #4ada99;
}

.cbx:checked + .check svg {
  stroke: #4ada99;
}

.cbx:checked + .check svg path {
  stroke-dashoffset: 60;
  transition: all 0.3s linear;
}

.cbx:checked + .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.2s linear;
  transition-delay: 0.15s;
}
</style>
<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <!--<input type="checkbox" v-model="todo.completed">-->
            <input type="checkbox" class="cbx" :id="todo.id" style="display: none;" v-model="todo.completed">
            <label :for="todo.id" class="check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
            <div v-if="!todo.editing" @dblclick="editTodo" class="todo-item-label" :class="{completed: todo.completed}">{{ todo.title }}</div>
            <input v-else type="text" class="todo-item-edit" placeholder="Enter something" v-model="todo.title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
        </div>
        <div>
            <span class="todo-date">{{todo.date}}</span>
            <span class="remove-item" @click="removeTodo(index)">&#x2715;</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      todoTitleCopy: ''
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    editTodo() {
      this.todoTitleCopy = this.todo.title;
      this.todo.editing = true;
    },
    doneEdit() {
      if (this.todo.title === "") {
        this.todo.title = this.todoTitleCopy;
      }
      this.todo.editing = false;

      this.$emit("doneEdit", [this.index, this.todo]);
    },
    cancelEdit() {
      this.todo.title = this.todoTitleCopy;
      this.todo.editing = false;
    },
    removeTodo(index) {
      this.$emit("removeTodo", index);
    }
  }
};
</script>
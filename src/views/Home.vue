<template>
  <Glass-container>
    <Time-container
      v-model:time="editTotalTime"
      @handleCount="countInerval"
      @handleReset="resetTime"
      @handleTime="setTime"
      :isCount="isCount"
      :todoName="todoName"
      :formatTime="formatTime"
    />
    <Todo-container
      v-model:title="inputValue"
      v-model:edit-title="editValue"
      @handleAddTodo="addTodo"
      @handleDoing="doingTodo"
      @handleDone="doneEdit"
      @handleEdit="edit"
      @handleCancel="cancelEdit"
      @handleDelete="deleteTodo"
      @handleReturn="returnTodo"
      @handleDeleteFinish="deleteFinishTodo"
      :todos="todos"
      :finishTodo="finishTodo"
      :cacheTodo="cacheTodo"
      :todoName="todoName"
    />
    <!-- audio -->
    <audio ref="audio">
      <source src="@/assets/audio/clock.mp3" />
    </audio>
  </Glass-container>
</template>
<script>
import GlassContainer from "@/components/GlassContainer.vue";
import TimeContainer from "@/components/TimeContainer.vue";
import TodoContainer from "@/components/TodoContainer.vue";
import bus from "@/bus/bus";
export default {
  name: "Home",
  components: { GlassContainer, TimeContainer, TodoContainer },
  data() {
    return {
      totalTime: JSON.parse(localStorage.getItem('totalTime')) || 1500,
      editTotalTime: 0,
      isCount: false,
      time: null,
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      finishTodo: JSON.parse(localStorage.getItem("finishTodo")) || [],
      cacheTodo: {},
      cacheID: Number,
      inputValue: "",
      editValue: "",
      todoName: "What's next to do?",
    };
  },
  methods: {
    countInerval() {
      if (this.todoName !== "What's next to do?") {
        this.isCount = !this.isCount;
        if (this.isCount) {
          this.time = setInterval(() => {
            if (this.totalTime > 0) {
              this.totalTime--;
            } else {
              this.$refs.audio.play();
              this.isCount = false;
              this.totalTime = JSON.parse(localStorage.getItem('totalTime')) || 1500;
              this.todos.forEach((item) => {
                item.isDoing = false;
                if (item.id === this.cacheID) {
                  this.finishTodo.push(item);
                }
              });
              this.todos = this.todos.filter(
                (item) => item.id !== this.cacheID
              );
              localStorage.setItem("todos", JSON.stringify(this.todos));
              localStorage.setItem(
                "finishTodo",
                JSON.stringify(this.finishTodo)
              );
              this.todoName = "What's next to do?";
              clearInterval(this.time);
            }
          }, 1000);
        } else {
          clearInterval(this.time);
        }
      } else {
        bus.emit("getMessage", "* 請選擇代辦事項");
        bus.emit("getStatus", true);
        setTimeout(() => {
          bus.emit("getMessage", "");
          bus.emit("getStatus", false);
        }, 3000);
      }
    },
    resetTime() {
      this.totalTime = JSON.parse(localStorage.getItem('totalTime')) || 1500;
      this.isCount = false;
      clearInterval(this.time);
    },
    setTime() {
      if(this.editTotalTime < 0) {
        bus.emit("getMessage", "* 時間不得為負");
        bus.emit("getStatus", true);
        setTimeout(() => {
          bus.emit("getMessage", "");
          bus.emit("getStatus", false);
        }, 3000);
      } else {
        this.totalTime = this.editTotalTime
        localStorage.setItem('totalTime', JSON.stringify(this.totalTime))
      }
      this.editTotalTime = 0
      clearInterval(this.time)
    },
    addTodo() {
      if (this.inputValue.trim() !== "") {
        let todo = {
          title: this.inputValue,
          id: Math.floor(Date.now()),
          isDoing: false,
        };
        this.todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(this.todos));
      } else {
        bus.emit("getMessage", "* 請輸入代辦事項");
        bus.emit("getStatus", true);
        setTimeout(() => {
          bus.emit("getMessage", "");
          bus.emit("getStatus", false);
        }, 3000);
      }
      this.inputValue = "";
    },
    edit(item) {
      this.cacheTodo = item;
      this.editValue = item.title;
    },
    doneEdit(item) {
      item.title = this.editValue;
      this.editValue = "";
      this.cacheTodo = {};
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    cancelEdit() {
      this.cacheTodo = {};
    },
    deleteTodo(id) {
      this.todos.splice(id, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    deleteFinishTodo(id) {
      this.finishTodo.splice(id, 1);
      localStorage.setItem("todos", JSON.stringify(this.finishTodo));
    },
    doingTodo(item) {
      this.todos.forEach((todo) => {
        if (todo.id === item.id) {
          todo.isDoing = !todo.isDoing;
          this.todoName = todo.isDoing ? todo.title : "What's next to do?";
          this.cacheID = item.id;
        } else {
          todo.isDoing = false;
        }
      });
    },
    returnTodo(id) {
      this.finishTodo.forEach((todo, index) => {
        if (index === id) {
          this.todos.push(todo);
        }
      });
      this.finishTodo.splice(id, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
      localStorage.setItem("finishTodo", JSON.stringify(this.finishTodo));
    },
  },
  computed: {
    formatTime() {
      let min = Math.floor(this.totalTime / 60);
      let sec = Math.floor(this.totalTime % 60);

      return `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
    },
  }
};
</script>
<style lang="scss" scoped>
h3 {
  width: 400px;
  background-color: #65efc9;
  color: #fff;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.btn {
  cursor: pointer;
  margin: 0 20px;
  font-size: 20px;
  background-color: transparent;
  border: 0;
  color: #65efc9;
  transition: 0.3s all linear;
  &:focus {
    outline: 0;
  }
  &:hover {
    color: royalblue;
  }
}
</style>

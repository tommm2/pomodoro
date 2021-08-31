<template>
  <div class="todo-container">
    <form class="input-group" @submit.prevent="$emit('handleAddTodo')">
      <input
        type="text"
        :value="title"
        placeholder="新增代辦事項...."
        @input="$emit('update:title', $event.target.value)"
      />
      <button class="btn btn-add" type="submit">
        <i class="fas fa-plus"></i>
      </button>
    </form>
    <h3>未完成</h3>
    <transition-group tag="ul" name="list" class="todo-list" appear>
      <li
        v-for="(item, index) in todos"
        :key="item.id"
        class="todo-item"
        :class="{ doing: item.isDoing }"
      >
        <input
          type="checkbox"
          :checked="item.isDoing"
          @input="$emit('handleDoing', item)"
        />
        <span v-if="item.id !== cacheTodo.id">{{ item.title }}</span>
        <input
          v-if="item.id === cacheTodo.id"
          type="text"
          :value="item.title"
          @input="$emit('update:edit-title', $event.target.value)"
          @keyup.enter="$emit('handleDone', item)"
          @keyup.esc="$emit('handleCancel')"
        />
        <div class="edit-group">
          <button
            @click="$emit('handleEdit', item)"
            class="btn btn-edit"
            type="button"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            @click="$emit('handleDelete', index)"
            class="btn btn-delete"
            type="button"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </transition-group>
    <h3>已完成</h3>
    <transition-group tag="ul" name="list" class="todo-list completed" appear>
      <li class="todo-item" v-for="(item, index) in finishTodo" :key="item.id">
        <span>{{ item.title }}</span>
        <div class="edit-group">
          <button
            @click="$emit('handleReturn', index)"
            class="btn btn-undo"
            type="button"
          >
            <i class="fas fa-undo-alt"></i>
          </button>
          <button
            @click="$emit('handleDeleteFinish', index)"
            class="btn btn-delete"
            type="button"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "TodoContainer",
  props: ["title", "todos", "finishTodo", "cacheTodo"],
  emits: [
    "update:title",
    "update:edit-title",
    "handleAddTodo",
    "handleDoing",
    "handleDone",
    "handleEdit",
    "handleCancel",
    "handleDelete",
    "handleReturn",
    "handleDeleteFinish",
  ],
};
</script>
<style lang="scss" scoped>
h3 {
  width: 400px;
  background-color: #65efc9;
  color: #fff;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  @media (max-width: 1000px) {
    width: 300px;
  }
}

.btn {
  cursor: pointer;
  margin: 0 10px;
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

.todo-container {
  @include d-flex(flex, column, center, center);
  width: 60%;
  .input-group {
    position: relative;
    input {
      border: 0;
      padding: 10px 20px;
      width: 300px;
      margin: 30px 0 30px 0;
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      &:focus {
        outline: 0;
        box-shadow: rgba(0, 0, 0, 0.15) inset 1.95px 1.95px 2.6px;
      }
    }
    .btn-add {
      position: absolute;
      right: 0;
      bottom: 36%;
      color: #6cdbeb;
    }
  }
  .todo-list {
    list-style: none;
    overflow-y: auto;
    padding: 10px;
    width: 400px;
    height: 250px;
    .todo-item {
      @include d-flex(flex, null, space-between, center);
      padding: 10px 15px;
      margin-top: 10px;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      span {
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        @media (max-width: 1000px) {
          width: 150px;
        }
      }
      &.doing {
        background: rgba(255, 255, 255, 0.33);
      }
    }
    @media (max-width: 1000px) {
      width: 300px;
      height: 150px;
    }
  }
  @media (max-width: 1000px) {
    padding: 20px;
  }
}

// list transitions
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.4s ease;
}

.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  position: absolute;
  transition: all 0.4s ease;
}

.list-move {
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #65efc9;
  border-radius: 10px;
}
</style>

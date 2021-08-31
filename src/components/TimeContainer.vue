<template>
  <div class="time-container">
    <form @submit.prevent="(isEdit = !isEdit), $emit('handleTime')">
      <input
        v-if="isEdit"
        @input="$emit('update:time', $event.target.value)"
        type="number"
        placeholder="請輸入秒數..."
      />
      <!-- <input type="number" v-if="isEdit" v-model="time"  placeholder="請輸入秒數..."/> -->
      <div v-else class="time">{{ formatTime }}</div>
      <button type="submit" class="btn btn-set">edit</button>
    </form>

    <div class="todo-thing">
      {{ todoName }}
    </div>
    <div class="btn-group">
      <button
        class="btn btn-start"
        v-if="!isCount"
        @click="$emit('handleCount')"
        type="button"
      >
        <i class="fas fa-play"></i>
      </button>
      <button class="btn btn-pause" v-else @click="$emit('handleCount')">
        <i class="fas fa-pause"></i>
      </button>
      <button class="btn btn-reset" @click="$emit('handleReset')" type="button">
        <i class="fas fa-stop"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "timeContainer",
  props: ["isCount", "formatTime", "todoName"],
  emits: ["handleReset", "handleCount", "update:time", "handleTime"],
  data() {
    return {
      isEdit: false,
      time: "",
    };
  },
};
</script>
<style lang="scss" scoped>
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

.time-container {
  @include d-flex(flex, column, center, center);
  @include background(
    to right bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.33)
  );
  width: 40%;
  height: 100%;
  border: {
    bottom-left-radius: 2rem;
    top-left-radius: 2rem;
  }
  .time {
    font-size: 70px;
    color: #65efc9;
  }
  .todo-thing {
    font-size: 25px;
    margin: 20px 0;
    color: gray;
  }
  .btn-set {
    border: #65efc9 solid;
    border-radius: 0.5rem;
    padding: 0 5px;
    &:hover {
      background-color: #65efc9;
      color: #fff;
    }
  }
}

input {
  border: 0;
  padding: 10px 20px;
  border-radius: 0.5rem;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  &:focus {
    outline: 0;
    box-shadow: rgba(0, 0, 0, 0.15) inset 1.95px 1.95px 2.6px;
  }
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1000px) {
  .time-container {
    width: 100%;
    padding: 10px 0;
  }
}
</style>

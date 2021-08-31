<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
    <!-- Alert -->
    <transition name="slide">
      <Alert />
    </transition>
  </main>
</template>
<script>
import Alert from "@/components/Alert.vue";
export default {
  name: "Index",
  components: { Alert },
};
</script>
<style lang="scss" scoped>
main {
  @include d-flex(flex, column, center, center);
  background: url('~@/assets/images/pomodoro2.jpg') no-repeat bottom/cover;
  min-height: 100vh;
}

.circle {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: absolute;
  backdrop-filter: blur(4px);
  &.circle1 {
    @include background(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
    top: 5%;
    right: 10%;
    z-index: 4;
  }
  &.circle2 {
    @include background(
      to right bottom,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.1)
    );
    bottom: 5%;
    left: 10%;
    z-index: 1;
  }
  @media (max-width: 1000px) {
    width: 5rem;
    height: 5rem;
  }
}

// alert-msg transition
.slide-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.slide-leave-active {
  transition: all 0.3s ease;
}

// route transition
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>

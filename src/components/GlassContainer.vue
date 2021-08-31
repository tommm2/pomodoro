<template>
  <section class="glass-container">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: "GlassContainer",
};
</script>
<style lang="scss">
.glass-container {
  @include background(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  @include d-flex(flex, null, null, null);
  width: 70%;
  height: 80vh;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  backdrop-filter: blur(6px);
  z-index: 3;

  @media (max-width: 1000px) {
    @include d-flex(flex, column, null, center);
    overflow: hidden;
  }
}
</style>

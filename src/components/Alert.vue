<template>
  <div v-if="isShow" class="alert-msg">
    {{ msg }}
  </div>
</template>
<script>
import bus from '@/bus/bus'
export default {
  data() {
    return {
      msg: '',
      isShow: false
    }
  },
  mounted() {
    bus.on('getMessage', item => this.msg = item)
    bus.on('getStatus', status => this.isShow = status)
  },
}
</script>
<style lang="scss" scoped>
.alert-msg {
  position: absolute;
  top: 5%;
  width: 300px;
  padding: 20px 15px;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color:	#FF5151;
  color: #fff;
  z-index: 10;
}
</style>

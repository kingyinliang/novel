<template>
    <div>
      list
      <router-link tag="a" class="tab-iteam" to="/home">书架</router-link>
      <a @click="()=>{this.$router.goBack()}">后退</a>
    </div>
</template>

<script>
export default {
  name: 'list'
}
</script>

<style scoped>

</style>

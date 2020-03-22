<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- 按钮权限 -->
    <button v-permission="['admin', 'editor']">editor button</button>
    <button v-permission="['admin']">admin button</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

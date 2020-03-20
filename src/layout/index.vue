<template>
  <div class="app-wrapper">
    <!-- <sidebar class="sidebar-container" /> -->
    <SideMenu></SideMenu>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
export default {
  components: { SideMenu },
}
</script>

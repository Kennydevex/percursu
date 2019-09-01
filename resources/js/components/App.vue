<template>
  <div>
    <router-view></router-view>
    <!-- <transition name="moveInUp">
         <router-view/>
  </transition> -->
  </div>
</template>



<script>
export default {
  created() {
    window.getApp = this;
  }
};
</script>

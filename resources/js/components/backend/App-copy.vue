<template>
  <div>
    <app-toolbar></app-toolbar>
    <app-drawer></app-drawer>
    <v-content>
      <!-- <page-header v-if="$route.meta.breadcrumb"></page-header> -->
      <div class="page-wrapper">
        <router-view></router-view>
      </div>
      <app-footer class="app--footer"></app-footer>
    </v-content>
    <app-fab></app-fab>
  </div>
</template>

<script>
import AppDrawer from "@pback/AppDrawer";
import AppToolbar from "@pback/AppToolbar";
import PageHeader from "@pback/PageHeader";
import AppFooter from "@pback/AppFooter";
import AppFab from "@pback/AppFab";

export default {
  components: {
    AppDrawer,
    AppToolbar,
    PageHeader,
    AppFab,
    AppFooter
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;

  .page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
  }
}
</style>

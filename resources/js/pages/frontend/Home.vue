<template>
  <div>
    <v-section>
      <app-slider />
    </v-section>

    <v-section>
      <app-missions />
    </v-section>
    
    <v-section>
      <app-formados/>
    </v-section>
  </div>
</template>
<script>
import AppSlider from "@pfront/AppSlider";
import AppMissions from "@pfront/AppMissions";
import AppFormados from "@pfront/AppFormados";
export default {
  components: {
    AppSlider,
    AppMissions,
    AppFormados
  }
};
</script>
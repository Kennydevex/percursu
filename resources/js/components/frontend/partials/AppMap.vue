<template>
<div>
  <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 450px">
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      @click="center=m.position"
    />
  </GmapMap>

</div>
</template>

<script>
// import { getPartnersDatas } from "@mixins/HelpersData";
export default {
  // mixins: [getPartnersDatas],
  name: "",

  data() {
    return {
      location:[],
      center: { lat: 16.89255578445236, lng: -24.990666850294474 },
      markers: [
        {
          position: { lat: 16.89255578445236, lng: -24.990666850294474 }
        }
        // {
        //   position: {lat:10.89255578445236, lng:-15.990666850294474}
        // }
      ]
    };
  },

  created: function() {
    // this.getPartners();
    this.getPartnersPosition();
  },

  methods: {
    getPartnersPosition() {
      console.log('A implementar');
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

<template>
  <span>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      :label="label"
      :placeholder="placeholder"
      :prepend-icon="icon"
      :rules="rules"
      @change="onLogoSelected"
    ></v-file-input>
  </span>
</template>
<script>
export default {
  props: {
    
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    icon: {
      type: String,
      default: "mdi-camera"
    },
    rules: {
      type: Array,
    }
  },

  methods: {
    onLogoSelected(e) {
      let fileReader = new FileReader();
      
      fileReader.readAsDataURL(e);
      fileReader.onload = event => {
        this.$emit("handleFileUpload", event.target.result);
      };
    }
  }
};
</script>
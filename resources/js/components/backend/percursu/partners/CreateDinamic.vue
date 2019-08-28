<template>
  <div>
    <PartnerFrom :actionText="'Enviar Criar'" @formAction="addPartner()" :sending="sending"></PartnerFrom>
  </div>
</template>


<script>
import { multFormData } from "@mixins/HandleMultFormData";

import PartnerFrom from "../../partials/forms/PartnerForm";
export default {
  mixins: [multFormData],

  data() {
    return {
      sending: false
    };
  },

  created() {
    this.checkAuthUser();
  },

  components: {
    PartnerFrom
  },

  methods: {
    addPartner(fromData) {
      this.sending = true;
      axios
        .post("/api/v1/percursu/partners", fromData)
        .then(response => {
          this.sending = false;
          this.feedback("success", response.data.msg, 3000, true);
          window.getApp.$emit("APP_UPDATE_ALL_PARTNERS_DATA");
          this.$router.push({ name: "list-partners" });
        })
        .catch(err => {
          this.sending = false;
        });
    }
  }
};
</script>
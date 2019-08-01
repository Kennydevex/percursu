<template>
  <div>
    <v-card>
      <v-toolbar card color="white">
        <v-text-field
          flat
          solo
          prepend-icon="mdi-magnify"
          placeholder="Procurar na tabela..."
          v-model="search"
          hide-details
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-btn icon>
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :search="search"
          :items="partners"
          :rows-per-page-items="[5,10,25,50,{text:'All','value':-1}]"
          class="elevation-1"
          item-key="name"
          select-all
          v-model="selected"
          no-data-text="Aguardando resposta do servidor..."
          rows-per-page-text="Linhas por página"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
            </td>

            <td>
              <v-avatar size="26px">
                <img
                  :src="`/images/users/avatars/${props.item.folk.avatar}`"
                  :alt="props.item.folk.name"
                />
              </v-avatar>
            </td>

            <td>{{ props.item.folk.name }}</td>
            <td>{{ props.item.folk.lastname }}</td>
            <td>
              <v-switch color="primary"></v-switch>
            </td>

            <td align="center">
              <v-btn flat icon small dark color="grey darken-2">
                <v-icon small>mdi-eye</v-icon>
              </v-btn>

              <v-btn flat icon small dark color="grey darken-2">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>

              <v-btn flat icon small dark color="grey darken-2">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </td>
          </template>

          <template slot="expand" slot-scope="props">
            <v-card flat color="light-blue lighten-5">
              <v-card-text>{{ props.item.description }}</v-card-text>
            </v-card>
          </template>

          <template
            slot="pageText"
            slot-scope="props"
          >Linhas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}</template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card id="create">
          <v-speed-dial
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="primary" dark fab>
                <v-icon>mdi-briefcase-account</v-icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <v-btn :to="{name: 'create-partner'}" fab small color="teal lighten-1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fab: false,
      dialog: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "folk.avatar"
        },
        {
          text: "Nome",
          value: "folk.name"
        },
        {
          text: "Apelido",
          value: "folk.lastname"
        },
        {
          text: "Estado",
          sortable: false,
          value: "status"
        },
        {
          text: "Operação",
          value: "",
          align: "center",
          sortable: false
        }
      ],
      partner: []
    };
  },

  created: function() {
    this.getPartners();
    window.getApp.$on("APP_UPDATE_ALL_PARTNERS_DATA", () => {
      this.getUpdatedPartners();
    });
  },

  computed: {
    partners: function() {
      return this.$store.getters.partners;
    }
  },

  methods: {
    handleTogglePartinerUpdateDialog(partner_id) {
      this.getSinglePartiner(partner_id);
      window.getApp.$emit("APP_PARTNER_UPDATE_DIALOG", this.partner);
    },

    getPartners: function() {
      if (this.partners.length) {
        return;
      }
      this.getUpdatedPartners();
    },

    getUpdatedPartners: function() {
      this.$store.dispatch("getPartners");
    },

    getSinglePartiner: function(partner_id) {
      if (this.partners.length) {
        this.partner = this.partners.find(partner => partner.id == partner_id);
      } else {
        axios
          .get("/api/helpers/partners/" + partner_id)
          .then(response => {
            this.partner = response.data.data;
          })
          .catch(error => {});
      }
    },

    onUpdatePartiner: function(partner_id) {
      console.log("Utilizador a ver e: " + partner_id);
    },

    onGetPartiner: function(partner_id) {
      console.log("Função: " + partner_id);
    },

    onDeletePartiner: function(partner) {
      this.$swal({
        title: "Eliminar Função",
        text: "Ação irreversível, queres continuar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, Apagar!",
        cancelButtonText: "Não, Cancelar!"
      }).then(result => {
        if (result.value) {
          this.deletePartiner(partner);
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.showToastAlert("error", "Operação cancelada!");
        }
      });
    },

    deletePartiner: function(partner_id) {
      axios
        .delete("/api/helpers/partners/" + partner_id)
        .then(response => {
          this.getUpdatedPartners();
          this.showToastAlert("success", "Operação efetuada com sucesso!");
        })
        .catch(err => {
          console.log();
        });
    },

    showToastAlert(type, msg) {
      this.$swal({
        title: msg,
        // title: 'Operação bem sucedida <i class="fa fa-arrow-right"></i>!',
        type: type,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000
      });
    },

    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.partners.slice();
    }
  }
};
</script>

<style lang="css">
</style>

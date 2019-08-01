<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
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
              :rows-per-page-items="[5,10,25]"
              class="elevation-0"
              item-key="id"
              select-all
              v-model="selected"
              no-data-text="Aguardando resposta do servidor..."
              rows-per-page-text="Linhas por página"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                </td>

                <td>
                  <v-avatar size="36px">
                    <img
                      :src="`/images/users/avatars/${props.item.folk.avatar}`"
                      :alt="props.item.folk.name"
                    />
                  </v-avatar>
                </td>

                <td align="left">{{ props.item.folk.name }}</td>
                <td align="left">{{ props.item.folk.lastname }}</td>
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
              <!-- <template
                slot="pageText"
                slot-scope="props"
              >Linhas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}</template> -->
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
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
    </v-layout>
  </div>
</template>
<script>
import moment from "moment";
import { getPartnersDatas } from "@mixins/HelpersData";

export default {
  mixins: [getPartnersDatas],
  data() {
    return {
      fab: false,
      dialog: {},
      updatePartnerDialog: {},
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
          value: "folk.first_name",
          align: "left"
        },

        {
          text: "Apelido",
          value: "folk.last_name",
          align: "left"
        },
        {
          text: "Ação",
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

  methods: {
    handleTogglePartnerUpdateDialog(partner_id) {
      this.getSinglePartner(partner_id);
      window.getApp.$emit("APP_PARTNER_UPDATE_DIALOG", this.partner);
    },

    formattingDate(date) {
      moment.locale("pt");
      return date ? moment(date).fromNow() : "";
    },

    onDeletePartner: function(partner) {
      this.$swal({
        title: "Eliminar Colaborador",
        text: "Ação irreversível, queres continuar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, Apagar!",
        cancelButtonText: "Não, Cancelar!"
      }).then(result => {
        if (result.value) {
          this.deletePartner(partner);
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.showToastAlert("warning", "Operação de risco cancelada!", true);
        }
      });
    },

    deletePartner: function(partner_id) {
      axios
        .delete("/api/schools/partners/" + partner_id)
        .then(response => {
          this.getUpdatedPartners();
          this.showToastAlert(
            "success",
            "Operação efetuada com sucesso!",
            true
          );
        })
        .catch(err => {
          console.log();
        });
    },

    getSinglePartner: function(partner_id) {
      if (this.partners.length) {
        this.partner = this.partners.find(partner => partner.id == partner_id);
      } else {
        axios
          .get("/api/schools/partners/" + partner_id)
          .then(response => {
            this.partner = response.data.data;
          })
          .catch(error => {});
      }
    }
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: fixed;
  z-index: 100;
}

#create .v-btn--floating {
  position: relative;
}
</style>
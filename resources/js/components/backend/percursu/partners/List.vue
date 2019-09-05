<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-multiple-check"
          :title="partner.length"
          sub-title="Utilizadores"
          color="indigo"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-file-multiple"
          :title="partner.length"
          sub-title="Publicações"
          color="red"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-facebook"
          title="200+"
          sub-title="Seguidores"
          color="indigo darken-3"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-linkedin"
          title="50+"
          sub-title="Seguidores"
          color="blue darken-3"
        ></mini-statistic>
      </v-flex>
      <!-- mini statistic  end -->
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar utilizador na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <span v-if="selected.length>0">
              <v-btn icon>
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-email</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </span>
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
              :items-per-page="10"
              class="elevation-1"
              item-key="id"
              show-select
              v-model="selected"
              no-data-text="Aguardando resposta do servidor..."
              no-results-text="Nada para mostrar"
            >
              <template v-slot:item.status="{ item }">
                <v-btn
                  :loading="loadPartnerAtivaction[item.id]"
                  x-small
                  rounded
                  outlined
                  class="text-capitalize"
                  :color="item.status==true?'primary':'warning'"
                  @click="handlePartnerActivation(item.id, item.status)"
                >
                  <small>{{item.status==true?'ativo':'desativo'}}</small>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

               <template v-slot:item.featured="{ item }">
                <v-btn
                  :loading="loadPartnerFeatured[item.id]"
                  x-small
                  rounded
                  outlined
                  class="text-capitalize"
                  :color="item.featured==true?'primary':'warning'"
                  @click="handlePartnerFeatured(item.id, item.featured)"
                >
                  <small>{{item.featured==true?'Em distaque':'Normal'}}</small>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

               <template v-slot:item.promo="{ item }">
                <v-btn
                  :loading="loadPartnerPromotion[item.id]"
                  x-small
                  rounded
                  outlined
                  class="text-capitalize"
                  :color="item.promo==true?'success':'grey'"
                  @click="handlePartnerPromotion(item.id, item.promo)"
                >
                  <small>{{item.promo==true?'Promo':'Não Promovido'}}</small>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="onViewPartner(item.folk.user.username)"
                >mdi-information</v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="onUpdatePartner(item.folk.user.username)"
                >mdi-pencil</v-icon>
                <v-icon small @click="onDeletePartner(item.id)">mdi-delete</v-icon>
              </template>

              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="mdi-alert"
                class="ma-4"
              >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
              <v-data-footer items-per-page-text="teste">

              </v-data-footer>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn
      :to="{name: 'create-partner'}"
      color="primary"
      dark
      medium
      fixed
      bottom
      right
      fab
      class="mb-5"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import MiniStatistic from "@widgets/statistic/MiniStatistic";
import { getPartnersDatas } from "@mixins/HelpersData";
import { flashAlert, actionAlert } from "@mixins/AppAlerts";

export default {
  mixins: [getPartnersDatas, flashAlert, actionAlert],
  data() {
    return {
      fab: false,
      loadPartnerAtivaction: {},
      loadPartnerFeatured: {},
      loadPartnerPromotion: {},
      search: "",
      selected: [],
      headers: [
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
          value: "status",
          align: "center"
        },
        {
          text: "Distaque",
          value: "featured",
          align: "center"
        },
        {
          text: "Promoção",
          value: "promo",
          align: "center"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      partner: []
    };
  },

  components: {
    MiniStatistic
  },

  created: function() {
    this.getPartners();
    window.getApp.$on("APP_UPDATE_ALL_PARTNERS_DATA", () => {
      this.getUpdatedPartners();
    });
  },

  methods: {
    handlePartnerActivation: function(id, status) {
      let feed = status ? "Desativado" : "Ativado";
      this.$set(this.loadPartnerAtivaction, id, false);
      this.$swal({
        title: status ? "Desativar curriculum?" : "Ativar curriculum?",
        text: "Tens certeza que queres efetuar esta ação?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: status ? "#ef9309" : "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: status ? "Sim, Desativar" : "Sim, Ativar",
        cancelButtonText: "Cancelar!"
      }).then(result => {
        if (result.value) {
          this.$set(this.loadPartnerAtivaction, id, true);
          axios
            .get("/api/v1/percursu/changePartnerActivation/" + id)
            .then(response => {
              this.getUpdatedPartners();
              this.feedback(
                "success",
                "Curriculum " + feed + " com sucesso",
                3000,
                true
              );
              this.$set(this.loadPartnerAtivaction, id, false);
            })
            .catch(err => {
              this.feedback(
                "error",
                "Erro de operação, tente outra vez",
                2000,
                true
              );
            });
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", 2000, true);
        }
      });
    },

     handlePartnerFeatured: function(id, featured) {
      let feed = featured ? "Normal" : "Em Destaque";
      this.$set(this.loadPartnerFeatured, id, false);
      this.$swal({
        title: featured ? "Curriculum Normal?" : "Destacar curriculum?",
        text: "Tens certeza que queres efetuar esta ação?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: featured ? "#ef9309" : "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: featured ? "Sim" : "Sim, Destacar",
        cancelButtonText: "Cancelar!"
      }).then(result => {
        if (result.value) {
          this.$set(this.loadPartnerFeatured, id, true);
          axios
            .get("/api/v1/percursu/changePartnerFeatured/" + id)
            .then(response => {
              this.getUpdatedPartners();
              this.feedback(
                "success",
                "Curriculum " + feed + " com sucesso",
                3000,
                true
              );
              this.$set(this.loadPartnerFeatured, id, false);
            })
            .catch(err => {
              this.feedback(
                "error",
                "Erro de operação, tente outra vez",
                2000,
                true
              );
            });
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", 2000, true);
        }
      });
    },


    handlePartnerPromotion: function(id, promo) {
      let feed = promo ? "Não promovido" : "Promovido";
      this.$set(this.loadPartnerPromotion, id, false);
      this.$swal({
        title: promo ? "Dispromover?" : "Promover?",
        text: "Tens certeza que queres efetuar esta ação?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: promo ? "#ef9309" : "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: promo ? "Sim, Dispromover" : "Sim, Promover",
        cancelButtonText: "Cancelar!"
      }).then(result => {
        if (result.value) {
          this.$set(this.loadPartnerPromotion, id, true);
          axios
            .get("/api/v1/percursu/changePartnerPromotion/" + id)
            .then(response => {
              this.getUpdatedPartners();
              this.feedback(
                "success",
                "Curriculum " + feed + " com sucesso",
                3000,
                true
              );
              this.$set(this.loadPartnerPromotion, id, false);
            })
            .catch(err => {
              this.feedback(
                "error",
                "Erro de operação, tente outra vez",
                2000,
                true
              );
            });
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", 2000, true);
        }
      });
    },

    onDeletePartner: function(id) {
      this.deleteAlert(
        "warning",
        "Eliminar todos os registos do seu curriculum"
      ).then(result => {
        if (result.value) {
          this.deletePartner(id);
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", 2000, true);
        }
      });
    },

    onViewPartner: function(username) {
      this.$router.push({ name: "view-partner", params: { username } });
    },

    onUpdatePartner: function(username) {
      this.$router.push({ name: "update-partner", params: { username } });
    },

    deletePartner: function(id) {
      axios
        .delete("/api/v1/percursu/partners/" + id)
        .then(response => {
          if (response.data.status) {
            this.feedback("warning", response.data.msg, 5000, true);
            return;
          }
          this.getUpdatedPartners();
          this.feedback("success", response.data.msg, 5000, true);
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
#partners-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#partners-action .v-btn--floating {
  position: relative;
}
</style>



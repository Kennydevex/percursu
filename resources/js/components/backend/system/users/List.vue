<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-multiple-check"
          :title="user.length"
          sub-title="Utilizadores"
          color="indigo"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-file-multiple"
          :title="user.length"
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
              <v-btn icon @click="onDeleteUsers()">
                <v-icon>mdi-trash-can</v-icon>
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
              :items="users"
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
                  :loading="loadUserAtivaction[item.id]"
                  x-small
                  rounded
                  outlined
                  class="text-capitalize"
                  :color="item.status==true?'primary':'warning'"
                  @click="handleUserActivation(item.id, item.status)"
                >
                  <small>{{item.status==true?'ativo':'desativo'}}</small>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="onUpdateUser(item.username)">mdi-pencil</v-icon>
                <v-icon small @click="onDeleteUser(item.id)">mdi-delete</v-icon>
              </template>

              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="mdi-alert"
                class="ma-4"
              >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-card id="users-action">
        <v-speed-dial
          v-model="fab"
          bottom="bottom"
          right="right"
          direction="left"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="primary" :to="{name: 'create-user'}">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>

          <v-btn fab dark small color="grey" @click="handleToggleCreatePermissionDialog()">
            <v-icon>mdi-lock-plus</v-icon>
          </v-btn>
          <v-btn fab dark small color="grey" @click="handleToggleCreateRoleDialog()">
            <v-icon>mdi-account-card-details</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-card>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <create-permission />
        <create-role />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MiniStatistic from "@widgets/statistic/MiniStatistic";
import { getUsersDatas } from "@mixins/HelpersData";
import { log } from "util";
import { flashAlert, actionAlert } from "@mixins/AppAlerts";
import CreatePermission from "../permissions/Create";
import CreateRole from "../roles/Create";

export default {
  mixins: [
    getUsersDatas,
    flashAlert,
    actionAlert
  ],
  data() {
    return {
      fab: false,
      loadUserAtivaction: {},
      search: "",
      selected: [],
      users_id: [],
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
          text: "Utilizador",
          value: "username"
        },
        {
          text: "Estado",
          value: "status",
          align: "center"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      user: []
    };
  },

  components: {
    MiniStatistic,
    CreatePermission,
    CreateRole
  },

  created: function() {
    this.getUsers();
    window.getApp.$on("APP_UPDATE_ALL_USERS_DATA", () => {
      this.getUpdatedUsers();
    });

    window.getApp.$on("APP_UPDATE_ALL_ROLES_DATA", () => {
      this.getUpdatedRoles();
    });

    window.getApp.$on("APP_UPDATE_ALL_PERMISSIONS_DATA", () => {
      this.getUpdatedPermissions();
    });
  },

  methods: {
    handleToggleCreatePermissionDialog() {
      window.getApp.$emit("APP_PERMISSION_CREATE_DIALOG");
    },

    handleToggleCreateRoleDialog() {
      window.getApp.$emit("APP_ROLE_CREATE_DIALOG");
    },

    handleUserActivation: function(id, status) {
      let feed = status ? "Desativada" : "Ativada";
      this.$set(this.loadUserAtivaction, id, false);
      this.$swal({
        title: status ? "Desativar a conta?" : "Ativar a conta?",
        text: "Tens certeza que queres efetuar esta ação?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: status ? "#ef9309" : "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: status ? "Sim, Desativar" : "Sim, Ativar",
        cancelButtonText: "Cancelar!"
      }).then(result => {
        if (result.value) {
          this.$set(this.loadUserAtivaction, id, true);
          axios
            .get("/api/v1/system/changeUserActivation/" + id)
            .then(response => {
              this.getUpdatedUsers();
              this.feedback(
                "success",
                "Conta " + feed + " com sucesso",
                3000,
                true,
                "top"
              );
              this.$set(this.loadUserAtivaction, id, false);
            })
            .catch(err => {
              this.feedback(
                "error",
                "Erro de operação, tente outra vez",
                3000,
                true,
                "bottom-end"
              );
            });
        } else if (result.dismiss === "cancel") {
          this.feedback(
            "error",
            "Operação cancelada!",
            3000,
            true,
            "bottom-end"
          );
        }
      });
    },

    onDeleteUser: function(id) {
      this.deleteAlert("warning", "Eliminar Utilizador").then(result => {
        if (result.value) {
          this.deleteUsers(id);
        } else if (result.dismiss === "cancel") {
          this.feedback(
            "error",
            "Operação cancelada!",
            3000,
            true,
            "bottom-end"
          );
        }
      });
    },

    setDeleteMultUser() {
      let mthis = this;
      this.selected.forEach(function(user) {
        mthis.users_id.push(user.id);
      });
    },

    onDeleteUsers: function() {
      this.setDeleteMultUser();
      this.deleteAlert(
        "warning",
        "Eliminar Utilizadores",
        "Preste a apagar " +
          this.selected.length +
          " Utilizadores da base de dados"
      ).then(result => {
        if (result.value) {
          this.deleteUsers(this.users_id);
        } else if (result.dismiss === "cancel") {
          this.feedback(
            "error",
            "Operação cancelada!",
            3000,
            true,
            "bottom-end"
          );
        }
      });
    },

    onUpdateUser: function(username) {
      this.$router.push({ name: "update-user", params: { username } });
    },

    deleteUsers: function(id) {
      axios
        .delete("/api/v1/system/users/" + id)
        .then(response => {
          this.getUpdatedUsers();
          this.feedback(
            "success",
            "Utilizador eliminado com sucesso",
            3000,
            true,
            "top"
          );
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
#users-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#users-action .v-btn--floating {
  position: relative;
}
</style>
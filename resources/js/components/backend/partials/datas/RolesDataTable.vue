<template>
  <v-card flat>
    <!-- <v-toolbar color="white" flat>
      <v-text-field
        flat
        solo
        prepend-icon="mdi-magnify"
        placeholder="Procurar utilizador na tabela..."
        v-model="search"
        hide-details
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-btn icon>
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider> -->
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="roles"
        :items-per-page="5"
        class="elevation-1"
        item-key="id"
        show-select
        v-model="selected"
        no-data-text="Aguardando resposta do servidor..."
        no-results-text="Nada para mostrar"
      >
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
</template>

<script>
import { getRolesDatas } from "@mixins/HelpersData";
import { flashAlert, actionAlert } from "@mixins/AppAlerts";

export default {
  mixins: [getRolesDatas],

  data() {
    return {
      search: "",
      selected: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },
       
      ],
      user: []
    };
  },



  created() {
    this.getRoles();
    window.getApp.$on("APP_UPDATE_ALL_ROLES_DATA", () => {
      this.getUpdatedRoles();
    });
  },

  methods: {
    onDeleteUser: function(id) {
      this.deleteAlert("warning", "Eliminar Utilizador").then(result => {
        if (result.value) {
          this.deleteUser(id);
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", true);
        }
      });
    },

    onUpdateUser: function(username) {
      this.$router.push({ name: "update-user", params: { username } });
    }
  }
};
</script>
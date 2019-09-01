<template>
  <v-dialog v-model="showCreateModel" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-clipboard-plus</v-icon>Criar Função/Papel do Utilizador
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  outlined
                  label="* Nome da função"
                  name="name"
                  v-model="role.name"
                  v-validate="'required'"
                  data-vv-name="name"
                  :error-messages="errors.collect('name')"
                  required
                  hint="Idendificador único da função"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-subheader>Vincular permissões à função</v-subheader>
                <v-select
                  height="20"
                  outlined
                  name="permissions"
                  :items="permissions"
                  v-model="role.permissions"
                  item-text="name"
                  item-value="id"
                  label="Permissão"
                  prepend-inner-icon="mdi-clipboard-text"
                  no-data-text="Nenhuma permissão registada"
                  chips
                  multiple
                  deletable-chips
                  hint="Aqui pode definir o que um utilizador com esta função pode fazer..."
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="addRole">Guardar</v-btn>
        <v-btn small icon text @click="showCreateModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getPermissionsDatas } from "@mixins/HelpersData";
import validateDictionary from "@helpers/api/validateDictionary";
export default {
  mixins: [getPermissionsDatas],
  data() {
    return {
      role: {
        name: "",
        display_name: "",
        description: "",
        permissions: []
      },
      showCreateModel: false,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getPermissions();
    window.getApp.$on("APP_ROLE_CREATE_DIALOG", () => {
      this.handleShowHideModel();
    });
  },

  methods: {
    handleShowHideModel: function() {
      this.showCreateModel = !this.showCreateModel;
    },
    addRole() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/v1/system/roles", this.$data.role)
            .then(response => {
              this.handleShowHideModel();
              window.getApp.$emit("APP_UPDATE_ALL_ROLES_DATA");
            })
            .catch(err => {
              console.log();
            });
        }
      });
    }
  }
};
</script>

<style lang="css">
</style>

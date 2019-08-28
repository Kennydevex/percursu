<template>
  <v-dialog v-model="showCreateModel" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-clipboard-plus</v-icon>Criar permissão
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  outlined
                  label="* Nome da Permisssão"
                  name="name"
                  v-model="permission.name"
                  v-validate="'required'"
                  data-vv-name="name"
                  :error-messages="errors.collect('name')"
                  required
                  hint="Idendificador único da permissão"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6>
                <v-text-field
                  outlined
                  label="* Rótulo"
                  name="display_name"
                  hint="Nome de apresentação da permissão"
                  v-model="permission.display_name"
                  required
                  v-validate="'required'"
                  data-vv-name="rotulo"
                  :error-messages="errors.collect('rotulo')"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  outlined
                  label="Descrição da permissão"
                  name="description"
                  hint="Escreva aqui uma pequena descrição desta permissão"
                  v-model="permission.description"
                  outline
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="addPermission">Guardar</v-btn>
        <v-btn small icon text @click="showCreateModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import validateDictionary from "@helpers/api/validateDictionary";
export default {
  data() {
    return {
      permission: {
        name: "",
        display_name: "",
        description: ""
      },
      showCreateModel: false,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_PERMISSION_CREATE_DIALOG", () => {
      this.handleShowHideModel();
    });
  },

  methods: {
    handleShowHideModel: function() {
      this.showCreateModel = !this.showCreateModel;
    },
    addPermission() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/v1/system/permissions", this.$data.permission)
            .then(response => {
              this.handleShowHideModel();
              window.getApp.$emit("APP_UPDATE_ALL_PERMISSIONS_DATA");
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

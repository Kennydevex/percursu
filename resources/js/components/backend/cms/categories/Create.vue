<template>
  <v-dialog v-model="showCreateModel" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-plus</v-icon>Criar Categoria
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
                  label="* Nome da Categoria"
                  name="name"
                  v-model="category.name"
                  v-validate="'required'"
                  data-vv-name="name"
                  :error-messages="errors.collect('name')"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  outlined
                  label="Descrição da Categoria"
                  name="description"
                  hint="Escreva aqui uma pequena descrição desta Categoria"
                  v-model="category.description"
                  outline
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="addCategory">Guardar</v-btn>
        <v-btn small icon text @click="showCreateModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import validateDictionary from "@helpers/api/validateDictionary";
import { flashAlert } from "@mixins/AppAlerts";

export default {
  props: ["entity_name"],
  mixins: [flashAlert],

  data() {
    return {
      category: {
        name: "",
        description: "",
        entity: this.entity_name
      },
      showCreateModel: false,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_CATEGORY_CREATE_DIALOG", () => {
      this.handleShowHideModel();
    });
  },

  methods: {
    handleShowHideModel: function() {
      this.showCreateModel = !this.showCreateModel;
    },
    addCategory() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/v1/helpers/categories", this.$data.category)
            .then(response => {
              this.handleShowHideModel();
              window.getApp.$emit("APP_UPDATE_ALL_CATEGORIES_DATA");
              this.feedback(
                "success",
                response.data.msg, 3000,
                true
              );
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

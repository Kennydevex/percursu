<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card width="100%">
        <v-card-title primary-title class="py-5">
          <small class="font-weight-light text-capitalize">
            <v-icon>mdi-file-document-box-plus</v-icon>Criar Publicação
          </small>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md fluid>
            <v-form ref="form">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    outlined
                    label="Título da publicação*"
                    name="title"
                    v-model="formData.title"
                    v-validate="'required'"
                    data-vv-name="title"
                    :error-messages="errors.collect('title')"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md9>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-textarea
                        outlined
                        label="Resumo da publicação*"
                        name="summary"
                        hint="Ecreva um pequeno resumo desta publicação..."
                        v-model="formData.summary"
                        v-validate="'required'"
                        data-vv-name="summary"
                        :error-messages="errors.collect('summary')"
                        auto-grow
                        rows="3"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        outlined
                        label="Conteúdo da publicação*"
                        name="body"
                        hint="Desenvolva o conteúdo desta publicação..."
                        v-model="formData.body"
                        v-validate="'required'"
                        data-vv-name="body"
                        :error-messages="errors.collect('body')"
                        auto-grow
                        rows="10"
                      ></v-textarea>
                    </v-flex>

                    <v-flex xs12 md6>
                      <file-upload
                        @handleFileUpload="uploadImage"
                        :rules="rules"
                        :label="'Avatar'"
                        :placeholder="'Carregar uma imagem'"
                      ></file-upload>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- <v-divider class="hidden-ms-and-down" vertical></v-divider> -->
                <v-flex xs12 md3>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Tipo de publicação</v-subheader>
                      <v-radio-group row v-model="formData.type">
                        <v-radio label="Notícias" value="1"></v-radio>
                        <v-radio label="Ofertas de Emprego" value="2"></v-radio>
                        <v-radio label="Formações" value="3"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        height="20"
                        outlined
                        name="category"
                        :items="categories"
                        v-model="formData.category"
                        item-text="name"
                        item-value="id"
                        label="Categoria da publicação*"
                        prepend-inner-icon="mdi-folder"
                        no-data-text="Nenhuma categoria registada"
                        v-validate="'required'"
                        data-vv-name="category"
                        :error-messages="errors.collect('category')"
                      ></v-select>
                    </v-flex>

                    <v-flex xs12>
                      <v-select
                        height="20"
                        outlined
                        name="tags"
                        :items="tags"
                        v-model="formData.tags"
                        item-text="name"
                        item-value="id"
                        label="Etiqueta/Marcador"
                        prepend-inner-icon="mdi-tag"
                        no-data-text="Nenhum marcador registado"
                        chips
                        multiple
                        deletable-chips
                      ></v-select>
                    </v-flex>

                    <v-flex xs12>
                      <p>Ativação da puclicação</p>
                      <v-switch
                        v-model="formData.published"
                        :label="formData.published ? 'Publicado':'Não Publicado'"
                        color="indigo"
                        value
                        input-value="true"
                        hide-details
                      ></v-switch>
                    </v-flex>
                    <v-flex xs12>
                      <p>Destaque da publicação na plataformal</p>
                      <v-switch
                        v-model="formData.featured"
                        :label="formData.featured ? 'Publicação de Destaque':'Destacar Publicação'"
                        color="indigo"
                        value
                        input-value="true"
                        hide-details
                      ></v-switch>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
          <small>*Campos de preenchimento obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="addPost" color="primary">Guardar</v-btn>
          <v-btn text @click="clear">
            <v-icon>mdi-eraser</v-icon>
          </v-btn>
          <v-btn text @click="goBack">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import validateDictionary from "@helpers/api/validateDictionary";
import { clearForm } from "@mixins/HandleForm";
import { getCategoriesDatas, getTagsDatas } from "@mixins/HelpersData";
import { flashAlert } from "@mixins/AppAlerts";
import FileUpload from "@pback/forms/FileUpload";

export default {
  mixins: [getCategoriesDatas, getTagsDatas, clearForm, flashAlert],

  data: () => ({
    showPass: false,
    formErrors: [],
    formData: {
      title: "",
      summary: "",
      body: "",
      image: "",
      published: false,
      featured: false,
      type: "1",
      category: "",
      tags: []
    },
    dictionary: validateDictionary,
    rules: [
      value =>
        !value ||
        value.size < 1000000 ||
        "Esta imagem não pode ter um tamanho superior a 1MB"
    ],
  }),

  created() {
    this.getTags();
    this.getCategories();
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  components: {
    FileUpload,
  },

  methods: {
    uploadImage(file) {
      this.formData.image = file;
    },
    addPost() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/v1/cms/posts", this.$data.formData)
            .then(response => {
              this.feedback("success", response.data.msg, 3000, true);
              window.getApp.$emit("APP_UPDATE_ALL_POSTS_DATA");
              this.clear();
              this.$router.push({ name: "list-posts" });
              this.formErrors = [];
            })
            .catch(err => {
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },
    goBack: function() {
      this.$router.push({ name: "list-posts" });
    }
  }
};
</script>

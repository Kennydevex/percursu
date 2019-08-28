<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <v-btn @click="handleToggleCreateTagDialog()" color="primary" text rounded small>Nova Marcador</v-btn>
          <v-btn color="primary" :to="{name: 'create-post'}" text rounded small>Criar Publicações</v-btn>
        </v-card-title>
        <v-divider></v-divider>
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
          <v-btn icon>
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-data-table
            :headers="headers"
            :search="search"
            :items="tags"
            :items-per-page="10"
            class="elevation-1"
            item-key="id"
            show-select
            v-model="selected"
            no-data-text="Aguardando resposta do servidor..."
            no-results-text="Nada para mostrar"
          >
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
              <v-icon small @click="onDeleteTag(item.id)">mdi-delete</v-icon>
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
    <create-tag></create-tag>
  </v-layout>
</template>


<script>
import { getTagsDatas } from "@mixins/HelpersData";
import { flashAlert, actionAlert } from "@mixins/AppAlerts";
import CreateTag from './Create';
export default {
  mixins: [getTagsDatas, flashAlert, actionAlert],
  data() {
    return {
      fab: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },
        {
          text: "Descrição",
          value: "description"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      tag: []
    };
  },

  components: {
    CreateTag,
  },

  created: function() {
    this.getTags();
    window.getApp.$on("APP_UPDATE_ALL_TAGS_DATA", () => {
      this.getUpdatedTags();
    });
  },

  methods: {
    handleToggleCreateTagDialog() {
      window.getApp.$emit("APP_TAG_CREATE_DIALOG");
    },

    onDeleteTag: function(id) {
      this.deleteAlert("warning", "Eliminar Marcador").then(result => {
        if (result.value) {
          this.deleteTag(id);
        } else if (result.dismiss === "cancel") {
          this.feedback("error", "Operação cancelada!", 3000, true);
        }
      });
    },

    deleteTag: function(id) {
      axios
        .delete("/api/v1/cms/tags/" + id)
        .then(response => {
          if (response.data.can) {
            this.getUpdatedTags();
            this.feedback("success", response.data.msg, 3000, true);
            return;
          }
          this.feedback("warning", response.data.msg, 3000, true);
        })
        .catch(err => {});
    }

  }
};
</script>
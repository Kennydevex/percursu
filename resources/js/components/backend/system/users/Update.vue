<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card width="100%">
        <v-card-title primary-title>
          <small class="font-weight-light text-capitalize"><v-icon>mdi-pencil</v-icon> Editar Registo</small>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md fluid>
            <v-form ref="form">
              <v-layout wrap>
                <v-flex xs12>
                  <v-alert
                    outlined
                    type="warning"
                    :value="true"
                    dismissible
                  >Para que o registo seja armazenado na base de dados adequadamente, pessamos que tenhas bom senso em inserir os seus dados pessoais e os seus contactos</v-alert>
                </v-flex>
                <v-flex xs12>
                  <v-subheader>Dados Pessoais</v-subheader>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    outlined
                    label="Nome*"
                    name="name"
                    v-model="formData.folk.name"
                    v-validate="'required|alpha'"
                    data-vv-name="name"
                    :error-messages="errors.collect('name')"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    outlined
                    label="Apelido*"
                    name="lastname"
                    v-model="formData.folk.lastname"
                    v-validate="'required|alpha'"
                    data-vv-name="lastname"
                    :error-messages="errors.collect('lastname')"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field
                    outlined
                    label="BI/CNI"
                    v-validate="'max:6|numeric'"
                    data-vv-name="BI"
                    :error-messages="errors.collect('BI')"
                    v-model="formData.folk.ic"
                    hint="Insira o seu nº de BI ou CNI"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field
                    outlined
                    label="NIF"
                    v-validate="'max:11|numeric'"
                    data-vv-name="nif"
                    :error-messages="errors.collect('nif')"
                    v-model="formData.folk.nif"
                    hint="Insira o seu NIF"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    outlined
                    label="Data de Nascimento"
                    v-model="formData.folk.birthdate"
                    hint="Insira o seu NIF"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <p>Sexo do utilizador</p>
                  <v-radio-group v-model="formData.folk.gender" row>
                    <v-radio color="blue" label="Masculino" value="m"></v-radio>
                    <v-radio color="orange" label="Feminino" value="f"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12>
                  <v-subheader>Contactos e Login</v-subheader>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field
                    outlined
                    label="Utilizador*"
                    name="username"
                    v-validate="'required'"
                    data-vv-name="username"
                    :error-messages="errors.collect('username')"
                    v-model="formData.username"
                    required
                    hint="Escolha um nome único que identifica a sua conta"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    outlined
                    label="Email*"
                    name="email"
                    prepend-inner-icon="mdi-email"
                    v-validate="'required|email'"
                    data-vv-name="email"
                    :error-messages="errors.collect('email')"
                    v-model="formData.email"
                    required
                    hint="Introduza um email válido e que estás a usar"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    label="Telefone"
                    prepend-inner-icon="mdi-cellphone-basic"
                    v-model="formData.folk.phone_number"
                    outlined
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-subheader>Configuração da conta</v-subheader>
                </v-flex>

                <v-flex xs12 md6>
                  <v-select
                    outlined
                    name="roles"
                    :items="roles"
                    v-model="formData.roles"
                    item-text="display_name"
                    item-value="id"
                    label="Função de utilizador"
                    prepend-inner-icon="mdi-clipboard-account"
                    no-data-text="Nenhuma função registada"
                    chips
                    multiple
                    deletable-chips
                  ></v-select>
                </v-flex>

                <v-flex xs12 md6>
                  <v-select
                    outlined
                    name="permissions"
                    :items="permissions"
                    v-model="formData.permissions"
                    item-text="display_name"
                    item-value="id"
                    label="Permissão de utilizador"
                    prepend-inner-icon="mdi-clipboard-text"
                    no-data-text="Nenhuma permissão registada"
                    chips
                    multiple
                    deletable-chips
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                  <p>Ativação</p>
                  <v-switch
                    v-model="formData.status"
                    :label="formData.status ? 'Ativo':'Inativo'"
                    color="indigo"
                    value
                    input-value="true"
                    hide-details
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
          <small>*Campos de preenchimento obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="updateUser" color="primary">Atualizar</v-btn>
          <v-btn text @click="clear">
            <v-icon>mdi-close</v-icon>
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
import { getRolesDatas, getPermissionsDatas } from "@mixins/HelpersData";
import { flashAlert } from "@mixins/AppAlerts";
export default {
  mixins: [getRolesDatas, getPermissionsDatas, clearForm, flashAlert],
  data() {
    return {
      username: this.$route.params.username,
      showPass: false,
      formErrors: [],
      formData: [],
      dictionary: validateDictionary
    };
  },

  created() {
    this.getSingleUser(this.username);
    this.getPermissions();
    this.getRoles();
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    users: function() {
      return this.$store.getters.users;
    }
  },

  methods: {
    getSingleUser: function(username) {
      if (this.users.length > 0) {
        this.formData = this.users.find(user => user.username == username);
      } else {
        axios
          .get("/api/v1/system/users/" + username)
          .then(response => {
            this.formData = response.data.data;
          })
          .catch(error => {});
      }
    },

    updateUser() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .put("/api/v1/system/users/" + this.username, this.$data.formData)
            .then(response => {
              this.feedback("success", response.data.msg, true);
              window.getApp.$emit("APP_UPDATE_ALL_USERS_DATA");
              this.clear();
              this.$router.push({ name: "list-users" });
              this.formErrors = [];
            })
            .catch(err => {
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },
    goBack: function() {
      this.clear();
      this.$router.push({ name: "list-users" });
      this.feedback("error", "Operação cancelada", true);
    }
  }
};
</script>
<template>
  <div class="back">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-1 pa-3">
                <v-card-text>
                  <div class="layout column align-center">
                    <img :src="'images/geral/logo.svg'" alt="percursu" width="120" height="120" />
                    <h1 class="flex my-4 primary--text">Percursu</h1>
                    <small>Criar uma conta de utilizador</small>
                  </div>
                  <v-form>
                    <v-container grid-list-sm ma-0 pa-0>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-text-field
                            prepend-icon="mdi-account"
                            v-model="formData.name"
                            name="name"
                            label="Nome"
                            type="text"
                            v-validate="'required|alpha'"
                            data-vv-name="name"
                            :error-messages="errors.collect('name')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field
                            v-model="formData.lastname"
                            name="lastname"
                            label="Apelidos"
                            type="text"
                            v-validate="'required|alpha_spaces'"
                            data-vv-name="lastname"
                            :error-messages="errors.collect('lastname')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                          <v-text-field
                            v-model="formData.email"
                            prepend-icon="mdi-email"
                            name="email"
                            label="Email"
                            type="text"
                            v-validate="'required|email'"
                            data-vv-name="email"
                            :error-messages="errors.collect('email')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field
                            v-model="formData.username"
                            name="username"
                            label="Utilizador"
                            type="text"
                            v-validate="'required|alpha_dash'"
                            data-vv-name="username"
                            :error-messages="errors.collect('username')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                          <v-text-field
                            v-model="formData.passwword"
                            prepend-icon="mdi-lock"
                            name="password"
                            label="Palavra Passe"
                            id="password"
                            type="password"
                            ref="password"
                            v-validate="'required|min:8'"
                            data-vv-name="password"
                            :error-messages="errors.collect('password')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                          <v-text-field
                            v-model="formData.password_confirmation"
                            name="password"
                            label="Confirmar Palavra Passe"
                            id="password"
                            type="password"
                            v-validate="'required|confirmed:password'"
                            data-vv-name="password_confirmation"
                            :error-messages="errors.collect('password_confirmation')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <v-radio-group row>
                            <v-radio color="blue" label="Masculino" value="m"></v-radio>
                            <v-radio color="orange" label="Feminino" value="f"></v-radio>
                          </v-radio-group>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <div class="login-btn">
                  <v-tooltip bottom>
                    <v-btn
                      :to="{name: 'login'}"
                      small
                      flat
                      round
                      slot="activator"
                      dark
                      color="primary"
                    >
                      <v-icon small left dark>mdi-login</v-icon>Login
                    </v-btn>
                    <span>Já tem uma conta? Clique para autenticar!!</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn :to="{name:'home'}" slot="activator" icon small flat>
                      <v-icon color="primary" small>mdi-keyboard-backspace</v-icon>
                    </v-btn>
                    <span>Voltar à página principal</span>
                  </v-tooltip>

                  <v-spacer></v-spacer>

                  <v-btn icon medium>
                    <v-icon color="blue" medium>mdi-facebook-box</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="red">mdi-twitter-box</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="light-blue">mdi-google</v-icon>
                  </v-btn>
                  <v-btn @click="register()" block color="primary">Registar</v-btn>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import validateDictionary from "@helpers/api/validateDictionary";

export default {
  data() {
    return {
      formData: {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "nd",
        status: false
      },
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  methods: {
    register() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>

<style lang="css">
.back {
  background-image: url(/images/geral/loginback.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
  background-size: cover;
}
#inspire {
  background: none;
}
</style>

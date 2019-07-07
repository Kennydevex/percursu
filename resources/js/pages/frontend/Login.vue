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
                    <small>Autenticar</small>
                  </div>

                  <v-form>
                    <v-text-field
                      append-icon="mdi-account-key"
                      name="login"
                      label="Email"
                      type="text"
                      v-validate="'required|email'"
                      data-vv-name="email"
                      :error-messages="errors.collect('email')"
                    ></v-text-field>
                    <v-text-field
                      append-icon="mdi-lock-open"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-validate="'required|min:8'"
                      data-vv-name="password"
                      :error-messages="errors.collect('password')"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <div class="login-btn">
                  <v-tooltip bottom>
                    <v-btn
                      :to="{name: 'register'}"
                      small
                      flat
                      round
                      slot="activator"
                      dark
                      color="primary"
                    >
                      <v-icon small left dark>mdi-account-plus</v-icon>Criar
                    </v-btn>
                    <span>Não tem uma conta? Clique para criar uma!!</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn :to="{name:'home'}" slot="activator" icon small>
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
                  <v-btn @click="authenticate()" block color="primary">Login</v-btn>
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
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },
  methods: {
    authenticate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          console.log("teste");
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

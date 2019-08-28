<template>
  <div class="back">
    <v-app id="inspire">
      <v-content>
        <v-container grid-list-{xs through xl} fluid>
          <v-layout align-center justify-center fill-height>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-1 pa-3">
                <v-card-text>
                  <div class="layout column align-center">
                    <img :src="'images/geral/logo.svg'" alt="percursu" width="120" height="120" />
                    <h1 class="flex my-4 primary--text">Percursu</h1>
                    <small>Autenticar</small>
                  </div>

                  <v-flex xs12>
                    <v-alert
                      :value="loginError"
                      color="error"
                      icon="mdi-alert"
                      outlined
                      dismissible
                      transition="scale-transition"
                    >{{loginError}}</v-alert>
                  </v-flex>

                  <v-form>
                    <v-container grid-list-sm ma-0 pa-0>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.email"
                            append-icon="mdi-account-key"
                            name="login"
                            label="Email"
                            type="text"
                            prepend-inner-icon="mdi-email"
                            v-validate="'required|email'"
                            data-vv-name="email"
                            :error-messages="errors.collect('email')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.password"
                            :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (passIcon = !passIcon)"
                            :type="passIcon ? 'password' : 'text'"
                            name="password"
                            label="Password"
                            data-vv-name="password"
                            :error-messages="errors.collect('password')"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>

                <div class="login-btn">
                  <v-btn :to="{name: 'register'}" small text rounded dark color="primary">
                    <v-icon small left>mdi-account-plus</v-icon>Criar
                  </v-btn>

                  <v-btn :to="{name:'home'}" text icon x-small dark>
                    <v-icon color="primary" small dark>mdi-home</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon color="light-blue">mdi-linkedin-box</v-icon>
                  </v-btn>

                  <v-btn icon slot="activator">
                    <v-icon color="blue" medium>mdi-facebook-box</v-icon>
                  </v-btn>

                  <v-btn icon slot="activator">
                    <v-icon color="red">mdi-twitter-box</v-icon>
                  </v-btn>

                  <v-btn @click="authenticate()" rounded block color="primary">Entrar</v-btn>
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
import { login } from "@helpers/authentication";
import validateDictionary from "@helpers/api/validateDictionary";
import { flashAlert } from "@mixins/AppAlerts";

export default {
  mixins: [flashAlert],
  data() {
    return {
      sending: false,
      formData: {
        email: "",
        password: "",
        remember_token: false
      },
      passIcon: true,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    loginError: function() {
      return this.$store.getters.authError;
    }
  },
  methods: {
    togglePassIcon(params) {
      this.passIcon = !this.passIcon;
    },
    authenticate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.sending = true;
          this.$store.dispatch("login");
          login(this.$data.formData)
            .then(response => {
              this.feedback("success", 'Autenticação efetuada com sucesso. Obrigado!', 5000, true, 'bottom-left');

              this.$store.commit("loginSuccess", response);
              this.$router.push({ path: "/" });
              this.sending = false;
            })
            .catch(error => {
              this.$store.commit("loginFailed", { error });
              this.sending = false;
            });
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

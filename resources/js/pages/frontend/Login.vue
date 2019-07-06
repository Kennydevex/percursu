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
                    <img :src="'images/geral/logo.png'" alt="percursu" width="120" height="120" />
                    <h1 class="flex my-4 primary--text">Percursu</h1>
                  </div>
                  <v-form>
                    <v-text-field
                      append-icon="mdi-account-key"
                      name="login"
                      label="Login"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      append-icon="mdi-lock-open"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <div class="login-btn">
                  <v-btn icon medium>
                    <v-icon color="blue" medium>mdi-facebook-box</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="red">mdi-twitter-box</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="light-blue">mdi-google</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn block color="primary">Login</v-btn>
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
export default {
  data() {
    return {}
  }
}
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

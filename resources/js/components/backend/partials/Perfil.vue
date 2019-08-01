<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <v-parallax height="300" :src="'images/geral/loginback.jpeg'">
          <div>
            <v-avatar size="150" color="teal lighten-3">
              <img :src="'images/users/avatars/default.svg'" alt="alt" />
            </v-avatar>
          </div>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card> 
              <v-card-title class="py-3 justify-center  primary white--text text-uppercase" primary-title>Meu Percursu</v-card-title>
              <v-card-text>
                <v-flex xs12> 
                  <v-expansion-panel popout>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><v-icon small>mdi-school</v-icon>  Formações</div>
                      </template>
                      <v-card>
                        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-card>
                    </v-expansion-panel-content>

                     <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><v-icon small>mdi-account-tie</v-icon>  Experiencias</div>
                      </template>
                      <v-card>
                        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-card>
                    </v-expansion-panel-content>

                     <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><v-icon small>mdi-bag-personal</v-icon>  Habilidades</div>
                      </template>
                      <v-card>
                        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>


<template>
  <v-toolbar card dark color="primary" height="80" scroll-off-screen>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Percurso</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-layout row wrap align-content-center align-center fill-height>
        <v-flex xs12>
          <v-btn :to="{name: 'home'}" class="pa-3" round flat>
            <v-icon>mdi-home-group</v-icon>
          </v-btn>
          <v-btn :to="{name: 'colaboradores'}" class="pa-3" round flat>Colaboradores</v-btn>
          <v-btn :to="{name: 'empregos'}" class="pa-3" round flat>Empregos</v-btn>
          <v-btn :to="{name: 'formacoes'}" class="pa-3" round flat>Formações</v-btn>
          <v-btn :to="{name: 'login'}" fab class="pa-3" flat>
            <v-icon left>mdi-login</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>
<template>
  <v-container
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-layout align-center>
      <v-flex text-center>
        <h1 class="display-2 primary--text">Upsss, 403</h1>
        <p>Agradecemos a sua preferência e pedimos desculpas caso for flaha do sistema, mas, por agora não tens permissão para acessar esta página</p>
        <p>
        <small>Tente reiniciar a sua sessão, se não funcionar, contacte o adminitrador</small>

        </p>
        <v-btn
          to="/"
          outlined
          color="primary"
        >
          Ir para a Página inicial
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FourOhFour',
    props: {
      lang: {
        type: String,
        default: 'en',
      },
    },
    created () {
      this.$ssrContext && this.$ssrContext.res.status(404)
    },
  }
</script>


<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-timeline align-top>
          <v-timeline-item v-for="(item, i) in items" :key="i" :color="item.color" fill-dot large>
            <template v-slot:icon>
              <v-avatar>
                <img src="http://i.pravatar.cc/64" />
              </v-avatar>
            </template>
            <template v-slot:opposite>
              <span>Tus eu perfecto</span>
            </template>
            <v-card :color="item.color" dark>
              <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
              <v-card-text class="white text--primary">
                <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                <v-btn :color="item.color" class="mx-0" outline>Button</v-btn>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star"
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant"
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon"
      },
    ]
  })
};
</script>
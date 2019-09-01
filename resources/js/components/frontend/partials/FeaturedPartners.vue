<template>
  <div id="">
    <v-layout row wrap>
     
      <v-flex xs12>
        <v-card flat tile @mouseenter="$refs.swiperRef.swiper.autoplay.stop()" @mouseleave="$refs.swiperRef.swiper.autoplay.start()">
          <!-- <div class="category__group">
          <div class="category__group__element">
          teste
        </div>
      </div> -->


      <swiper :options="swiperOption" ref="swiperRef">
        <swiper-slide>
          <v-card flat>
            <v-img
            class="white--text"
            height="200px"

            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
            </div>
          </v-card-title>
        </v-card>
      </swiper-slide>
      <swiper-slide>
        <v-card flat>
          <v-img
          class="white--text"
          height="200px"

          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
          </div>
        </v-card-title>
      </v-card>
    </swiper-slide>
    <swiper-slide>
      <v-card flat>
        <v-img
        class="white--text"
        height="200px"

        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Top 10 Australian beaches</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <div>
          <span class="grey--text">Number 10</span><br>
          <span>Whitehaven Beach</span><br>
        </div>
      </v-card-title>
    </v-card>
  </swiper-slide>
  <swiper-slide>
    <v-card flat>
      <v-img
      class="white--text"
      height="200px"

      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">Top 10 Australian beaches</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <span class="grey--text">Number 10</span><br>
        <span>Whitehaven Beach</span><br>
      </div>
    </v-card-title>
  </v-card>
</swiper-slide>
<swiper-slide>
  <v-card flat>
    <v-img
    class="white--text"
    height="200px"

    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">Top 10 Australian beaches</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title>
    <div>
      <span class="grey--text">Number 10</span><br>
      <span>Whitehaven Beach</span><br>
    </div>
  </v-card-title>
</v-card>
</swiper-slide>
<swiper-slide>
  <v-card flat>
    <v-img
    class="white--text"
    height="200px"

    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">Top 10 Australian beaches</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title>
    <div>
      <span class="grey--text">Number 10</span><br>
      <span>Whitehaven Beach</span><br>
    </div>
  </v-card-title>
</v-card>
</swiper-slide>
<swiper-slide>
  <v-card flat>
    <v-img
    class="white--text"
    height="200px"

    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">Top 10 Australian beaches</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title>
    <div>
      <span class="grey--text">Number 10</span><br>
      <span>Whitehaven Beach</span><br>
    </div>
  </v-card-title>
</v-card>
</swiper-slide>
<div class="swiper-pagination" slot="pagination"></div>
</swiper>
</v-card>
</v-flex>
</v-layout>
</div>
</template>
<script>
// import {categoriesTags} from '@mixins/CategoriesTags'
export default {
  // mixins: [categoriesTags],
  name: "",
  data: () => ({
    swiperOption: {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      },

      autoplay: {
        delay: 5000,
      },

      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    }
  }),


}
</script>
<style lang="scss" scoped>
</style>

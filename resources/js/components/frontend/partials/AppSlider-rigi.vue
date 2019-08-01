<template>
  <div>
    <v-card tile flat>
      <swiper :options="swiperOption">
        <swiper-slide>
          <v-img
            class="white--text slide--igm"
            :src="`/images/geral/slide1.jpg`"
            aspect-ratio="2.75"
          >
          <div>Slider 1</div>
          </v-img>
        </swiper-slide>
        <swiper-slide>
          <v-img
            class="white--text slide--igm"
            :src="`/images/geral/slide2.jpg`"
            aspect-ratio="2.75"
          ></v-img>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>
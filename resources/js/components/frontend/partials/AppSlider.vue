<template>
  <v-card tile flat mt-0 pt-0>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <v-img class="white--text slide--igm" :src="`/images/geral/slide1.jpg`" aspect-ratio="2.75">
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <div
                class="testando display-1 font-weight-bold text-uppercase justify-start text-xs-right grey--text text--lighten-2"
              >Fromação Profissional</div>
            </div>
            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
            ></v-divider>
            <div class="appCard-content">
              <div
                class="divider ani"
                swiper-animate-effect="rotateInUpRight"
                swiper-animate-duration="4s"
              ></div>
              <p
                class="body-2 font-weight-black text-xs-right"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus, iusto deleniti perferendis unde minima, vel aspernatur optio repudiandae delectus exercitationem hic odit cupiditate tempore rem est.</p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="white" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>
      <swiper-slide>
        <v-img class="white--text slide--igm" :src="`/images/geral/slide2.jpg`" aspect-ratio="2.75">
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <div
                class="display-1 font-weight-bold text-uppercase justify-start text-xs-right grey--text text--lighten-2"
              >Ofertas de Emprego</div>
            </div>
            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
            ></v-divider>
            <div class="appCard-content">
              <div
                class="divider ani"
                swiper-animate-effect="rotateInUpRight"
                swiper-animate-duration="4s"
              ></div>
              <p
                class="body-2 font-weight-black text-xs-right"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus, iusto deleniti perferendis unde minima, vel aspernatur optio repudiandae delectus exercitationem hic odit cupiditate tempore rem est.</p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="white" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </v-card>
</template>

<script>
import * as swiperAni from "@helpers/lib/swiper.animate.min.js";
import { appFilters } from "@mixins/Filters";

export default {
  mixins: [appFilters],
  data() {
    return {
      swiperOption: {
        spaceBetween: 60,
        centeredSlides: true,
        autoplay: {
          delay: 5500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        zoom: true,

        effect: "fade",

        on: {
          slideChange: function() {
            swiperAni.swiperAnimate(this);
          }
        }
      }
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>


<style  scoped  lang="scss">
.swiper-slide {
  background-size: cover;
  background-position: center;
}

.appCard {
  margin: 0;
  padding: 14px;
  width: 40%;
  height: 50%;
  display: table;
  overflow: hidden;
  top: 15%;
  right: 5px;
  position: absolute;
  border-radius: 10px;
  background: rgba(30, 136, 229, 0.6);
  background: linear-gradient(
    0deg,
    rgba(0, 96, 100, 0) 0%,
    rgba(0, 96, 100, 0) 13%,
    rgba(0, 96, 100, 0.008823597798494398) 19%,
    rgba(0, 96, 100, 0.09145656553637083) 28%,
    rgba(0, 96, 100, 0.14187673360359765) 39%,
    rgba(0, 96, 100, 0.27633051511620277) 45%,
    rgba(0, 96, 100, 0.43599438066242124) 54%,
    rgba(0, 96, 100, 0.7749299548921131) 81%,
    rgba(0, 96, 100, 1) 100%
  );

  &-header {
    width: 100%;
    padding: 10px 40px;
    display: block;
    box-sizing: border-box;
  }
  &-content {
    width: 70%;
    height: auto;
    padding: 40px;
    display: block;
    box-sizing: border-box;
    justify-content: flex-end;
    overflow: inherit;
    color: #e0e0e0;
  }
  .divider {
    position: absolute;
    right: 40px;
    top: 30px;
    bottom: 10%;
    border-left: 1px solid white;
    border-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
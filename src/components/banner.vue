<template>
    <div class="bannerswiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in bannerlist" :key="index">
          <img :src="item.img_path" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <!--<div class="swiper-pagination"  slot="pagination"></div>-->
      </swiper>
    </div>
</template>

<script>
import '@/assets/css/swiper.css'
export default {
  name: 'banner',
  props: {
    bannerlist: {}
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: {
          delay: 100,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        height: 'auto',
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      }
    }
  }
}
</script>

<style lang="less">
  .swiper-wrapper{
    height: auto !important;
  }
.bannerswiper{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

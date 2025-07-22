<template>
  <div class="bg-gray-100 rounded-2xl mx-4">
    <v-carousel height="auto" :show-arrows="false" hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in sliders" :key="i">
        <!-- Item -->
        <img :src="slide" class="m-auto rounded-2xl" />
        <!-- End Item -->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "CustomerSliderPage",
  data() {
    return {
      sliders: [
        "images/Slider.jpg",
        // "images/Slider2.jpg",
        // "images/Slider3.jpg",
        // "images/Slider4.png",
        // "images/Slider5.jpg",
      ],
    };
  },
};
</script>

<style></style>
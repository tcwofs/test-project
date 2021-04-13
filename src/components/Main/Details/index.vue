<template>
  <canvas id="canvas" ref="canvas" :width="width" :height="height" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Details',
  data: () => ({
    details: null,
    height: 512,
    width: 512,
    bg: new Image()
  }),
  computed: {
    ...mapGetters({
      getUserData: 'user/getUserData'
    }),
    canvas() {
      return this.$refs.canvas;
    },
    ctx() {
      return this.canvas.getContext('2d');
    }
  },
  async created() {
    this.details = await this.getDetail(this.$route.params.id);
    this.bg.src = `https://tile.openweathermap.org/map/wind_new/${this.details.url}?appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`;
    this.bg.onload = () => {
      const size = Math.min(this.canvas.height, this.canvas.width);

      this.ctx.drawImage(this.bg, 0, 0, size, size);
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapActions({
      getDetail: 'user/getDetail'
    }),
    handleResize() {
      this.height = Math.min(window.innerHeight, window.innerWidth) - 86;
      this.width = Math.min(window.innerHeight, window.innerWidth) - 86;
      this.$nextTick(() => {
        this.drawText();
      });
    },
    drawText() {
      this.ctx.fillStyle = '#fbe9c1';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const size = Math.min(this.canvas.height, this.canvas.width);
      this.ctx.drawImage(this.bg, 0, 0, size, size);
    }
  }
};
</script>

<style lang="scss">
canvas {
  border: solid 1px #39363a;
}
</style>

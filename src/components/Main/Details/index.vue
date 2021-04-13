<template>
  <div>
    <canvas
      id="canvas"
      ref="canvas"
      :width="width"
      :height="height"
      @mousedown="startRect"
      @mouseup="finishedRect"
      @mousemove="draw"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Details',
  data: () => ({
    details: null,
    height: 512,
    width: 512,
    bg: new Image(),
    painting: false,
    startPosition: { x: null, y: null }
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
  async mounted() {
    await this.init();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapActions({
      getDetail: 'user/getDetail',
      addRect: 'user/addRect',
      addComment: 'user/addComment'
    }),
    async init() {
      this.details = await this.getDetail(this.$route.params.id);
      this.bg.src = `https://tile.openweathermap.org/map/wind_new/${this.details.url}?appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`;
      this.bg.onload = () => {
        const size = Math.min(this.canvas.height, this.canvas.width);

        this.ctx.drawImage(this.bg, 0, 0, size, size);

        this.drawRect();
      };
    },
    startRect(e) {
      this.painting = true;
      const [x, y] = this.getMousePos(e);
      this.startPosition.x = x;
      this.startPosition.y = y;
    },
    finishedRect(e) {
      this.painting = false;

      const [x, y] = this.getMousePos(e);

      const rect = {
        x: this.startPosition.x,
        y: this.startPosition.y,
        w: x - this.startPosition.x,
        h: y - this.startPosition.y
      };

      const message = `${Object.values(rect)
        .map((el) => el.toFixed())
        .join(', ')}`;

      this.details.rects.push(rect);
      this.details.comments.push(message);
      this.addRect({ id: this.details.id, postId: this.details.postId, rect });

      this.addComment({
        id: this.details.id,
        postId: this.details.postId,
        comment: message
      });

      this.startPosition.x = null;
      this.startPosition.y = null;
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting) return;

      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#39363a';

      const [x, y] = this.getMousePos(e);
      this.ctx.beginPath();
      this.ctx.rect(
        this.startPosition.x,
        this.startPosition.y,
        x - this.startPosition.x,
        y - this.startPosition.y
      );
      this.ctx.closePath();
      this.drawRect();
      this.ctx.stroke();
    },
    handleResize() {
      this.height = Math.min(window.innerHeight, window.innerWidth) - 86;
      this.width = Math.min(window.innerHeight, window.innerWidth) - 86;
      this.$nextTick(() => {
        this.drawRect();
      });
    },
    drawRect() {
      this.ctx.fillStyle = '#fbe9c1';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const size = Math.min(this.canvas.height, this.canvas.width);
      this.ctx.drawImage(this.bg, 0, 0, size, size);

      this.details.rects.map((el) => {
        let oRec = el;
        this.ctx.strokeStyle = '#39363a';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(oRec.x, oRec.y, oRec.w, oRec.h);
      });
    },
    getMousePos(evt) {
      let rect = this.canvas.getBoundingClientRect(),
        scaleX = this.canvas.width / rect.width,
        scaleY = this.canvas.height / rect.height;

      return [
        (evt.clientX - rect.left) * scaleX,
        (evt.clientY - rect.top) * scaleY
      ];
    }
  }
};
</script>

<style lang="scss">
canvas {
  border: solid 1px #39363a;
}
</style>

<template>
  <div class="media">
    <video
      playsinline
      autoplay
      loop
      muted
      style="height: 600px; width: 100%; object-fit: cover"
    >
      <source :src="data.url" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
.media {
  width: 400px;
  height: 600px;
  background: #eee;
  @media (max-width: 500px) {
    scroll-snap-align: center;
  }
}
</style>

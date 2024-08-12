<template>
  <div class="media">
    <video
      playsinline
      autoplay
      loop
      muted
      style="height: 600px; width: 100%; object-fit: cover"
    >
      <source :src="data.url" type="video/webM" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.media {
  width: 300px;
  height: 600px;
  background: #eee;
}
</style>

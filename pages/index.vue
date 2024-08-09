<template>
  <div class="d-flex" style="position: relative">
    <!-- <img src="/img/bg.png" alt="" width="100%" /> -->
    <video
      playsinline
      autoplay
      loop
      muted
      style="height: 600px; width: 100%; object-fit: cover"
    >
      <source src="/video/bg.webm" type="video/mp4" />
    </video>
    <div class="text-container">
      <div class="text">
        <h1>TORRICELUMN –50%</h1>
        <p>тут может быть любой текст, также как и картинка / видео</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          imageUrl: 'parf.png',
          category: 'ПАРФЮМЕРНЫЙ ЭКСТРАКТ',
          name: 'Clove Tonka',
          oldPrice: '2500₽',
          price: '1990₽',
        },
      ],
    };
  },
};
</script>

<style>
.text-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.text {
  color: white;
}
</style>

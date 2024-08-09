<template>
  <desktop class="desktop" />
</template>

<script>
import desktop from './desktop.vue';
export default {
  components: { desktop },
};
</script>

<style scoped lang="scss">
@media (min-width: 1280px) {
  .desktop {
    display: flex;
  }
}

@media (max-width: 1280px) {
  .desktop {
    display: none;
  }
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.43);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  height: 50px;
  justify-content: space-around;
  z-index: 2;

  & img {
    object-fit: cover;
    object-position: center;
    image-rendering: crisp-edges;
  }
  nav {
    & a {
      font-size: 14px;
    }
  }
}

.icons {
  & li {
    display: flex;
    align-items: center;
  }
}
</style>

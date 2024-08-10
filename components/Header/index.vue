<template>
  <div>
    <desktop class="desktop" />
    <mobile class="mobile" />
  </div>
</template>

<script>
import desktop from './desktop.vue';
import mobile from './mobile.vue';

export default {
  components: { desktop, mobile },
  data() {
    return {
      isLeftMenu: false,
    };
  },
};
</script>

<style scoped lang="scss">
@media (min-width: 800px) {
  .desktop {
    display: flex;
  }
  .mobile {
    display: none;
  }
  .left-menu {
    display: none;
  }
}

@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .left-menu {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.43);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 2;
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

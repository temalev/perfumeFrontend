<template>
  <header>
    <div class="wrapper">
      <div
        class="btnMenu"
        :class="isLeftMenu ? 'active' : ''"
        @click="(isLeftMenu = !isLeftMenu), onMenu()"
      >
        <span></span>
      </div>
    </div>
    <img src="~/assets/img/logo.webp" alt="" width="140" height="50px" />
    <Icon name="ph:magnifying-glass-bold" style="font-size: 20px" />
    <div v-if="isLeftMenu" class="left-menu">
      <nav>
        <ul class="d-flex-column gap-4 m-4">
          <li><NuxtLink class="text-gray" to="/about">КАТАЛОГ</NuxtLink></li>
          <li><NuxtLink class="text-gray" to="/posts/1">БРЕНДЫ</NuxtLink></li>
          <li><NuxtLink class="text-gray" to="/posts/2">СКИДКИ</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLeftMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
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
.left-menu {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 50px;
  left: 0;
  background: rgba(255, 255, 255, 0.43);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 2;
}
.btnMenu {
  display: flex;
  position: absolute;
  top: 5px;
  left: 20px;
  z-index: 50;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  box-sizing: border-box;
  & span {
    height: 2px;
    width: 20px;
    transform: scale(1);
    background-color: #eee;
    border-radius: 10px;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 20px;
    background-color: #eee;
    transition: all 0.3s ease 0s;
    border-radius: 10px;
  }

  &::before {
    top: 14px;
  }

  &::after {
    bottom: 14px;
  }

  &.active span {
    transform: scale(0);
  }

  &.active::before {
    width: 15px;
    top: 50%;
    transform: rotate(-45deg) translate(0, 0%);
  }

  &.active::after {
    width: 15px;
    top: 50%;
    transform: rotate(45deg) translate(0, 0%);
  }
}
</style>

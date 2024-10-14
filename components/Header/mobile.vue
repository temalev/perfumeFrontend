<template>
  <header>
    <div class="wrapper">
      <div
        class="btnMenu"
        :class="isLeftMenu ? 'active' : ''"
        @click="isLeftMenu = !isLeftMenu"
      >
        <span></span>
      </div>
    </div>
    <img
      src="~/public/img/logo.webp"
      alt=""
      width="140"
      height="50px"
      @click="$router.push('/')"
    />
    <Icon name="ph:magnifying-glass-bold" style="font-size: 20px" />
    <div v-if="isLeftMenu" class="left-menu">
      <nav>
        <ul class="d-flex-column gap-4 m-4">
          <li>
            <button
              class="text"
              @click="
                $emit('openCatalog');
                isLeftMenu = false;
              "
            >
              КАТАЛОГ
            </button>
          </li>
          <li>
            <button
              class="text"
              @click="
                $emit('openBrands');
                isLeftMenu = false;
              "
            >
              БРЕНДЫ
            </button>
          </li>
          <li>
            <button
              class="text"
              @click="
                $router.push({
                  name: 'products-list',
                  query: { isSale: true },
                });
                isLeftMenu = false;
              "
            >
              СКИДКИ
            </button>
          </li>
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
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  height: 50px;
  justify-content: space-around;
  z-index: 2;

  & img {
    object-fit: cover;
    object-position: center;
    image-rendering: auto;
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
  width: 100vw;
  height: 100vh;
  top: 50px;
  left: 0;
  background-color: #fff;
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

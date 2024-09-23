<template>
  <header>
    <img
      src="~/assets/img/logo.webp"
      alt=""
      width="140"
      height="50px"
      class="pointer"
      @click="$router.push('/')"
    />

    <nav>
      <ul class="d-flex gap-4">
        <li>
          <button class="text" @click="$emit('openCatalog')">КАТАЛОГ</button>
        </li>
        <li>
          <button class="text" @click="$emit('openBrands')">БРЕНДЫ</button>
        </li>
        <li>
          <button
            class="text"
            @click="
              $router.push({ name: 'products-list', query: { isSale: true } })
            "
          >
            СКИДКИ
          </button>
        </li>
      </ul>
    </nav>
    <ul class="icons d-flex gap-6">
      <li class="pointer">
        <Icon name="ph:magnifying-glass-bold" style="font-size: 20px" />
      </li>
      <li class="pointer">
        <Icon
          name="ri:account-circle-line"
          style="font-size: 20px"
          @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
        />
      </li>
      <li
        class="pointer"
        @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
      >
        <Icon name="ph:tag-bold" style="font-size: 20px" />
      </li>
      <el-badge
        :value="ordersSlugs?.length"
        class="item"
        :hidden="!ordersSlugs?.length"
      >
        <li class="pointer" @click="$emit('openShopBag')">
          <!-- <div v-if="ordersSlugs?.length" class="counter">
          <Transition>
            <span>{{ ordersSlugs?.length }}</span>
          </Transition>
        </div> -->
          <Icon name="ph:shopping-cart-simple-bold" style="font-size: 20px" />
        </li>
      </el-badge>
    </ul>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    ordersSlugs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
header {
  width: 100%;
  display: flex;
  align-items: center;
  /* From https://css.glass */
  background: #fff;
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
    justify-content: center;
    position: relative;

    .counter {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      background-color: red;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      z-index: 9;
      flex-shrink: 0;

      span {
        height: 13px;
      }
    }
  }
}
</style>

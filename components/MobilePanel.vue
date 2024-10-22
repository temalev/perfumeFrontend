<template>
  <ul class="panel icons">
    <li @click="$router.push({ name: 'index' })" class="pointer">
      <Icon name="ph:house-bold" style="font-size: 26px" />
    </li>
    <li
      class="pointer"
      @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
    >
      <Icon name="ph:tag-bold" style="font-size: 26px" />
    </li>
    <li
      class="pointer"
      @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
    >
      <Icon name="ri:account-circle-line" style="font-size: 26px" />
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
        <Icon name="ph:shopping-cart-simple-bold" style="font-size: 26px" />
      </li>
    </el-badge>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      user: useState('user'),
      ordersSlugs: useState('ordersSlugs'),
    };
  },
};
</script>

<style scoped lang="scss">
.panel {
  height: 50px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (min-width: 500px) {
  .panel {
    display: none;
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

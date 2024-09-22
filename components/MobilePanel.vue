<template>
  <ul class="panel icons">
    <li @click="$router.push({ name: 'index' })" class="pointer">
      <Icon name="ph:house-bold" style="font-size: 26px" />
    </li>
    <li class="pointer">
      <Icon name="ph:tag-bold" style="font-size: 26px" />
    </li>
    <li class="pointer">
      <Icon
        name="ri:account-circle-line"
        style="font-size: 26px"
        @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
      />
    </li>

    <li class="pointer" @click="$emit('openShopBag')">
      <div v-if="ordersSlugs?.length" class="counter">
        <Transition>
          <span>{{ ordersSlugs?.length }}</span>
        </Transition>
      </div>
      <Icon name="ph:shopping-cart-simple-bold" style="font-size: 26px" />
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      user: useState('user'),
    };
  },
};
</script>

<style scoped lang="scss">
.panel {
  height: 60px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

@media (min-width: 500px) {
  .panel {
    display: none;
  }
}
</style>

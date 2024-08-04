<template>
  <header>
    <img src="~/assets/img/logo.webp" alt="" width="140" height="50px" />
    <nav>
      <ul class="d-flex gap-4">
        <li><NuxtLink class="text-gray" to="/about">КАТАЛОГ</NuxtLink></li>
        <li><NuxtLink class="text-gray" to="/posts/1">БРЕНДЫ</NuxtLink></li>
        <li><NuxtLink class="text-gray" to="/posts/2">СКИДКИ</NuxtLink></li>
      </ul>
    </nav>
    <ul class="icons d-flex gap-6">
      <li class="pointer">
        <Icon name="ph:magnifying-glass-bold" style="font-size: 20px" />
      </li>
      <li class="pointer">
        <Icon name="ri:account-circle-line" style="font-size: 20px" />
      </li>
      <li class="pointer">
        <Icon name="fa6-regular:heart" style="font-size: 20px" />
      </li>
      <li class="pointer">
        <Icon name="ph:shopping-cart-simple-bold" style="font-size: 20px" />
      </li>
    </ul>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  background-color: #eee;
  height: 50px;
  justify-content: space-around;

  & img {
    object-fit: cover;
    object-position: center;
  }
}

.icons {
  & li {
    display: flex;
    align-items: center;
  }
}
</style>

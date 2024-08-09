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
</style>

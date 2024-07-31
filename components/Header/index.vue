<template>
  <header>
    <img src="~/assets/img/logo.webp" alt="" width="140" height="50px" />
    <nav>
      <ul>
        <li><NuxtLink class="text-gray" to="/about">КАТАЛОГ</NuxtLink></li>
        <li><NuxtLink class="text-gray" to="/posts/1">БРЕНДЫ</NuxtLink></li>
        <li><NuxtLink class="text-gray" to="/posts/2">СКИДКИ</NuxtLink></li>
      </ul>
    </nav>
    <div class="icons">-</div>
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
ul {
  display: flex;
  gap: 12px;
}
</style>

<template>
  <div class="footer">
    <div class="d-flex-column">
      <div class="column-label">Информация</div>
      <ul>
        <li class="pointer" @click="$emit('onInfoModal', 'delivery')">
          Доставка
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  height: 300px;
  background-color: #000;
  color: #fff;
  padding: 20px;

  & .pointer:hover {
    opacity: 0.8;
  }
}
</style>

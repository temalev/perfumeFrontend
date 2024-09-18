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
    <div class="d-flex-column">
      <div>
        <el-link>info@parfburo.com</el-link>
        - По вопросам сотрудничества, идеям по улучшению и жалобам.
      </div>

      <ul>
        <li>
          <el-text class="mx-1" type="info" size="small"
            >ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ДЁМИН МИХАИЛ МИХАЙЛОВИЧ</el-text
          >
        </li>
        <li>
          <el-text class="mx-1" type="info" size="small"
            >ИНН: 621504323474</el-text
          >
        </li>
        <li>
          <el-text class="mx-1" type="info" size="small"
            >ОГРНИП: 321623400003805</el-text
          >
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
  justify-content: space-around;

  & .pointer:hover {
    opacity: 0.8;
  }
}
</style>

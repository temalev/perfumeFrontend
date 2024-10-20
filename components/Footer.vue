<template>
  <div class="footer">
    <div class="d-flex-column">
      <ul>
        <li class="pointer" @click="$emit('onInfoModal', 'about')">О нас</li>
        <li class="pointer mt-1" @click="$emit('onInfoModal', 'delivery')">
          Доставка
        </li>
        <li class="pointer mt-1" @click="$emit('onInfoModal', 'noBrands')">
          Нет нужного аромата / бренда
        </li>
      </ul>
    </div>
    <div class="d-flex-column">
      <div class="d-flex gap-4 mb-2">
        <el-link>+7(993)269-01-88</el-link>
        <el-link :underline="false" href="https://t.me/parfburoo">
          <Icon name="logos:telegram" style="font-size: 20px" />
        </el-link>
        <el-link :underline="false" href="https://wa.me/79932690188">
          <Icon name="logos:whatsapp-icon" style="font-size: 20px" />
        </el-link>
      </div>
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
  flex-wrap: wrap;
  height: 300px;
  background-color: #000;
  color: #fff;
  padding: 20px;
  justify-content: space-around;

  @media (max-width: 800px) {
    justify-content: flex-start;
  }

  & .pointer:hover {
    opacity: 0.8;
  }
}
</style>

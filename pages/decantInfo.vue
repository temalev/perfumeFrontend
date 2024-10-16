<template>
  <main>
    <img
      src="/img/decant.webp"
      alt=""
      width="100%"
      height="600px"
      style="object-fit: cover"
    />
    <h1 class="mt-4">Отливанты</h1>
    <p class="mt-4">
      Если у вас есть сомнения в покупке полноразмерного флакона, вы можете
      приобрести отливант нужного вам аромата. <br />
      <br />
      Отливант — это оригинальный аромат, разлитый из заводского, фирменного
      флакона во флаконы меньшего объема, которые называются атомайзерами.
      <br />
      Это самый доступный способ познакомиться с ароматом и протестировать его
      на себе. <br />
      <br />
      Благодаря компактным размерам атомайзера, отливанты также могут стать
      незаменимым атрибутом в путешествиях! <br />
      <br />
      Отливанты доступны объемом от 10мл. Это примерно 120-125 «пшиков», которых
      вам хватит на 4-5 недель использования. <br />
      <br />
      Чтобы уточнить цену на интересующий вас аромат, пожалуйста, свяжитесь с
      отделом поддержки.
    </p>

    <div class="d-flex mt-4">
      <el-button>
        <el-link :underline="false" href="https://t.me/parfburoo">
          <Icon name="logos:telegram" style="font-size: 20px" />
        </el-link>
      </el-button>
      <el-button>
        <el-link :underline="false" href="https://wa.me/79932690188">
          <Icon name="logos:whatsapp-icon" style="font-size: 20px" />
        </el-link>
      </el-button>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
main {
  min-height: 100vh;
  padding: 20px;
}
</style>

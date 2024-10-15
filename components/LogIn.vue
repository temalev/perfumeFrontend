<template>
  <modal header="Вход / Регистрация" @close="handleClose">
    <div class="login-modal">
      <template v-if="step === 'call'">
        <p class="mt-2 mb-3">
          Позвоним или пришлём SMS. Введите последние четыре цифры номера
          телефона или код из SMS-сообщения.
        </p>
        <!-- <the-input-phone v-model="value" /> -->
        <el-input v-mask="'(###) ###-##-##'" v-model="value">
          <template #prefix> <div class="mr-1">+7</div> </template>
        </el-input>
        <!-- <TheButton class="mt-4" @click="getCode">Получить код</TheButton> -->
        <el-button
          :loading="getCodeLoading"
          :disabled="timeLeft"
          type="primary"
          class="mt-4"
          @click="getCode"
          >Получить код <span v-if="timeLeft">через {{ timeLeft }}</span>
        </el-button>
      </template>
      <template v-if="step === 'code'">
        <h1>Подтвердите номер</h1>
        <p class="mt-2 mb-3">
          Введите последние четыре цифры входящего номера.
        </p>
        <el-input v-model="code" />
        <span v-if="timeLeft" class="text-secondary">
          Запросить следующий код возможно через {{ timeLeft }} сек.
        </span>
        <TheButton v-else class="mt-4" type="text" @click="step = 'call'">
          Получить код повторно
        </TheButton>
        <!-- <TheButton class="mt-4" @click="login">Подтвердить номер</TheButton> -->
        <el-button
          :loading="loginLoading"
          type="primary"
          class="mt-4"
          @click="login"
          >Подтвердить номер</el-button
        >
      </template>
    </div>
  </modal>
</template>

<script>
import TheButton from './ui/TheButton.vue';
import Modal from './ui/Modal.vue';
import TheInputPhone from './ui/TheInput/TheInputPhone.vue';
import TheInput from './ui/TheInput/TheInput.vue';

import { getCodeFromCall, login } from '@/api/productApi.js';

export default {
  components: { Modal, TheInputPhone, TheButton, TheInput },
  data() {
    return {
      value: '',
      step: 'call',
      timeLeft: null,
      uuid: null,
      code: null,
      getCodeLoading: false,
      loginLoading: false,
    };
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('close');
    },
    async getCode() {
      this.getCodeLoading = true;
      const data = {
        phoneNumber: `7${this.value.replace(/\D/g, '')}`,
      };
      try {
        const res = await getCodeFromCall(data);
        this.step = 'code';
        this.uuid = res.uuid;
        this.startTimer();
        this.timeLeft = 60;
      } catch (e) {
        console.error(e);
      }
      this.getCodeLoading = false;
    },
    async login() {
      this.loginLoading = true;
      const data = {
        code: this.code,
        uuid: this.uuid,
      };
      try {
        const res = await login(data);
        this.$emit('success');
        this.$emit('close');
      } catch (e) {
        console.error(e);
      }
      this.loginLoading = false;
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.stopTimer();
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>

<style scoped lang="scss">
.login-modal {
  padding: 0 20px;
  width: 400px;
  h1 {
    // margin: 0 12px;
  }
}
</style>

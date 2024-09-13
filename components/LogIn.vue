<template>
  <modal @close="handleClose">
    <div class="login-modal">
      <template v-if="step === 'call'">
        <h1>войти или зарегистрироваться</h1>
        <p class="mt-2 mb-3">
          Позвоним или пришлём SMS. Введите последние четыре цифры номера
          телефона или код из SMS-сообщения.
        </p>
        <the-input-phone v-model="value" />
        <TheButton @click="getCode">Получить код</TheButton>
      </template>
      <template v-if="step === 'code'">
        <h1>Подтвердите номер</h1>
        <p class="mt-2 mb-3">
          Введите последние четыре цифры входящего номера.
        </p>
        <the-input type="number" v-model="code" />
        <span v-if="timeLeft" class="text-secondary">
          Запросить следующий код возможно через {{ timeLeft }} сек.
        </span>
        <TheButton v-else class="mt-4" type="text" @click="step = 'call'">
          Получить код повторно
        </TheButton>
        <TheButton class="mt-4" @click="login">Подтвердить номер</TheButton>
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
      timeLeft: 30,
      uuid: null,
      code: null,
    };
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('close');
    },
    async getCode() {
      const data = {
        phoneNumber: this.value,
      };
      try {
        const res = await getCodeFromCall(data);
        this.step = 'code';
        this.uuid = res.uuid;
        this.startTimer();
      } catch (e) {
        console.error(e);
      }
    },
    async login() {
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
  margin: 0 20px;
  width: 400px;
  h1 {
    // margin: 0 12px;
  }
}
</style>

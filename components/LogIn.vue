<template>
  <modal header="Вход / Регистрация" @close="handleClose">
    <div class="login-modal">
      <template v-if="step === 'call'">
        <p class="mt-2 mb-3">
          Позвоним или пришлём SMS. <br />
          Введите последние четыре цифры номера телефона или код из
          SMS-сообщения.
        </p>
        <el-form :model="form" @submit.prevent @keyup.enter="getCode">
          <el-form-item
            label="Введите последние четыре цифры входящего номера."
            label-position="top"
            :error="errorCode"
          >
            <el-input v-mask="'(###) ###-##-##'" v-model="form.value">
              <template #prefix> <div class="mr-1">+7</div> </template>
            </el-input>
          </el-form-item>
        </el-form>

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
        <!-- <p class="mt-2 mb-3">
          Введите последние четыре цифры входящего номера.
        </p> -->
        <el-form :model="form" @submit.prevent>
          <el-form-item
            label="Введите код из SMS-сообщения"
            label-position="top"
            :error="errorLogin"
          >
            <el-input v-model="form.code" />
          </el-form-item>
        </el-form>
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
          @click.prevent="login"
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

import { getCodeFromCall, getCodeFromSms, login } from '@/api/productApi.js';

export default {
  components: { Modal, TheInputPhone, TheButton, TheInput },
  data() {
    return {
      value: '',
      step: 'call',
      timeLeft: null,
      uuid: null,
      getCodeLoading: false,
      loginLoading: false,
      errorCode: null,
      errorLogin: '',
      form: {
        code: null,
        value: null,
      },
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
        phoneNumber: `7${this.form.value.replace(/\D/g, '')}`,
      };
      try {
        const res = await getCodeFromCall(data);
        this.step = 'code';
        this.uuid = res.uuid;
        this.startTimer();
        this.timeLeft = 60;
      } catch (e) {
        console.error(e);
        this.errorCode = e;
      }
      this.getCodeLoading = false;
    },
    async login() {
      this.loginLoading = true;
      const data = {
        code: this.form.code,
        uuid: this.uuid,
      };
      try {
        const res = await login(data);
        this.$emit('success');
        this.$emit('close');
      } catch (e) {
        console.error(e);
        this.errorLogin = e;
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

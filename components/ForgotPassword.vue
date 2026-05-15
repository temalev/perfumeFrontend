<template>
  <modal header="Восстановление пароля" @close="$emit('close')">
    <div class="forgot-modal">
      <template v-if="!sent">
        <p class="mt-2 mb-3">
          Введите email — пришлём ссылку для восстановления пароля.
        </p>
        <el-form :model="form" @submit.prevent @keyup.enter="submit">
          <el-form-item label="Email" label-position="top" :error="emailError">
            <el-input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </el-form-item>
          <p v-if="formError" class="error-text">{{ formError }}</p>
          <el-button
            :loading="loading"
            type="primary"
            class="mt-2 w-100"
            @click="submit"
          >
            Отправить ссылку
          </el-button>
        </el-form>
      </template>
      <template v-else>
        <p class="mt-2 mb-3">
          Если такой email зарегистрирован, мы отправили на него письмо со
          ссылкой для сброса пароля. Письмо может прийти в течение нескольких
          минут.
        </p>
        <el-button class="w-100" @click="$emit('close')">Закрыть</el-button>
      </template>
    </div>
  </modal>
</template>

<script>
import Modal from './ui/Modal.vue';
import { forgotPassword } from '@/api/productApi.js';

export default {
  components: { Modal },
  emits: ['close'],
  data() {
    return {
      sent: false,
      loading: false,
      emailError: '',
      formError: '',
      form: { email: '' },
    };
  },
  methods: {
    async submit() {
      this.emailError = '';
      this.formError = '';
      const email = this.form.email.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.emailError = 'Введите корректный email';
        return;
      }
      this.loading = true;
      try {
        await forgotPassword(email.toLowerCase());
        this.sent = true;
      } catch (e) {
        this.formError = e?.message || 'Не удалось отправить ссылку';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.forgot-modal {
  padding: 0 20px;
  width: 400px;
}
.w-100 {
  width: 100%;
}
.error-text {
  color: #f56c6c;
  font-size: 13px;
  margin-top: 4px;
}
</style>

<template>
  <modal :header="modalHeader" @close="handleClose">
    <div class="login-modal">
      <el-tabs v-model="mode" class="mb-3">
        <el-tab-pane label="Вход" name="login" />
        <el-tab-pane label="Регистрация" name="register" />
      </el-tabs>

      <el-form
        :model="form"
        :error="formError"
        @submit.prevent
        @keyup.enter="submit"
      >
        <el-form-item v-if="mode === 'register'" label="Имя" label-position="top">
          <el-input v-model="form.name" placeholder="Как к вам обращаться" />
        </el-form-item>

        <el-form-item label="Email" label-position="top" :error="emailError">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
          />
        </el-form-item>

        <el-form-item label="Пароль" label-position="top" :error="passwordError">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Не менее 6 символов"
            show-password
            :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
          />
        </el-form-item>

        <p v-if="formError" class="error-text">{{ formError }}</p>

        <el-button
          :loading="loading"
          type="primary"
          class="mt-2 w-100"
          @click="submit"
        >
          {{ mode === 'register' ? 'Создать аккаунт' : 'Войти' }}
        </el-button>

        <div class="links mt-3">
          <el-button
            v-if="mode === 'login'"
            type="text"
            @click="$emit('forgot')"
          >
            Забыли пароль?
          </el-button>
        </div>
      </el-form>
    </div>
  </modal>
</template>

<script>
import Modal from './ui/Modal.vue';
import { login, register } from '@/api/productApi.js';

export default {
  components: { Modal },
  emits: ['close', 'success', 'forgot'],
  data() {
    return {
      mode: 'login',
      loading: false,
      formError: '',
      emailError: '',
      passwordError: '',
      form: {
        email: '',
        password: '',
        name: '',
      },
    };
  },
  computed: {
    modalHeader() {
      return this.mode === 'register' ? 'Регистрация' : 'Вход';
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    resetErrors() {
      this.formError = '';
      this.emailError = '';
      this.passwordError = '';
    },
    validate() {
      this.resetErrors();
      const email = this.form.email.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.emailError = 'Введите корректный email';
        return false;
      }
      if (!this.form.password || this.form.password.length < 6) {
        this.passwordError = 'Минимум 6 символов';
        return false;
      }
      return true;
    },
    async submit() {
      if (!this.validate()) return;
      this.loading = true;
      try {
        const payload = {
          email: this.form.email.trim().toLowerCase(),
          password: this.form.password,
        };
        if (this.mode === 'register') {
          payload.name = this.form.name?.trim() || undefined;
          await register(payload);
        } else {
          await login(payload);
        }
        this.$emit('success');
        this.$emit('close');
      } catch (e) {
        this.formError = e?.message || 'Не удалось войти';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-modal {
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
.links {
  text-align: center;
}
</style>

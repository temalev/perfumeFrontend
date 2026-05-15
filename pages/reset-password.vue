<template>
  <div class="reset-page">
    <div class="reset-card">
      <h1>Новый пароль</h1>
      <template v-if="!done">
        <p class="mb-3">Придумайте новый пароль для входа.</p>
        <el-form :model="form" @submit.prevent @keyup.enter="submit">
          <el-form-item label="Новый пароль" label-position="top" :error="passwordError">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="Не менее 6 символов"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="Повторите пароль" label-position="top" :error="confirmError">
            <el-input
              v-model="form.confirm"
              type="password"
              show-password
              autocomplete="new-password"
            />
          </el-form-item>
          <p v-if="formError" class="error-text">{{ formError }}</p>
          <el-button
            :loading="loading"
            type="primary"
            class="mt-2 w-100"
            @click="submit"
          >
            Сохранить пароль
          </el-button>
        </el-form>
      </template>
      <template v-else>
        <p class="mb-3">Пароль обновлён. Теперь можно войти в аккаунт.</p>
        <el-button type="primary" class="w-100" @click="goHome">
          На главную
        </el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { resetPassword } from '@/api/productApi.js';

const route = useRoute();
const router = useRouter();
const token = computed(() => String(route.query.token || ''));

const form = ref({ password: '', confirm: '' });
const loading = ref(false);
const done = ref(false);
const passwordError = ref('');
const confirmError = ref('');
const formError = ref('');

useHead({
  title: 'Восстановление пароля — ПарфБюро',
});

function resetErrors() {
  passwordError.value = '';
  confirmError.value = '';
  formError.value = '';
}

async function submit() {
  resetErrors();
  if (!token.value) {
    formError.value = 'Ссылка для сброса пароля недействительна';
    return;
  }
  if (!form.value.password || form.value.password.length < 6) {
    passwordError.value = 'Минимум 6 символов';
    return;
  }
  if (form.value.password !== form.value.confirm) {
    confirmError.value = 'Пароли не совпадают';
    return;
  }
  loading.value = true;
  try {
    await resetPassword({ token: token.value, password: form.value.password });
    done.value = true;
  } catch (e) {
    formError.value = e?.message || 'Не удалось сохранить пароль';
  } finally {
    loading.value = false;
  }
}

function goHome() {
  router.push('/');
}
</script>

<style scoped lang="scss">
.reset-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.reset-card {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
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

<template>
  <div class="layout">
    <Head>
      <Title>parfBuro</Title>
    </Head>

    <Header />
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script>
import { getMe, addToFavorites } from '@/api/productApi.js';

export default {
  data() {
    return {
      isModal: false,
      token: null, // Хранит значение токена, если он есть
      user: null,
      favorites: [],
    };
  },
  mounted() {
    this.user = useState('user', () => null);
    this.getMe();
    useState('ordersSlugs', () => {
      const slugs = window.localStorage.getItem('ordersSlugs');
      return slugs ? slugs.split(',') : [];
    });
    this.favorites = useState('favoritesSlugs', () => []);
  },
  watch: {
    favorites(val) {
      this.addToFavorites(val);
    },
  },
  methods: {
    async getMe() {
      try {
        const res = await getMe();
        this.user = res;
      } catch (e) {
        console.error(e);
      }
    },
    async addToFavorites(slug) {
      try {
        const res = await addToFavorites(slug);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main {
  overflow: auto;
  height: calc(100vh - 50px);
}
</style>

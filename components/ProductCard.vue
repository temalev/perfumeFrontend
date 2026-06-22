<template>
  <article class="card" @click="handleCardClick">
    <div class="pcard-img">
      <img :src="image(data?.previewImage)" :alt="data.name" />
      <button
        class="pcard-wish"
        :class="{ active: data?.isFavorite }"
        :disabled="favoriteLoading"
        aria-label="В избранное"
        @click.stop="
          preventCardClick = true;
          data?.isFavorite ? deleteFavorite(data.id) : onAddToFavorites(data.slug);
        "
      >
        <Icon
          :name="data?.isFavorite ? 'ph:heart-fill' : 'ph:heart'"
          style="font-size: 15px"
        />
      </button>
    </div>

    <div class="pcard-body">
      <div class="pcard-type">{{ data.type }}</div>
      <div class="pcard-name">{{ `${data?.brand} ${data?.name}` }}</div>
      <div class="pcard-orig">оригинал · чек</div>
      <div class="pcard-foot">
        <div class="pcard-price-wrap">
          <span class="pcard-price">{{ formatPrice(data.price) }}&nbsp;₽</span>
          <span v-if="data.discount" class="pcard-old">
            {{ formatPrice(data.price * (1 + data.discount / 100)) }}&nbsp;₽
          </span>
        </div>
        <button class="btn-add" aria-label="В корзину" @click.stop="addToShopBag(data.slug)">+</button>
      </div>
    </div>

    <log-in
      v-if="isLoginModal"
      @close="handleLoginClose"
      @success="
        addToFavorites();
        preventCardClick = true;
      "
    />
  </article>
</template>

<script>
import LogIn from '~/components/LogIn.vue';
import { deleteFavorite, addToFavorites } from '@/api/productApi.js';
export default {
  components: { LogIn },
  props: {
    data: {
      type: Object,
      default: null,
    },
    isFavorites: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ordersSlugs: useState('ordersSlugs'),
      user: null,
      isLoginModal: false,
      preventCardClick: false,
      favoriteLoading: false,
    };
  },
  mounted() {
    this.user = localStorage.getItem('user');
  },
  methods: {
    handleCardClick() {
      if (!this.preventCardClick) {
        this.$router.push({
          name: 'products-slug',
          params: { slug: this.data.slug },
        });
      }
    },
    handleLoginClose() {
      this.isLoginModal = false;
      this.preventCardClick = true;
    },
    image(url) {
      return url ? url : '/img/no_image.png';
    },
    formatPrice(value) {
      return new Intl.NumberFormat('ru').format(Math.round(value));
    },
    onAddToFavorites(slug) {
      if (this.user) {
        this.addToFavorites(slug);
      } else {
        this.isLoginModal = true;
      }
    },
    async deleteFavorite(id) {
      this.favoriteLoading = true;
      try {
        await deleteFavorite(id);
        this.data.isFavorite = false;
      } catch (e) {
        console.error(e);
      }
      this.favoriteLoading = false;
    },
    async addToFavorites(slug) {
      this.favoriteLoading = true;
      try {
        await addToFavorites(this.data.slug);
        this.data.isFavorite = true;
      } catch (e) {
        console.error(e);
      }
      this.favoriteLoading = false;
    },
    addToShopBag(slug) {
      if (window.localStorage.getItem('ordersSlugs')) {
        this.ordersSlugs.push(slug);
        if (this.ordersSlug?.length) {
          window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
        } else {
          window.localStorage.removeItem('ordersSlugs');
        }
      } else {
        this.ordersSlugs.push(slug);
        window.localStorage.setItem('ordersSlugs', slug);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  scroll-snap-align: start;
  width: 280px;
  border-radius: var(--r);
  overflow: hidden;
  border: 0.5px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: var(--border-strong);
    box-shadow: 0 6px 20px rgba(20, 20, 25, 0.07);
  }

  @media (max-width: 500px) {
    width: 100%;
  }
}

.pcard-img {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fff;

  & img {
    width: 74%;
    height: 74%;
    object-fit: contain;
  }
}

.pcard-wish {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid var(--border);
  color: var(--ink-muted);
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;

  &:hover {
    transform: scale(1.08);
    color: var(--ink);
  }

  &.active {
    color: var(--blue);
  }
}

.pcard-body {
  padding: 13px 14px;
}

.pcard-type {
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 4px;
}

.pcard-name {
  font-family: var(--serif);
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 6px;
  line-height: 1.35;
  min-height: 36px;
  color: var(--ink);

  @media (max-width: 500px) {
    min-height: 0;
  }
}

.pcard-orig {
  font-size: 10px;
  color: var(--ink-muted);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #2a8a5a;
    display: inline-block;
  }
}

.pcard-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pcard-price-wrap {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.pcard-price {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}

.pcard-old {
  font-size: 12px;
  color: var(--ink-muted);
  text-decoration: line-through;
}

.btn-add {
  background: var(--ink);
  color: #fff;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.06);
  }
}
</style>

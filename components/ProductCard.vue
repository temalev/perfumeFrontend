<template>
  <article class="card d-flex-column" @click="handleCardClick">
    <div class="img-container d-flex j-c">
      <img :src="image(data?.images[0])" :alt="data.name" />
      <!-- <button
        v-if="isFavorites"
        class="ico-btn d-flex align-center j-c favorite-ico"
        @click.stop="addToFavorites(data.slug)"
      >
        <Icon name="ph:tag-bold" style="font-size: 20px" />
      </button> -->
      <el-button
        v-if="!data?.isFavorite"
        style="width: 42px"
        class="ico-btn"
        :loading="favoriteLoading"
        @click.stop="addToFavorites(data.slug)"
      >
        <Icon
          v-if="!favoriteLoading"
          name="ph:tag-bold"
          style="font-size: 20px"
        />
      </el-button>
      <el-button
        v-else
        style="width: 42px"
        class="ico-btn"
        :loading="favoriteLoading"
        @click.stop="deleteFavorite(data.id)"
      >
        <Icon
          v-if="!favoriteLoading"
          name="ph:tag-fill"
          style="font-size: 20px; color: black"
        />
      </el-button>
    </div>

    <div class="info d-flex-column align-flex-start gap-3">
      <span class="category">{{ data.type }}</span>
      <span class="name">{{ `${data?.brand} ${data?.name}` }}</span>

      <div class="pay d-flex-row j-sb w100">
        <div class="info-price d-flex align-flex-end">
          <span class="new-price"
            >{{ new Intl.NumberFormat('ru').format(data.price) }}&nbsp;₽</span
          >
          <span v-if="data.discount" class="old-price">
            {{
              new Intl.NumberFormat('ru').format(
                data.price * (1 + data.discount / 100)
              )
            }}&nbsp;₽
          </span>
        </div>

        <button
          class="ico-btn d-flex align-center j-c shop-bag-ico"
          @click.stop="addToShopBag(data.slug)"
        >
          <span class="plus-ico" style="font-size: 20px">+</span>
          <Icon name="ph:shopping-cart-simple-bold" style="font-size: 20px" />
        </button>
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
      user: useState('user'),
      isLoginModal: false,
      preventCardClick: false,
      favoriteLoading: false,
    };
  },
  methods: {
    handleCardClick() {
      if (!this.preventCardClick) {
        this.$router.push({
          name: 'products-slug',
          params: { slug: this.data.slug },
        });
      }
      this.preventCardClick = false;
    },
    handleLoginClose() {
      this.isLoginModal = false;
      this.preventCardClick = true;
    },
    image(url) {
      return url ? url : '/img/no_image.png';
    },
    addToFavorites() {
      if (this.user) {
        this.addToFavorites();
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
        await addToFavorites(slug);
        this.data.isFavorite = true;
      } catch (e) {
        console.error(e);
      }
      this.favoriteLoading = false;
    },
    addToShopBag(slug) {
      console.log(slug);

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
  scroll-snap-align: center;
  width: 300px;
  box-shadow: rgba(50, 50, 93, 0.123) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.093) 0px 8px 16px -8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.044) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.034) 0px 8px 16px -8px;
  }
}

img {
  width: 300px;
  height: 250px;
  top: 200px;
  left: 76px;
  object-fit: contain;
  background: #fff;
}

.img-container {
  position: relative;
  background: #fff;
  & .ico-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

.product-price {
  margin-bottom: 1rem;
}
.old-price {
  text-decoration: line-through;
  color: #999;
  font-family: Anselm Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 15.43px;
  text-align: center;
}
.new-price {
  font-family: Anselm Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 15.43px;
  text-align: center;
}
.info-name {
  gap: 4px;
}
.category {
  color: #999;
  font-family: Anselm Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 14.15px;
  text-align: center;
}
.name {
  font-family: Anselm Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
}
.info {
  padding: 20px;
}

.info-price {
  gap: 10px;
}

.favorite-ico:hover {
  transform-origin: 0 0;
  animation: swaying 0.2s;
}

@keyframes swaying {
  0% {
    transform: rotate(-8deg); /* Начальное положение - наклон влево */
  }
  50% {
    transform: rotate(8deg); /* Среднее положение - наклон вправо */
  }
  100% {
    transform: rotate(-8deg); /* Возвращаемся к исходному наклону */
  }
}

.shop-bag-ico:hover .plus-ico {
  margin-right: -5px;
}
</style>

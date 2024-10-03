<template>
  <header>
    <img
      src="~/assets/img/logo.webp"
      alt=""
      width="140"
      height="50px"
      class="pointer"
      @click="
        $router.push('/');
        $emit('closeModal');
      "
    />

    <nav>
      <ul class="d-flex gap-4">
        <li>
          <button class="text" @click="$emit('openCatalog')">КАТАЛОГ</button>
        </li>
        <li>
          <button class="text" @click="$emit('openBrands')">БРЕНДЫ</button>
        </li>
        <li>
          <button
            class="text"
            @click="
              $router.push({ name: 'products-list', query: { isSale: true } })
            "
          >
            СКИДКИ
          </button>
        </li>
      </ul>
    </nav>
    <ul class="icons d-flex gap-6">
      <li class="pointer search">
        <!-- <el-input
          ref="input"
          class="search-input"
          v-if="isSearch"
          v-model="search"
          @blur="isSearch = false"
          autofocus
        /> -->
        <el-autocomplete
          ref="input"
          class="search-input"
          v-if="isSearch"
          v-model="search"
          autofocus
          @blur="isSearch = false"
          :fetch-suggestions="querySearch"
          popper-class="my-autocomplete"
          placeholder="Поиск..."
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div class="d-flex j-b align-center mt-2 mb-2">
              <img
                width="40"
                height="40"
                :src="imgUrl(item?.images[0])"
                :alt="item?.name"
              />
              <div class="ml-2">{{ item.name }}</div>
              <div class="ml-2">{{ item.price }} ₽</div>
            </div>
          </template>
        </el-autocomplete>
        <Icon
          @click.prevent="onInput"
          name="ph:magnifying-glass-bold"
          style="font-size: 20px"
          class="ml-2"
        />
      </li>
      <li class="pointer">
        <Icon
          name="ri:account-circle-line"
          style="font-size: 20px"
          @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
        />
      </li>
      <li
        class="pointer"
        @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
      >
        <Icon name="ph:tag-bold" style="font-size: 20px" />
      </li>
      <el-badge
        :value="ordersSlugs?.length"
        class="item"
        :hidden="!ordersSlugs?.length"
      >
        <li class="pointer" @click="$emit('openShopBag')">
          <!-- <div v-if="ordersSlugs?.length" class="counter">
          <Transition>
            <span>{{ ordersSlugs?.length }}</span>
          </Transition>
        </div> -->
          <Icon name="ph:shopping-cart-simple-bold" style="font-size: 20px" />
        </li>
      </el-badge>
    </ul>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    ordersSlugs: {
      type: Array,
      default: () => [],
    },
    querySearch: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      isSearch: false,
    };
  },
  watch: {
    search(val) {
      this.$emit('onSearch', val);
    },
  },
  methods: {
    onInput() {
      this.isSearch = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 100);
    },
    imgUrl(url) {
      return url ? url : '/img/no_image.png';
    },
    handleSelect(val) {
      this.$router.push({
        name: 'products-slug',
        params: { slug: val.slug },
      });
      this.isSearch = false;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  width: 100%;
  display: flex;
  align-items: center;
  /* From https://css.glass */
  background: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  height: 50px;
  justify-content: space-around;
  z-index: 2;

  & img {
    object-fit: cover;
    object-position: center;
    image-rendering: crisp-edges;
  }
  nav {
    & a {
      font-size: 14px;
    }
  }
}

.search {
  position: relative;
  ::v-deep {
    .search-input {
      position: absolute;
      top: -5px;
      left: -240px;
      width: 230px;
      font-size: 16px !important;
    }
  }
}

.icons {
  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .counter {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      background-color: red;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      z-index: 9;
      flex-shrink: 0;

      span {
        height: 13px;
      }
    }
  }
}

.my-autocomplete {
  background-color: red;
}
</style>

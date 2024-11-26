<template>
  <header>
    <div class="header-elements">
      <div
        class="btnMenu"
        :class="isLeftMenu ? 'active' : ''"
        @click="
          isLeftMenu = !isLeftMenu;
          $emit('closeModal');
        "
      >
        <span></span>
      </div>
      <img
        src="~/public/img/logo.webp"
        alt=""
        width="140"
        height="50px"
        @click="
          $router.push('/');
          isLeftMenu = false;
          $emit('closeModal');
        "
      />
      <button class="ico-btn" style="width: 40px" aria-label="Открыть поиск">
        <Icon
          @click.prevent="onInput"
          name="ph:magnifying-glass-bold"
          style="font-size: 20px"
        />
      </button>
    </div>
    <transition name="slide-fade">
      <div v-if="isSearch" class="search-input-wrapper">
        <el-autocomplete
          ref="input"
          class="search-input"
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
      </div>
    </transition>
    <div v-if="isLeftMenu" class="left-menu">
      <ul class="d-flex-column gap-4 m-4">
        <li>
          <el-button
            type="text"
            @click="
              $emit('openCatalog');
              isLeftMenu = false;
            "
          >
            КАТАЛОГ
          </el-button>
        </li>
        <li>
          <el-button
            type="text"
            @click="
              $emit('openBrands');
              isLeftMenu = false;
            "
          >
            БРЕНДЫ
          </el-button>
        </li>
        <li>
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'products-list',
                query: { isSale: true },
              });
              isLeftMenu = false;
            "
          >
            СКИДКИ
          </el-button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    querySearch: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLeftMenu: false,
      isSearch: false,
      search: '',
    };
  },
  watch: {
    search(val) {
      this.$emit('onSearch', val);
    },
  },

  methods: {
    imgUrl(url) {
      return url ? url : '/img/no_image.png';
    },
    onInput() {
      this.isSearch = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 100);
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

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  min-height: 50px;
  justify-content: space-around;
  z-index: 2;
  position: relative;
  transition: 0.2s all;

  & img {
    object-fit: cover;
    object-position: center;
    image-rendering: auto;
  }
  nav {
    & a {
      font-size: 14px;
    }
  }
}
.header-elements {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}
.left-menu {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50px;
  left: 0;
  background-color: #fff;
  z-index: 2;
}
.btnMenu {
  display: flex;
  position: relative;
  // position: absolute;
  // top: 5px;
  // left: 20px;
  z-index: 50;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  box-sizing: border-box;
  & span {
    height: 2px;
    width: 20px;
    transform: scale(1);
    background-color: #eee;
    border-radius: 10px;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 20px;
    background-color: #eee;
    transition: all 0.3s ease 0s;
    border-radius: 10px;
  }

  &::before {
    top: 14px;
  }

  &::after {
    bottom: 14px;
  }

  &.active span {
    transform: scale(0);
  }

  &.active::before {
    width: 15px;
    top: 50%;
    transform: rotate(-45deg) translate(0, 0%);
  }

  &.active::after {
    width: 15px;
    top: 50%;
    transform: rotate(45deg) translate(0, 0%);
  }
}

::v-deep {
  .search-input-wrapper {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    z-index: 5;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    & .el-input {
      border: none;
    }
  }
  .el-input__wrapper {
    box-shadow: none !important;
    border-bottom: 1px solid #eee;
  }
  .el-input__inner {
    padding: 22px 8px;
  }
}

/* Анимация */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%); /* Скрыт сверху */
  opacity: 0; /* Прозрачный */
  box-shadow: none;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0); /* Появляется на месте */
  opacity: 1; /* Видимый */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active на Vue 2 */ {
  opacity: 0;
}
</style>

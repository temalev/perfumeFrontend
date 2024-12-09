<template>
  <div>
    <desktop
      class="desktop"
      :user="user"
      :ordersSlugs="ordersSlugs"
      :querySearch="querySearch"
      @openCatalog="
        isCatalog = true;
        isBrandsModal = false;
      "
      @open-shop-bag="$emit('openShopBag')"
      @openBrands="
        isBrandsModal = true;
        isCatalog = false;
      "
      @closeModal="
        isBrandsModal = false;
        isCatalog = false;
      "
      @login="$emit('login')"
      @onSearch="val => getProducts(val)"
    />
    <mobile
      :querySearch="querySearch"
      @onSearch="val => getProducts(val)"
      @openCatalog="
        isCatalog = true;
        isBrandsModal = false;
      "
      @openBrands="
        isBrandsModal = true;
        isCatalog = false;
      "
      @closeModal="
        isBrandsModal = false;
        isCatalog = false;
      "
      class="mobile"
    />

    <brands-modal
      v-if="isBrandsModal"
      :data="brands"
      @close="isBrandsModal = false"
    />
    <cascader :data="category" v-if="isCatalog" @close="isCatalog = false" />
    <search-modal v-if="isSearchModal" />
  </div>
</template>

<script>
import Drawer from '../ui/Drawer.vue';
import BrandsModal from '../ui/BrandsModal.vue';
import Cascader from '../ui/Cascader/Cascader.vue';

import desktop from './desktop.vue';
import mobile from './mobile.vue';
import { getCategory, getBrands, getProducts } from '@/api/productApi.js';
import SearchModal from '../ui/SearchModal.vue';

export default {
  components: {
    desktop,
    mobile,
    Drawer,
    BrandsModal,
    Cascader,
    SearchModal,
  },
  data() {
    return {
      isLeftMenu: false,
      isBrandsModal: false,
      isCatalog: false,
      isSearchModal: false,

      brands: [],
      category: [],
      user: useState('user'),
      ordersSlugs: useState('ordersSlugs'),
      querySearch: [],
    };
  },

  mounted() {
    this.getCategory();
    this.getBrands();
    setTimeout(() => {
      console.log(this.ordersSlugs);
    }, 10);
  },
  watch: {
    '$route.name'(val) {
      this.isBrandsModal = false;
      this.isCatalog = false;
    },
  },
  methods: {
    async getProducts(val) {
      const params = {
        q: val,
      };
      try {
        const res = await getProducts(params);
        this.querySearch = res;
      } catch (e) {
        console.error(e);
      }
    },
    async getCategory() {
      try {
        const res = await getCategory();
        this.category = res;
        this.category.unshift({
          id: 0,
          name: 'Все товары',
          slug: '',
          parentId: null,
        });
        this.category.push({
          id: 999,
          name: 'Отливанты',
          slug: '',
          parentId: null,
        });
      } catch (e) {
        console.error(e);
      }
    },
    async getBrands() {
      try {
        const res = await getBrands();
        this.brands = this.groupBrandsByFirstLetter(res);
      } catch (e) {
        console.error(e);
      }
    },
    groupBrandsByFirstLetter(brands) {
      const grouped = {};

      brands.forEach(brand => {
        const firstLetter = brand.trim()[0].toUpperCase();

        if (!grouped[firstLetter]) {
          grouped[firstLetter] = {
            title: firstLetter,
            brands: [],
          };
        }

        grouped[firstLetter].brands.push(brand);
      });

      // Преобразуем объект в массив объектов
      const result = Object.values(grouped);

      // Сортируем бренды внутри каждой группы по алфавиту
      result.forEach(group => {
        group.brands.sort((a, b) => a.localeCompare(b));
      });

      // Сортируем сами группы по первой букве (title)
      result.sort((a, b) => a.title.localeCompare(b.title));

      return result;
    },
  },
};
</script>

<style scoped lang="scss">
@media (min-width: 800px) {
  .desktop {
    display: flex;
  }
  .mobile {
    display: none;
  }
  .left-menu {
    display: none;
  }
}

@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .left-menu {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.43);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 2;
  }
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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

.icons {
  & li {
    display: flex;
    align-items: center;
  }
}
</style>

<template>
  <drawer
    @close="$emit('close')"
    :positioning="step === 'makingAnOrder' ? 'center' : 'left'"
  >
    <div v-if="step === 'orderFormation'" class="shop-bag">
      <h1>Корзина</h1>
      <div class="shop-bag-main">
        <div v-loading="getProductProcess" class="order-list">
          <product-card-mini
            v-for="order in orders"
            :key="order.id"
            :product="order"
            @drop="dropItem"
          />
        </div>
        <UiTheButton class="w100" @click="step = 'makingAnOrder'">
          Оформить заказ
        </UiTheButton>
      </div>
    </div>
    <div v-if="step === 'makingAnOrder'" class="shop-bag">
      <h1>Оформление заказа</h1>
      <div class="shop-bag-main">
        <div v-loading="getProductProcess" class="order-list">
          <product-card-mini
            v-for="order in orders"
            :key="order.id"
            :product="order"
            @drop="dropItem"
          />
        </div>
        <form @submit="createOrder">
          <div class="form-data">
            <UiTheInput label="ФИО" v-model="form.name" />
            <UiTheInput label="Email" type="email" v-model="form.email" />
            <UiTheInputPhone label="Телефон" v-model="form.phone" />
            <div class="d-flex-column">
              <label style="font-weight: bold">Способ доставки</label>
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                  title="Доставка по России транспортной компанией CDEK"
                  name="1"
                >
                  <UiTheSelect
                    label="Регион"
                    :options="regions"
                    @change="onChangeRegion"
                  />
                  <UiTheSelect
                    label="Пункт выдачи"
                    :options="points"
                    @change="onChangeRegion"
                  />
                </el-collapse-item>
                <el-collapse-item
                  title="Доставка по Москве в пределах МКАД курьером"
                  name="2"
                >
                  <label>Адрес</label>
                  <el-input
                    v-model="form.address"
                    style="100%"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder=""
                  />
                </el-collapse-item>
                <el-collapse-item
                  title="Доставка по Москве за пределы МКАД курьером"
                  name="3"
                >
                  <label>Адрес</label>
                  <el-input
                    v-model="form.address"
                    style="100%"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder=""
                  />
                </el-collapse-item>
                <el-collapse-item
                  title="Доставка по Рязани в пределах города, Яндекс.Go"
                  name="4"
                >
                  <label>Адрес</label>
                  <el-input
                    v-model="form.address"
                    style="100%"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder=""
                  />
                </el-collapse-item>
              </el-collapse>
            </div>

            <!-- <UiTheInput label="Email" /> -->
          </div>

          <UiTheButton class="w100" type="submit"> Оформить заказ </UiTheButton>
        </form>
      </div>
    </div>
  </drawer>
</template>

<script>
import ProductCardMini from './ProductCardMini.vue';
import Drawer from './ui/Drawer.vue';

import {
  getProduct,
  createOrder,
  getRegions,
  getSdekPoints,
} from '@/api/productApi.js';

export default {
  components: { Drawer, ProductCardMini },
  data() {
    return {
      ordersSlugs: useState('ordersSlugs'),
      orders: [],
      getProductProcess: false,
      step: 'orderFormation',
      form: this.getForm(),
      regions: [],
      points: [],
      deliveryTypes: [
        {
          id: 1,
          label: 'Доставка по России транспортной компанией CDEK',
        },
        {
          id: 2,
          label: 'Доставка по Москве в пределах МКАД курьером',
        },
        {
          id: 3,
          label: 'Доставка по Москве за пределы МКАД курьером',
        },
        {
          id: 4,
          label: 'Доставка по Рязани в пределах города, Яндекс.Go',
        },
      ],
      activeName: '',
    };
  },
  mounted() {
    this.ordersSlugs?.forEach(slug => {
      this.getProduct(slug);
    });
  },
  watch: {
    step(val) {
      if (val === 'makingAnOrder') {
        this.getRegions();
      }
    },
  },
  methods: {
    getForm() {
      return {
        email: '',
        name: '',
        phone: '',
        address: '',
      };
    },
    dropItem(id) {
      this.orders = this.orders.filter(item => item.id !== id);
      this.ordersSlugs = this.orders.map(el => el.slug);
      window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
    },
    onChangeRegion(val) {
      this.getSdekPoints(val.id);
    },
    async getProduct(slug) {
      this.getProductProcess = true;
      try {
        const res = await getProduct(slug);
        const existingProduct = this.orders.find(order => order.slug === slug);

        if (existingProduct) {
          existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
          this.orders.push({ ...res, count: 1 });
        }
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
    async createOrder(event) {
      event.preventDefault();

      const data = {
        origin: 'https://dev.parfburo.com',
        comment: 'Hello world',
        recepient: {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          deliveryTypeId: 1,
          deliveryMessage: 'Принесите мне в кровать',
          address: this.form.address,
          deliveryPoint: 'SDK1',
        },
        items: [
          {
            productId: 9,
            count: 1,
          },
        ],
      };
      try {
        const res = await createOrder(data);
        window.open(res.paymentUrl);
        paymentUrl;
      } catch (e) {
        console.error(e);
      }
    },
    async getRegions() {
      try {
        const res = await getRegions();
        this.regions = res.map(el => {
          return {
            id: el.id,
            name: el.region,
          };
        });
      } catch (e) {
        console.error(e);
      }
    },
    async getSdekPoints(regionId) {
      try {
        const res = await getSdekPoints({ regionId: regionId });
        this.points = res;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.shop-bag {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 50px);
}
.shop-bag-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: scroll;
}
.order-list {
  border: 1px solid $border-color;
  min-height: 125px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}

form {
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-data {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

::v-deep {
  .el-collapse-item__wrap {
    overflow: visible;
  }
}
</style>

<template>
  <drawer
    @close="$emit('close')"
    :positioning="step === 'makingAnOrder' ? 'center' : 'left'"
  >
    <div v-if="step === 'orderFormation'" class="shop-bag">
      <h1>Корзина</h1>
      <div v-if="orders.length" class="shop-bag-main">
        <div v-loading="getProductProcess" class="order-list">
          <product-card-mini
            v-for="order in orders"
            :key="order.id"
            :product="order"
            @drop="dropItem"
          />
        </div>
        <div class="d-flex-column">
          <div class="d-flex-column gap-4 mb-6">
            <h2>Сумма заказа</h2>
            <UiInfoBlock
              label="Стоимость продуктов"
              :value="`${new Intl.NumberFormat('ru').format(fullPrice)} ₽`"
            />
            <UiInfoBlock label="Скидка" :value="-`${discount}`" />
            <UiInfoBlock
              :isFilled="false"
              label="Итого"
              :value="`${new Intl.NumberFormat('ru').format(totalPrice)} ₽`"
            />
          </div>
          <UiTheButton
            class="w100"
            @click="user ? (step = 'makingAnOrder') : $emit('login')"
          >
            Оформить заказ
          </UiTheButton>
        </div>
      </div>
      <el-empty v-else description="Здесь пока пусто..." />
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
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          label-width="auto"
          @submit.prevent
        >
          <el-form-item
            label="ФИО"
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            required
            label="Email"
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            prop="email"
          >
            <el-input v-model="form.email" placeholder="ivanov@email.ru" />
          </el-form-item>
          <el-form-item
            required
            label="Телефон"
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            prop="phone"
          >
            <el-input v-mask="'(###) ###-##-##'" v-model="form.phone">
              <template #prefix> <div class="mr-1">+7</div> </template>
            </el-input>
          </el-form-item>
          <el-form-item required label="Способ доставки">
            <el-collapse
              v-model="form.deliveryTypeId"
              accordion
              style="width: 100%"
            >
              <el-collapse-item title="" name="1">
                <template #title>
                  <Transition name="icon-fade">
                    <Icon
                      v-if="form.deliveryTypeId === '1'"
                      name="material-symbols:check-circle-rounded"
                      style="font-size: 20px; color: green"
                      class="mr-2"
                    />
                  </Transition>
                  Доставка по России транспортной компанией CDEK
                </template>
                <el-form
                  v-if="form.deliveryTypeId === '1'"
                  :model="form"
                  label-position="top"
                  label-width="auto"
                  ref="formSdek"
                >
                  <el-form-item
                    required
                    label="Фамилия"
                    class="mb-5"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="lastName"
                  >
                    <el-input v-model="form.lastName" placeholder="Иванов" />
                  </el-form-item>
                  <el-form-item
                    required
                    label="Имя"
                    class="mb-5"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="firstName"
                  >
                    <el-input v-model="form.firstName" placeholder="Иван" />
                  </el-form-item>
                  <el-form-item
                    label="Отчество"
                    class="mb-5"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="patronymic"
                  >
                    <el-input
                      v-model="form.patronymic"
                      placeholder="Иванович"
                    />
                  </el-form-item>
                  <el-form-item
                    required
                    label="Регион"
                    class="mb-5"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="deliveryPoint"
                  >
                    <UiTheSelect :options="regions" @change="onChangeRegion" />
                  </el-form-item>

                  <el-form-item
                    required
                    label="Пункт выдачи"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="deliveryPoint"
                  >
                    <UiTheSelect
                      :options="points"
                      @change="val => (form.deliveryPoint = val)"
                    />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item title="" name="2">
                <template #title>
                  <Transition name="icon-fade">
                    <Icon
                      v-if="form.deliveryTypeId === '2'"
                      name="material-symbols:check-circle-rounded"
                      style="font-size: 20px; color: green"
                      class="mr-2"
                    />
                  </Transition>
                  Доставка по Москве в пределах МКАД курьером
                </template>
                <el-form
                  v-if="form.deliveryTypeId === '2'"
                  :model="form"
                  label-position="top"
                  label-width="auto"
                  ref="formMskMkad"
                >
                  <el-form-item
                    label="Город"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="city"
                  >
                    <el-input v-model="form.city" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Улица"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="street"
                    class="mt-5"
                  >
                    <el-input v-model="form.street" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Дом"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="houseNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.houseNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Квартира"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="apartmentNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.apartmentNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Этаж" prop="floor" class="mt-5">
                    <el-input v-model="form.floor" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Подъезд" prop="entrance" class="mt-5">
                    <el-input v-model="form.entrance" placeholder="" />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item title="" name="3">
                <template #title>
                  <Transition name="icon-fade">
                    <Icon
                      v-if="form.deliveryTypeId === '3'"
                      name="material-symbols:check-circle-rounded"
                      style="font-size: 20px; color: green"
                      class="mr-2"
                    />
                  </Transition>
                  Доставка по Москве за пределы МКАД курьером
                </template>
                <el-form
                  v-if="form.deliveryTypeId === '3'"
                  :model="form"
                  label-position="top"
                  label-width="auto"
                  ref="formMskBehindMkad"
                >
                  <el-form-item
                    label="Город"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="city"
                  >
                    <el-input v-model="form.city" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Улица"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="street"
                    class="mt-5"
                  >
                    <el-input v-model="form.street" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Дом"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="houseNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.houseNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Квартира"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="apartmentNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.apartmentNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Этаж" prop="floor" class="mt-5">
                    <el-input v-model="form.floor" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Подъезд" prop="entrance" class="mt-5">
                    <el-input v-model="form.entrance" placeholder="" />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item title="" name="4">
                <template #title>
                  <Transition name="icon-fade">
                    <Icon
                      v-if="form.deliveryTypeId === '4'"
                      name="material-symbols:check-circle-rounded"
                      style="font-size: 20px; color: green"
                      class="mr-2"
                    />
                  </Transition>
                  Доставка по Рязани в пределах города, Яндекс.Go
                </template>
                <el-form
                  v-if="form.deliveryTypeId === '4'"
                  :model="form"
                  label-position="top"
                  label-width="auto"
                  ref="formRyazan"
                >
                  <el-form-item
                    label="Город"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="city"
                  >
                    <el-input v-model="form.city" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Улица"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="street"
                    class="mt-5"
                  >
                    <el-input v-model="form.street" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Дом"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="houseNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.houseNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item
                    label="Квартира"
                    :rules="[
                      {
                        required: true,
                        message: 'Поле обязательно для заполнения',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                    prop="apartmentNumber"
                    class="mt-5"
                  >
                    <el-input v-model="form.apartmentNumber" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Этаж" prop="floor" class="mt-5">
                    <el-input v-model="form.floor" placeholder="" />
                  </el-form-item>
                  <el-form-item label="Подъезд" prop="entrance" class="mt-5">
                    <el-input v-model="form.entrance" placeholder="" />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item
            label="Комментарий к заказу"
            class="mb-5"
            prop="deliveryMessage"
          >
            <el-input v-model="form.deliveryMessage" placeholder="" />
          </el-form-item>
          <el-form-item>
            <UiTheButton class="w100" @click.prevent="validateForm">
              Оформить заказ
            </UiTheButton>
          </el-form-item>
        </el-form>
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
  createOrderPublic,
  getRegions,
  getSdekPoints,
} from '@/api/productApi.js';

export default {
  components: { Drawer, ProductCardMini },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ordersSlugs: useState('ordersSlugs'),
      orders: [],
      getProductProcess: false,
      step: 'orderFormation',
      form: this.getForm(),
      regions: [],
      points: [],
      activeName: '',
      fullPrice: 0,
      discount: 0,
      totalPrice: 0,
      regionsLoading: false,
      errors: {},
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
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        deliveryTypeId: null,
        deliveryPoint: null,
        deliveryMessage: '',
        city: '',
        street: '',
        houseNumber: null,
        apartmentNumber: null,
        floor: null,
        entrance: null,
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

        if (!res) {
        }
        const existingProduct = this.orders.find(order => order.slug === slug);

        if (existingProduct) {
          existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
          this.orders.push({ ...res, count: 1 });
        }
        this.orders.forEach(el => {
          this.fullPrice += el.price;
          this.discount += el.discount;
        });
        this.totalPrice = this.fullPrice - this.discount;
      } catch (e) {
        console.error(e);
        console.log('res');
      }
      this.getProductProcess = false;
    },
    validateForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(true);
        } else {
          // Валидация не прошла
          console.log('Ошибка валидации');
        }
      });

      if (this.form.deliveryTypeId === '1') {
        this.$refs.formSdek.validate(valid => {
          if (valid) {
            this.createOrder();
          } else {
            // Валидация не прошла
            console.log('Ошибка валидации');
          }
        });
      }
      if (this.form.deliveryTypeId === '2') {
        this.$refs.formMskMkad.validate(valid => {
          if (valid) {
            this.createOrder();
          } else {
            // Валидация не прошла
            console.log('Ошибка валидации');
          }
        });
      }
      if (this.form.deliveryTypeId === '3') {
        this.$refs.formMskBehindMkad.validate(valid => {
          if (valid) {
            this.createOrder();
          } else {
            // Валидация не прошла
            console.log('Ошибка валидации');
          }
        });
      }
      if (this.form.deliveryTypeId === '4') {
        this.$refs.formRyazan.validate(valid => {
          if (valid) {
            this.createOrder();
          } else {
            // Валидация не прошла
            console.log('Ошибка валидации');
          }
        });
      }
    },
    async createOrder() {
      const data = {
        origin: 'https://dev.parfburo.com',
        comment: 'Hello world',
        recepient: {
          name:
            this.form.deliveryTypeId === '1'
              ? [this.form.lastName, this.form.firstName, this.form.patronymic]
                  .filter(Boolean)
                  .join(' ')
              : this.form.name,
          email: this.form.email,
          phone: `7${this.form.phone.replace(/\D/g, '')}`,
          deliveryTypeId: this.form.deliveryTypeId,
          deliveryMessage: this.form.deliveryMessage,
          address:
            this.form.deliveryTypeId !== '1'
              ? [
                  `Город ${this.form.city}`,
                  `Улица ${this.form.street}`,
                  `Номер дома ${this.form.houseNumber}`,
                  `Подъезд ${this.form.entrance}`,
                  `Этаж ${this.form.floor}`,
                  `Номер квартиры ${this.form.apartmentNumber}`,
                ]
                  .filter(Boolean)
                  .join(' ')
              : this.form.address,
          deliveryPoint: this.form.deliveryPoint?.code,
        },
        items: this.orders.map(el => {
          return {
            productId: el.id,
            count: el.count,
          };
        }),
      };
      const req = this.user ? createOrder : createOrderPublic;
      try {
        const res = await req(data);
        window.open(res.paymentUrl);
        paymentUrl;
      } catch (e) {
        console.error(e);
      }
    },
    async getRegions() {
      this.regionsLoading = true;
      try {
        const res = await getRegions();
        this.regions = res.map(el => {
          return {
            id: el.id,
            name: el.region,
          };
        });
        this.regions = this.regions?.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } catch (e) {
        console.error(e);
      }
      this.regionsLoading = false;
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
}

.form-data {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

::v-deep {
  .el-collapse-item__wrap {
    overflow: visible;
  }
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

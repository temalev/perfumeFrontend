<template>
  <el-card style="width: 600px">
    <template #header>
      <div class="card-header">
        <b>Заказ №{{ order?.id }}</b>
      </div>
    </template>
    <div class="d-flex-column gap-2">
      <span>Данные покупателя</span>
      <info-block label="ФИО" :value="order.recipient.name" />
      <info-block label="Адрес" :value="order.recipient.address" />
      <info-block
        label="Комментарий к доставке"
        :value="order.recipient.deliveryMessage"
      />
    </div>
    <div class="d-flex-column gap-2 mt-4">
      <span>Содержимое заказа</span>
      <el-table :data="order.items" style="width: 100%">
        <el-table-column prop="count" label="Количество" width="180" />
        <el-table-column prop="name" label="Название" width="180" />
        <el-table-column prop="article" label="Артикул" />
      </el-table>
    </div>
    <el-steps class="mt-12" :active="order.statusId">
      <el-step v-for="status in STATUSES" :key="status.value" title="">
        <template #icon>
          <el-tooltip :content="status.value" placement="top">
            <Icon :name="status.icon" style="font-size: 20px" /> </el-tooltip
        ></template>
      </el-step>
    </el-steps>
    <template #footer> {{ order.totalAmount }} ₽ </template>
  </el-card>
</template>

<script>
import InfoBlock from './ui/InfoBlock.vue';

export default {
  components: { InfoBlock },
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      STATUSES: [
        { value: 'СОЗДАН', icon: 'mdi:file-document-outline' }, // Значок документа для созданного статуса
        { value: 'ОПЛАЧЕНО', icon: 'mdi:credit-card-check-outline' }, // Значок оплаты
        { value: 'ОДОБРЕНО', icon: 'mdi:check-circle-outline' }, // Значок подтверждения
        { value: 'ОЖИДАЕТ ДОСТАВКИ', icon: 'mdi:truck-outline' }, // Значок ожидания доставки
        { value: 'В ДОСТАВКЕ', icon: 'mdi:truck-fast-outline' }, // Значок доставки
        { value: 'ОЖИДАЕТ ПОЛУЧЕНИЯ', icon: 'mdi:package-variant-closed' }, // Значок получения посылки
        { value: 'ЗАВЕРШЕНО', icon: 'mdi:check-bold' }, // Значок завершения
        { value: 'ОТМЕНЕНО', icon: 'mdi:cancel' }, // Значок отмены
        { value: 'ОШИБКА', icon: 'mdi:alert-outline' },
      ],
      approveLoading: false,
    };
  },
  methods: {
    async approveOrder(id) {
      this.approveLoading = true;
      try {
        const res = await approveOrder(id);
        this.$emit('updateList');
      } catch (e) {
        console.error(e);
      }
      this.approveLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.recipient {
  display: flex;
  flex-direction: column;
}

::v-deep {
  .el-step__title {
    font-size: 13px;
  }
}
</style>

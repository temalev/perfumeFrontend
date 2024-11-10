<template>
  <div class="card">
    <img :src="imgUrl(product?.previewImage)" :alt="product?.name" />

    <div class="main-info d-flex-row j-sb align-flex-start">
      <div class="info h100">
        <div class="info-name d-flex-column align-flex-start">
          <span class="name">{{ `${product?.brand} ${product?.name}` }}</span>
          <span class="category">{{ product?.type }}</span>
        </div>
        <div class="info-price mt-2">
          <div class="d-flex gap-2">
            <span class="params">{{ product?.capacity }} мл.</span>
            <span class="params">{{ product.count }} шт.</span>
          </div>
          <span class="new-price"
            >{{ new Intl.NumberFormat('ru').format(product?.price) }} ₽
          </span>
        </div>
      </div>

      <div class="btn-pay d-flex">
        <button @click="$emit('drop', product.id)" class="ico-btn d-flex j-c">
          <span style="font-size: 20px">✕</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    imgUrl(url) {
      return url ? url : '/img/no_image.png';
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  display: flex;
  align-items: center;
  min-height: 100px;
  padding: 0 10px;
}

img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  top: 200px;
  left: 76px;
  background-color: #ffffff;
  flex-shrink: 0;
  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
}
.product-price {
  margin-bottom: 1rem;
}
.old-price {
  text-decoration: line-through;
  color: #999;
  font-family: Anselm Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.43px;
  text-align: center;
}
.new-price {
  font-size: 18px;
  text-wrap: nowrap;
  @media (max-width: 400px) {
    font-size: 16px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.info-name {
  gap: 4px;
}
.category {
  color: #999;
  font-family: Anselm Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 14.15px;
  text-align: left;
}
.name {
  font-family: Anselm Sans;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
}

.params {
  font-family: Anselm Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 14.15px;
  text-align: left;
}

.info-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-pay {
  gap: 1rem;
}

.main-info {
  flex-grow: 1;
}
</style>

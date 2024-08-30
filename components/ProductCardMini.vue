<template>
  <div class="card d-flex-row">
    <div class="img d-flex">
      <img :src="imgUrl(product?.images[0])" :alt="product?.name" />
    </div>

    <div class="main-info d-flex-row j-sb align-flex-start">
      <div class="info d-flex-column j-sb">
        <div class="info-name d-flex-column align-flex-start">
          <span class="name">{{ product?.name }}</span>
          <span class="category">{{ product?.type }}</span>
        </div>
        <div class="pay d-flex-row j-sb">
          <div class="info-price d-flex align-flex-end">
            <span class="new-price">{{ product?.capacity }} мл.</span>
            <span class="new-price">{{ product.count }} шт.</span>
          </div>
        </div>
      </div>

      <div class="btn-pay d-flex">
        <span class="new-price">{{ product?.price }} ₽ </span>
        <button class="ico-btn d-flex j-c">
          <Icon
            name="material-symbols-light:close"
            style="font-size: 20px"
            @click="$emit('drop', product.id)"
          />
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

<style scoped>
.card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
}

img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  top: 200px;
  left: 76px;
  background-color: #ffffff;
  flex-shrink: 0;
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
  font-family: Anselm Sans;
  font-size: 12px;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 14.15px;
  text-align: left;
}
.name {
  font-family: Anselm Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
}
.info {
  padding: 0.8rem;
}

.info-price {
  gap: 10px;
}

.btn-pay {
  padding: 1rem;
  gap: 1rem;
}

.main-info {
  flex-grow: 1;
}
</style>

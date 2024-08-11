<template>
  <div class="card d-flex-column">
    <div class="img d-flex j-c">
      <img :src="image(imageUrl)" :alt="data.name" />
    </div>

    <div class="info">
      <div class="info-name d-flex-column align-flex-start">
        <span class="category">{{ data.category }}</span>
        <span class="name">{{ data.name }}</span>
      </div>

      <div class="pay d-flex-row j-sb">
        <div class="info-price d-flex align-flex-end">
          <span class="new-price">{{ data.price }}</span>
          <span v-if="data.oldPrice" class="old-price">{{
            data.oldPrice
          }}</span>
        </div>

        <div class="btn-pay">
          <button class="add-to-cart d-flex align-center j-c">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    image(url) {
      return url ? `src/assets/${url}` : '/img/no_image.png';
    },
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  box-shadow: 0px 0px 20px 2px rgba(108, 108, 108, 0.309);
}

img {
  width: 300px;
  height: 250px;
  top: 200px;
  left: 76px;
  background-color: #999;
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
  font-size: 11px;
  font-weight: 400;
  line-height: 14.15px;
  text-align: center;
}
.name {
  font-family: Anselm Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
}
.info {
  padding: 1rem;
}

.info-price {
  gap: 10px;
}
</style>

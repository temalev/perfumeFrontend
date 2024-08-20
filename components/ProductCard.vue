<template>
  <div class="card d-flex-column">
    <div class="img-container d-flex j-c">
      <img :src="image(data.imageUrl)" :alt="data.name" />
      <button class="ico-btn d-flex align-center j-c">
        <Icon name="fa6-regular:heart" style="font-size: 20px" />
      </button>
    </div>

    <div class="info d-flex-column align-flex-start gap-3">
      <span class="category">{{ data.type }}</span>
      <span class="name">{{ data.name }}</span>

      <div class="pay d-flex-row j-sb w100">
        <div class="info-price d-flex align-flex-end">
          <span class="new-price">{{ data.price }}&nbsp;₽</span>
          <span v-if="data.basePrice" class="old-price">
            {{ data.basePrice }}&nbsp;₽
          </span>
        </div>

        <button class="ico-btn d-flex align-center j-c">
          <Icon name="heroicons-solid:plus-sm" style="font-size: 20px" />
          <Icon name="ph:shopping-cart-simple-bold" style="font-size: 20px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  methods: {
    image(url) {
      return url ? `src/assets/${url}` : '/img/no_image.png';
    },
  },
};
</script>

<style scoped lang="scss">
.card {
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
  background-color: #999;
  object-fit: cover;
}

.img-container {
  position: relative;
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
  text-align: center;
}
.info {
  padding: 20px;
}

.info-price {
  gap: 10px;
}
</style>

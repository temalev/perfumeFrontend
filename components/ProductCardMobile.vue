<template>
  <div class="card d-flex-row">
    <div class="img d-flex">
      <img :src="`src/assets/${imageUrl}`" :alt="product.name">
    </div>
    
    <div class="main-info d-flex-row j-sb">
      <div class="info d-flex-column j-sb">

        <div class="info-name d-flex-column align-flex-start">
          <span class="name">{{ product.name }}</span>
          <span class="category">{{ product.category }}</span>
        </div>
        <div class="pay d-flex-row j-sb">
          <div class="info-price d-flex align-flex-end ">
            <span class="new-price">{{ product.price }}</span>
            <span class="old-price" v-if="product.oldPrice">{{ product.oldPrice }}</span>
          </div>
        </div>
        
      </div>

      <div class="btn-pay d-flex-column">
        <button class="add-to-cart d-flex align-center j-c">
          ♡
        </button>
        <button class="add-to-cart d-flex align-center j-c">
        +
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import '../global.css';

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
}

img {
  width: 100%;
  height: 100%;
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

.info-price{
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
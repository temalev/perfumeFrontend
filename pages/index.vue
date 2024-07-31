<template>
	<div>
		<Header />
		<ProductCard 
        v-for="product in products"
        :key="product.id" 
        :product="product"
      />
	</div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          imageUrl: '123.png', 
          category: 'ПАРФЮМЕРНЫЙ ЭКСТРАКТ',
          name: 'Clove Tonka',
          oldPrice: '2500₽',
          price: '1990₽'
        }
      ]
    };
  }
};
</script>

<style>

</style>

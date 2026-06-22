<template>
  <footer class="site-footer">
    <div class="foot-top">
      <div class="foot-brand">
        <div class="foot-logo">ПарфБюро</div>
        <p class="foot-about">
          Оригинальная парфюмерия мировых брендов. Более 20 000 ароматов
          в наличии и под заказ — найдём любой, даже снятый с производства.
        </p>
        <div class="foot-pay">
          <span class="pay-chip">Карта онлайн</span>
          <span class="pay-chip">СБП</span>
          <span class="pay-chip">При получении</span>
        </div>
      </div>

      <div class="foot-col">
        <h4>Каталог</h4>
        <a class="pointer" @click="$router.push('/products/list')">Парфюмерия</a>
        <a class="pointer" @click="$router.push({ name: 'decantInfo' })">Отливанты 10 мл</a>
        <a
          class="pointer"
          @click="$router.push({ name: 'products-list', query: { isSale: true } })"
        >
          Скидки
        </a>
      </div>

      <div class="foot-col">
        <h4>Покупателю</h4>
        <a class="pointer" @click="$emit('onInfoModal', 'about')">О нас</a>
        <a class="pointer" @click="$emit('onInfoModal', 'delivery')">Доставка и оплата</a>
        <a class="pointer" @click="$emit('onInfoModal', 'noBrands')">Не нашли нужного аромата?</a>
        <a class="pointer" @click="$router.push({ name: 'privacy' })">Политика конфиденциальности</a>
        <a class="pointer" @click="$router.push({ name: 'offer' })">Договор оферты</a>
      </div>

      <div class="foot-col">
        <h4>Связь</h4>
        <a class="foot-contact" href="tel:+79156022896">+7 (915) 602-28-96</a>
        <div class="foot-contact-sub">Пн–Вс, 10:00–21:00 МСК</div>
        <a class="foot-contact" href="https://t.me/parfburoo">Telegram @parfburoo</a>
        <a class="foot-contact" href="https://wa.me/79156022896">WhatsApp</a>
        <a class="foot-contact" href="mailto:info@parfburo.com">info@parfburo.com</a>
      </div>
    </div>

    <div class="foot-legal">
      ИП Дёмин Михаил Михайлович · ИНН 621504323474 · ОГРНИП 321623400003805<br />
      © {{ year }} ПарфБюро. Доставка по всей России (расчёт по тарифу СДЭК
      в корзине); по Москве — на следующий рабочий день.
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
.site-footer {
  background: var(--ink);
  color: rgba(255, 255, 255, 0.6);
  padding: 40px 40px 24px;

  @media (max-width: 600px) {
    padding: 32px 20px 24px;
  }
}

.foot-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 30px;
  padding-bottom: 26px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.foot-logo {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}

.foot-about {
  font-size: 12px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  max-width: 300px;
}

.foot-pay {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.pay-chip {
  font-size: 10px;
  padding: 5px 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.6);
}

.foot-col {
  h4 {
    font-family: var(--sans);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 14px;
    font-weight: 600;
  }

  a {
    display: block;
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.64);
    margin-bottom: 10px;
    transition: color 0.15s;

    &:hover {
      color: #fff;
    }
  }
}

.foot-contact {
  font-size: 13px;
  color: #fff !important;
  margin-bottom: 5px;
}

.foot-contact-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 14px;
}

.foot-legal {
  padding-top: 20px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.8;
}
</style>

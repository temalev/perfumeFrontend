<template>
  <div class="home">
    <VitePwaManifest />

    <!-- HERO -->
    <section class="hero">
      <picture>
        <source media="(max-width: 500px)" srcset="/img/bg_max-500.webp" type="image/webp" />
        <img
          src="/img/bg.webp"
          alt="Оригинальная парфюмерия мировых брендов в ПарфБюро"
          class="hero-bg"
          width="2133"
          height="1200"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="hero-overlay" aria-hidden="true" />
      <div class="hero-inner">
        <p class="hero-eyebrow">Оригинальная парфюмерия мировых брендов</p>
        <h1 class="hero-title">Аромат, который<br />становится вашим</h1>
        <p class="hero-sub">
          Более 20 000 ароматов в наличии и под заказ. Найдём любой — даже
          снятый с&nbsp;производства. Доставка по всей России; по Москве —
          на&nbsp;следующий рабочий день.
        </p>
        <NuxtLink to="/products/list" class="hero-cta">
          Смотреть каталог →
        </NuxtLink>
        <div class="hero-meta">
          <div class="hm-item"><b>20 000+</b>ароматов</div>
          <div class="hm-item"><b>100%</b>оригинал</div>
          <div class="hm-item"><b>След. день</b>доставка по Москве</div>
        </div>
      </div>
    </section>

    <!-- ХИТЫ -->
    <section v-if="productsHit?.length" class="sec">
      <div class="sec-head">
        <h2 class="sec-title">Хиты</h2>
        <div class="sec-head-right">
          <NuxtLink to="/products/list" class="sec-link">Весь каталог →</NuxtLink>
          <div class="car-nav">
            <button class="car-arrow" aria-label="Назад" @click="scrollCar('hits', -1)">‹</button>
            <button class="car-arrow" aria-label="Вперёд" @click="scrollCar('hits', 1)">›</button>
          </div>
        </div>
      </div>
      <div id="hits" ref="hits" class="slider">
        <product-card
          v-for="product in productsHit"
          :key="product.id"
          :data="product"
        />
      </div>
    </section>

    <!-- КАТАЛОГ -->
    <section class="sec sec--katalog">
      <div class="sec-head">
        <h2 class="sec-title">Каталог</h2>
        <div class="sec-head-right">
          <NuxtLink to="/products/list" class="sec-link">Все 20 000+ ароматов →</NuxtLink>
          <div class="car-nav">
            <button class="car-arrow" aria-label="Назад" @click="scrollCar('catalog', -1)">‹</button>
            <button class="car-arrow" aria-label="Вперёд" @click="scrollCar('catalog', 1)">›</button>
          </div>
        </div>
      </div>
      <div id="catalog" ref="catalog" class="cat-grid">
        <NuxtLink
          v-for="tile in catalogTiles"
          :key="tile.name"
          :to="tile.to"
          class="cat-tile"
        >
          <div>
            <div class="cat-name">{{ tile.name }}</div>
            <div class="cat-count">{{ tile.hint }}</div>
          </div>
          <div class="cat-go">Перейти →</div>
        </NuxtLink>
      </div>
    </section>

    <!-- ОТЛИВАНТЫ -->
    <section class="sec sec--tight">
      <div class="decant">
        <Icon name="ph:drop-bold" class="decant-ico" />
        <div class="decant-txt">
          <div class="decant-t">Отливанты 10 мл — попробуйте перед флаконом</div>
          <div class="decant-x">
            10 мл любого аромата из каталога. Понравится — соберёте полный
            флакон со скидкой 5%.
          </div>
        </div>
        <div class="decant-price">от 650 ₽ <span>/ 10 мл</span></div>
        <NuxtLink to="/decantInfo" class="btn-ink">Выбрать аромат</NuxtLink>
      </div>
    </section>

    <!-- ПОДАРОЧНЫЕ НАБОРЫ -->
    <section class="sec sec--tight">
      <div class="gift">
        <div class="gift-txt">
          <div class="gift-t">Подарочные наборы</div>
          <div class="gift-x">
            Отличный подарок другу, коллеге или близкому: соберём набор
            из ароматов или миниатюр и красиво упакуем.
          </div>
          <span class="gift-badge">−7% при выборе от 3 миниатюр</span>
        </div>
        <NuxtLink to="/products/list" class="btn-ink">Собрать набор</NuxtLink>
      </div>
    </section>

    <!-- ПОЧЕМУ ПАРФБЮРО -->
    <section class="sec sec--tight">
      <div class="why-row">
        <button class="why-card" @click="whyOpen = true">
          <Icon name="ph:shield-check-bold" class="why-ico" />
          <div class="why-t">Только оригинал</div>
          <div class="why-x">Проверенные поставки и чек на каждый заказ.</div>
          <span class="why-more">Почему нам можно верить →</span>
        </button>
        <button class="why-card" @click="whyOpen = true">
          <Icon name="ph:magnifying-glass-bold" class="why-ico" />
          <div class="why-t">Бренды, ушедшие с полок</div>
          <div class="why-x">Louis Vuitton, Hermès, Chanel, Jo Malone, Aesop.</div>
          <span class="why-more">Как мы их возим →</span>
        </button>
        <button class="why-card" @click="whyOpen = true">
          <Icon name="ph:tag-bold" class="why-ico" />
          <div class="why-t">Цены ниже сетей</div>
          <div class="why-x">Онлайн-формат без аренды залов и наценок ТЦ.</div>
          <span class="why-more">Почему дешевле →</span>
        </button>
      </div>
    </section>

    <!-- ОПТ / КОРПОРАТИВ -->
    <section id="corp" class="sec sec--tight">
      <div class="corp">
        <div>
          <div class="corp-eyebrow">Бизнесу</div>
          <h2 class="corp-t">Корпоративные и оптовые заказы</h2>
          <p class="corp-x">
            Подарки сотрудникам и партнёрам, закупка для магазина или салона.
            Специальные цены от объёма и сопровождение менеджера.
          </p>
          <ul class="corp-points">
            <li><Icon name="ph:check-bold" />Индивидуальные цены от объёма</li>
            <li><Icon name="ph:check-bold" />Корпоративные наборы под ваш бренд</li>
            <li><Icon name="ph:check-bold" />Отгрузка с документами для юр. лиц и ИП</li>
          </ul>
        </div>
        <form class="corp-form" @submit.prevent="submitCorp">
          <h4>Оставьте заявку — рассчитаем условия</h4>
          <div class="field">
            <label>Имя или компания</label>
            <input v-model="corp.name" type="text" placeholder="Как к вам обращаться" />
          </div>
          <div class="field">
            <label>Телефон или Telegram</label>
            <input v-model="corp.contact" type="text" placeholder="+7 ___ ___-__-__ или @username" />
          </div>
          <div class="field">
            <label>Тип заказа</label>
            <select v-model="corp.type">
              <option>Корпоративные подарки</option>
              <option>Оптовая закупка</option>
              <option>Закупка для магазина / салона</option>
            </select>
          </div>
          <button class="corp-submit" type="submit" :disabled="corpLoading">
            {{ corpLoading ? 'Отправляем…' : 'Отправить заявку' }}
          </button>
        </form>
      </div>
    </section>

    <!-- НЕ НАШЛИ АРОМАТ -->
    <section id="find" class="sec sec--tight">
      <div class="findmini">
        <div class="findmini-txt">
          <div class="findmini-t">Не нашли нужный аромат?</div>
          <div class="findmini-x">
            Найдём любой — даже снятый с производства. Оставьте заявку.
          </div>
        </div>
        <form class="findmini-form" @submit.prevent="submitFind">
          <input v-model="find.product" type="text" placeholder="Название аромата" />
          <input v-model="find.name" type="text" placeholder="Имя" />
          <input v-model="find.phone" type="tel" placeholder="Телефон" />
          <input v-model="find.telegram" type="text" placeholder="Telegram @username" />
          <button type="submit" :disabled="findLoading">
            {{ findLoading ? 'Отправляем…' : 'Отправить заявку' }}
          </button>
        </form>
      </div>
    </section>

    <!-- ОТЗЫВЫ -->
    <section class="sec sec--tight">
      <div class="sec-head">
        <h2 class="sec-title">Отзывы</h2>
        <div class="sec-head-right">
          <div class="car-nav">
            <button class="car-arrow" aria-label="Назад" @click="scrollCar('reviews', -1)">‹</button>
            <button class="car-arrow" aria-label="Вперёд" @click="scrollCar('reviews', 1)">›</button>
          </div>
        </div>
      </div>
      <div class="rev-head">
        <div class="rev-score">4.9</div>
        <div>
          <div class="rev-stars">★★★★★</div>
          <div class="rev-meta">рейтинг по отзывам на Яндекс.Картах</div>
        </div>
      </div>
      <div id="reviews" ref="reviewsEl" class="rev-carousel">
        <div v-for="(r, i) in reviews" :key="i" class="rev-item">
          <div class="rev-item-stars">★★★★★</div>
          <div class="rev-item-text">{{ r.text }}</div>
          <div class="rev-item-author">{{ r.author }}</div>
          <div class="rev-item-src">Яндекс.Карты</div>
        </div>
      </div>
    </section>

    <!-- MODAL «Почему ПарфБюро» -->
    <UiModal v-if="whyOpen" header="Почему ПарфБюро" @close="whyOpen = false">
      <div class="why-modal">
        <h3 class="modal-title">Дешевле — не значит «не оригинал»</h3>
        <p class="modal-lead">
          Мы убрали из цены всё лишнее, а не качество. Вот честно, из чего
          складывается наша выгода и почему нам можно доверять.
        </p>
        <div v-for="pt in whyPoints" :key="pt.t" class="modal-pt">
          <Icon :name="pt.ico" class="modal-pt-ico" />
          <div>
            <div class="modal-pt-t">{{ pt.t }}</div>
            <div class="modal-pt-x">{{ pt.x }}</div>
          </div>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getProducts, getCategory, postProductsRequests } from '@/api/productApi.js';
import { slugify } from '~/utils/slugify.js';
import { ElNotification } from 'element-plus';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://parfburo.com/#website',
  url: 'https://parfburo.com',
  name: 'ПарфБюро',
  description: 'Интернет-магазин оригинальной парфюмерии',
  publisher: { '@id': 'https://parfburo.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://parfburo.com/products/list?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'ru-RU',
};

useSiteSeo({
  title: 'ПарфБюро — оригиналы мировых брендов парфюмерии',
  description:
    'Покупайте парфюмерию и профессиональную косметику на официальном сайте «ПарфБюро». Утончённые ароматы для индивидуальности и стиля. Быстрая доставка по Москве и Рязани, СДЭК по всей России.',
  keywords:
    'парфюмерия, духи, элитные ароматы, нишевая парфюмерия, оригинальные духи, купить духи, доставка парфюмерии, Москва, Рязань, интернет-магазин парфюмерии, мужская парфюмерия, женская парфюмерия',
  url: 'https://parfburo.com',
});

injectJsonLd(websiteJsonLd);

const { data: productsHit } = await useAsyncData(
  'home-products-hit',
  () => getProducts({ isHit: true }),
  { default: () => [] },
);

const { data: categories } = await useAsyncData(
  'home-categories',
  () => getCategory(),
  { default: () => [] },
);

// Catalog tiles mirror the design; gendered tiles deep-link to real
// category pages when a matching category exists, the rest open the catalog.
const CATALOG_TILES = [
  { name: 'Мужская', hint: 'Свежие, древесные, кожаные', match: 'мужск' },
  { name: 'Женская', hint: 'Цветочные, шлейфовые, дневные', match: 'женск' },
  { name: 'Унисекс', hint: 'Универсальные композиции', match: 'унисекс' },
  { name: 'Нишевая', hint: 'Селективные и редкие бренды', match: 'ниш' },
  { name: 'Ароматы для дома', hint: 'Диффузоры и свечи', match: 'дом' },
  { name: 'Миниатюры', hint: 'Форматы для пробы и в дорогу', match: 'миниат' },
];

const catalogTiles = computed(() =>
  CATALOG_TILES.map((tile) => {
    const cat = (categories.value || []).find(
      c => c?.name && c.parentId === null && c.name.toLowerCase().includes(tile.match),
    );
    return {
      name: tile.name,
      hint: tile.hint,
      to: cat ? `/category/${slugify(cat.name)}` : '/products/list',
    };
  }),
);

// Carousels
const hits = ref(null);
const catalog = ref(null);
const reviewsEl = ref(null);
const carRefs = { hits, catalog, reviews: reviewsEl };
function scrollCar(id, dir) {
  const el = carRefs[id]?.value;
  if (el) {
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: 'smooth' });
  }
}

// Why modal
const whyOpen = ref(false);
const whyPoints = [
  {
    ico: 'ph:shield-check-bold',
    t: 'Только оригинал',
    x: 'Закупаем у проверенных дистрибьюторов, на каждый заказ — чек. Никакого контрафакта и разливной парфюмерии, в том числе в отливантах.',
  },
  {
    ico: 'ph:magnifying-glass-bold',
    t: 'Бренды, которых нет на полках',
    x: 'Louis Vuitton, Hermès, Chanel, Jo Malone, Aesop и другие ушли из российской розницы. Мы привозим их оригинал по параллельному импорту — он легален в РФ.',
  },
  {
    ico: 'ph:tag-bold',
    t: 'Цены ниже, чем в сетях',
    x: 'Мы работаем только онлайн: не платим за аренду торговых залов и «витрину» в ТЦ. Поставки идут напрямую, а вся экономия уходит в цену.',
  },
  {
    ico: 'ph:arrow-counter-clockwise-bold',
    t: 'Возврат 14 дней',
    x: 'Передумали или аромат не подошёл — вернём деньги без споров и лишней бюрократии.',
  },
  {
    ico: 'ph:chat-circle-bold',
    t: 'Личный подбор',
    x: 'Напишите в Telegram — подберём аромат под ваши предпочтения или повод покупки. Отвечает живой человек, а не бот.',
  },
];

// Forms
const corp = ref({ name: '', contact: '', type: 'Корпоративные подарки' });
const corpLoading = ref(false);
async function submitCorp() {
  if (!corp.value.name || !corp.value.contact) {
    ElNotification({ title: 'Заполните имя и контакт', type: 'warning', position: 'bottom-left' });
    return;
  }
  corpLoading.value = true;
  try {
    await postProductsRequests({
      name: corp.value.name,
      phoneNumber: corp.value.contact,
      communicationTypeId: 1,
      products: `Опт/корпоратив: ${corp.value.type}`,
    });
    ElNotification({ title: 'Заявка отправлена', message: 'Менеджер свяжется с вами', type: 'success', position: 'bottom-left' });
    corp.value = { name: '', contact: '', type: 'Корпоративные подарки' };
  } catch (e) {
    ElNotification({ title: 'Не удалось отправить', type: 'error', position: 'bottom-left' });
  }
  corpLoading.value = false;
}

const find = ref({ product: '', name: '', phone: '', telegram: '' });
const findLoading = ref(false);
async function submitFind() {
  if (!find.value.name || (!find.value.phone && !find.value.telegram)) {
    ElNotification({ title: 'Укажите имя и способ связи', type: 'warning', position: 'bottom-left' });
    return;
  }
  findLoading.value = true;
  try {
    await postProductsRequests({
      name: find.value.name,
      phoneNumber: find.value.phone || find.value.telegram,
      communicationTypeId: find.value.telegram ? 1 : 3,
      products: `Поиск аромата: ${find.value.product}. Telegram: ${find.value.telegram}`,
    });
    ElNotification({ title: 'Заявка отправлена', message: 'Найдём аромат и свяжемся с вами', type: 'success', position: 'bottom-left' });
    find.value = { product: '', name: '', phone: '', telegram: '' };
  } catch (e) {
    ElNotification({ title: 'Не удалось отправить', type: 'error', position: 'bottom-left' });
  }
  findLoading.value = false;
}

const reviews = [
  { text: 'Тот самый аромат, упаковано аккуратно, чек приложили. Заказываю не первый раз.', author: 'Анна К.' },
  { text: 'Брал отливант 10 мл перед флаконом — хватило понять, что мой. Потом взял полный, скидку дали.', author: 'Михаил Д.' },
  { text: 'Нашли редкий аромат, которого нигде не было в продаже. Привезли за неделю.', author: 'Ольга В.' },
  { text: 'Доставили по Москве на следующий день. Цена заметно ниже, чем в сетевых магазинах.', author: 'Сергей П.' },
  { text: 'Помогли подобрать аромат в Telegram под мой запрос. Отвечает живой человек, не бот.', author: 'Ирина С.' },
];
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
}

/* HERO */
.hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: var(--blue-deep);
  border-bottom: 0.5px solid var(--border);

  @media (max-width: 600px) {
    min-height: 400px;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 52, 108, 0.28) 0%,
    rgba(16, 42, 86, 0.82) 100%
  );
}

.hero-inner {
  position: relative;
  padding: 46px 40px;
  color: #fff;
  max-width: 680px;

  @media (max-width: 600px) {
    padding: 36px 24px;
  }
}

.hero-eyebrow {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 16px;
}

.hero-title {
  font-family: var(--serif);
  font-size: 42px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    font-size: 36px;
  }

  @media (max-width: 600px) {
    font-size: 30px;

    br {
      display: none;
    }
  }
}

.hero-sub {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
  max-width: 520px;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: #fff;
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 13px 26px;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
}

.hero-meta {
  display: flex;
  gap: 26px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.hm-item {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.72);

  b {
    font-family: var(--serif);
    display: block;
    font-size: 17px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 2px;
  }
}

/* SECTION SHELL */
.sec {
  padding: 34px 40px;
  width: 100%;

  @media (max-width: 600px) {
    padding: 26px 16px;
  }
}

.sec--tight {
  padding-top: 0;
}

.sec--katalog {
  padding-top: 22px;
}

.sec-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
}

.sec-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.sec-link {
  font-size: 12px;
  color: var(--blue);
  white-space: nowrap;
  font-weight: 500;
}

.sec-head-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.car-nav {
  display: flex;
  gap: 6px;

  @media (max-width: 600px) {
    display: none;
  }
}

.car-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  cursor: pointer;
  font-size: 17px;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--surface2);
  }
}

/* SLIDER */
.slider {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 8px;

  :deep(.card) {
    scroll-snap-align: start;
    flex: 0 0 calc((100% - 42px) / 4);
    width: auto;
  }

  @media (max-width: 900px) {
    :deep(.card) {
      flex: 0 0 calc((100% - 14px) / 2);
    }
  }

  @media (max-width: 600px) {
    :deep(.card) {
      flex: 0 0 70%;
    }
  }
}

/* CATALOG TILES */
.cat-grid {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 6px;
}

.cat-tile {
  flex: 0 0 calc((100% - 42px) / 4);
  scroll-snap-align: start;
  color: var(--ink);
  border-radius: var(--r);
  border: 0.5px solid var(--border);
  background: var(--surface2);
  padding: 24px 22px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: var(--border-strong);
    background: var(--surface3);
  }

  @media (max-width: 900px) {
    flex: 0 0 calc((100% - 14px) / 2);
  }

  @media (max-width: 600px) {
    flex: 0 0 60%;
  }
}

.cat-name {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 600;
}

.cat-count {
  font-size: 11px;
  color: var(--ink-muted);
  margin-top: 4px;
}

.cat-go {
  font-size: 12px;
  color: var(--blue);
  font-weight: 600;
}

/* DECANT */
.decant {
  display: flex;
  align-items: center;
  gap: 22px;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: var(--r);
  padding: 18px 22px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.decant-ico {
  font-size: 22px;
  color: var(--blue);
  flex-shrink: 0;
}

.decant-txt {
  flex: 1;
  min-width: 220px;
}

.decant-t {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
}

.decant-x {
  font-size: 12.5px;
  color: var(--ink-soft);
  line-height: 1.55;
}

.decant-price {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  span {
    font-size: 11px;
    color: var(--ink-muted);
    font-weight: 400;
  }
}

.btn-ink {
  background: var(--ink);
  color: #fff;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  padding: 11px 18px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* GIFT */
.gift {
  display: flex;
  align-items: center;
  gap: 22px;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: var(--r);
  padding: 20px 24px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.gift-txt {
  flex: 1;
  min-width: 240px;
}

.gift-t {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.gift-x {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.gift-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  border-radius: 5px;
  padding: 4px 10px;
  margin-top: 8px;
}

/* WHY */
.why-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.why-card {
  background: var(--blue);
  color: #fff;
  border-radius: var(--r);
  padding: 22px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;

  &:hover {
    background: var(--blue-deep);
  }
}

.why-ico {
  font-size: 24px;
  color: #fff;
}

.why-t {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 600;
}

.why-x {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
}

.why-more {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
  margin-top: auto;
  font-weight: 600;
}

/* CORP */
.corp {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: var(--r);
  padding: 30px 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.corp-eyebrow {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 10px;
}

.corp-t {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 10px;
}

.corp-x {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.7;
  margin-bottom: 16px;
}

.corp-points {
  font-size: 12.5px;
  color: var(--ink-soft);

  li {
    padding: 7px 0;
    border-bottom: 0.5px solid var(--border);
    display: flex;
    gap: 10px;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    :deep(svg) {
      color: var(--blue);
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }
  }
}

.corp-form {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 10px;
  padding: 22px;

  h4 {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 600;
    margin: 0 0 14px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 12px;
  }

  label {
    font-size: 11px;
    color: var(--ink-muted);
  }

  input,
  select {
    background: var(--surface);
    border: 0.5px solid var(--border-strong);
    border-radius: 7px;
    padding: 10px 12px;
    color: var(--ink);
    font-size: 13px;
    font-family: var(--sans);
    outline: none;

    &:focus {
      border-color: var(--blue);
    }
  }
}

.corp-submit {
  width: 100%;
  background: var(--ink);
  color: #fff;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  margin-top: 4px;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}

/* FIND MINI */
.findmini {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: var(--r);
  padding: 16px 22px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.findmini-txt {
  flex: 1;
  min-width: 200px;
}

.findmini-t {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.findmini-x {
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.findmini-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  input {
    background: var(--surface);
    border: 0.5px solid var(--border-strong);
    border-radius: 7px;
    padding: 9px 11px;
    font-size: 12px;
    font-family: var(--sans);
    outline: none;
    width: 200px;
    min-width: 0;

    &:focus {
      border-color: var(--blue);
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }

  button {
    grid-column: 1 / -1;
    background: var(--ink);
    color: #fff;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
    }
  }
}

/* REVIEWS */
.rev-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.rev-score {
  font-family: var(--serif);
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}

.rev-stars {
  color: var(--blue);
  font-size: 15px;
  letter-spacing: 2px;
}

.rev-meta {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 3px;
}

.rev-carousel {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 6px;
}

.rev-item {
  flex: 0 0 320px;
  scroll-snap-align: start;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--r);
  padding: 20px;

  @media (max-width: 600px) {
    flex: 0 0 80%;
  }
}

.rev-item-stars {
  color: var(--blue);
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 9px;
}

.rev-item-text {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.65;
  margin-bottom: 12px;
}

.rev-item-author {
  font-size: 12px;
  font-weight: 600;
}

.rev-item-src {
  font-size: 11px;
  color: var(--ink-muted);
}

/* WHY MODAL */
.why-modal {
  padding: 8px 24px 24px;
  max-width: 620px;
}

.modal-eyebrow {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 10px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
}

.modal-lead {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.7;
  margin-bottom: 18px;
}

.modal-pt {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-top: 0.5px solid var(--border);
}

.modal-pt-ico {
  font-size: 22px;
  color: var(--blue);
  flex-shrink: 0;
  margin-top: 2px;
}

.modal-pt-t {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.modal-pt-x {
  font-size: 12.5px;
  color: var(--ink-soft);
  line-height: 1.65;
}
</style>

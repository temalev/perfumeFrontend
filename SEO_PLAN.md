# SEO-аудит и план работ — parfburo.com

Дата: 2026-05-17
Стек: Nuxt 3 (SSR включён), Element Plus, Vite-PWA.
Источники аудита: [nuxt.config.ts](nuxt.config.ts), [layouts/default.vue](layouts/default.vue), [pages/index.vue](pages/index.vue), [pages/products/list.vue](pages/products/list.vue), [pages/products/[slug].vue](pages/products/[slug].vue), [pages/decantInfo.vue](pages/decantInfo.vue), [pages/offer.vue](pages/offer.vue), [components/ProductCard.vue](components/ProductCard.vue), [public/](public/).

---

## 1. Краткие выводы (TL;DR)

Сайт работает на Nuxt 3 SSR — это хорошая база, но **SEO-обвязка собрана фрагментарно и содержит критические ошибки**, которые мешают индексации и ранжированию:

- Нет `robots.txt` ([public/](public/) пустой). `sitemap.xml` уже генерируется на бэке (`/api/v1/products/sitemap.xml` → nginx проксит на `/sitemap.xml`).
- На главной странице нет `<h1>`; H-структура нарушена (только `<h3>` после закомментированного `<h1>` в [pages/index.vue:24,41,51](pages/index.vue#L24)).
- В карточке товара `description` использует **необработанные шаблоны** `${product?.brand}` вместо `${product.value?.brand}` — в SSR в meta улетают строки `undefined undefined` ([pages/products/[slug].vue:205](pages/products/[slug].vue#L205)).
- На странице каталога нет `<h1>` и тайтл рендерится только при наличии `params.brand` — листинг без бренда отдаёт **дефолтный тайтл из layout** ([pages/products/list.vue:4-7](pages/products/list.vue#L4-L7)).
- Нет structured data (JSON-LD `Product`, `Organization`, `BreadcrumbList`); единственный `itemtype="schema.org/Offer"` сделан некорректно — без обязательных полей `priceCurrency`, `availability` ([pages/products/[slug].vue:24](pages/products/[slug].vue#L24)).
- Canonical на листинге включает все query-параметры (`?brand=...&order=DESC&fromPrice=...`) — рискуем дублями в индексе ([pages/products/list.vue:144](pages/products/list.vue#L144)).
- `<img>` в шапке/футере и хиро без `alt`, без `width/height`, без `loading="lazy"` ([components/Header/desktop.vue:5](components/Header/desktop.vue#L5), [pages/decantInfo.vue:8](pages/decantInfo.vue#L8), [pages/index.vue:6-12](pages/index.vue#L6-L12)).
- `keywords`-мета используется на каждой странице, но **Google и Яндекс этот тег игнорируют** уже более 10 лет — не вредит, но и не помогает; стоит держать только если используется внутренний поиск.
- `og:logo` — нестандартное OpenGraph-свойство, на хеш-имени `_nuxt/logo.3sM_t13Y.webp`, которое **поменяется при следующем билде** → ссылки протухнут ([pages/products/[slug].vue:225](pages/products/[slug].vue#L225)).
- `useHead({ meta: [{ property: 'title' }] })` — `title` это не OG-свойство и не валидный мета-тег, должен быть в `<title>` ([pages/products/list.vue:155](pages/products/list.vue#L155)).

---

## 2. Критические проблемы (приоритет P0 — блокируют индексацию)

### 2.1. Нет `robots.txt` ✅
- [x] Создан [public/robots.txt](public/robots.txt) с `User-agent: *`, запретом служебных `/userCard` и `/reset-password`, и ссылкой на `Sitemap: https://parfburo.com/sitemap.xml`. Дублей листинга через query-параметры закроем через `<meta robots="noindex,follow">` в п.2.6.

### 2.2. Нет `sitemap.xml` ✅
- [x] Уже генерируется на бэке: [server/src/product/product.service.ts:372](server/src/product/product.service.ts#L372), эндпоинт `GET /api/v1/products/sitemap.xml`, nginx проксит на `/sitemap.xml` (см. `default.conf`). Возвращает 200 OK, ~55 КБ XML с продуктами + базовыми страницами, `lastmod` из БД, `priority`/`changefreq` присутствуют.

### 2.3. Сломанная подстановка переменных в meta карточки товара ✅
- [x] Распаковка ref через `const p = product.value` + `descParts = [p.type, p.brand, p.name, p.capacityValue && '${...} мл'].filter(Boolean).join(' ')` — теперь не будет `undefined undefined` в description.
- [x] Дубликат `og:url` убран, оставлен один, `productUrl` вынесен в переменную и переиспользован в canonical.
- [x] `og:logo` (невалидный + хеш-URL `_nuxt/logo.3sM_t13Y.webp`) удалён. `og:image` теперь fallback на стабильный `https://parfburo.com/img/logo.webp`, если у товара нет своих картинок.

### 2.4. Нет `<h1>` на главной
- **Файл**: [pages/index.vue:24](pages/index.vue#L24) — H1 закомментирован, далее идут только `<h3>`.
- **Что сделать**: вернуть один уникальный `<h1>` ("Купить оригинальную парфюмерию в Москве и Рязани — ПарфБюро" или аналог), `<h3>` секций понизить до `<h2>`.

### 2.5. Нет `<h1>` и условный `<title>` на каталоге
- **Файл**: [pages/products/list.vue:4-7](pages/products/list.vue#L4-L7).
- **Сейчас**: `<Title>` рендерится только если есть `params.brand`. Иначе тайтл — дефолтный из layout (одинаковый по всему сайту).
- **Что сделать**:
  - Всегда задавать осмысленный title: "Каталог парфюмерии — ПарфБюро" или с подстановкой бренда/категории.
  - Добавить `<h1>` с тем же смыслом.
  - Сделать дружелюбные URL для каталога по бренду/категории (`/brand/dior`, `/category/woman`) вместо query-параметров — это сильно влияет на ранжирование по бренду.

### 2.6. Canonical с query-параметрами на листинге
- **Файл**: [pages/products/list.vue:144](pages/products/list.vue#L144) — `canonical` = `https://parfburo.com${fullPath}`.
- **Риск**: дубли вида `?orderBy=name&order=DESC&fromPrice=0&toPrice=100000&isSale=false` → Google поднимет одну, остальные пометит как дубли, краулинг-бюджет сгорит.
- **Что сделать**: canonical всегда указывать на чистый URL (`/products/list` или соответствующий бренд/категория URL), фильтры/сортировки не индексировать (`<meta name="robots" content="noindex,follow">` при наличии нестандартных query).

---

## 3. Высокий приоритет (P1 — структура и сниппеты)

### 3.1. Structured data (JSON-LD) ✅

| Где | Что | Статус |
| --- | --- | --- |
| Все страницы ([layouts/default.vue](layouts/default.vue)) | `Organization` + 2× `Store` (Москва, Рязань) в одном `@graph`, телефон, логотип, sameAs (Telegram/WhatsApp) | ✅ |
| Главная ([pages/index.vue](pages/index.vue)) | `WebSite` с `SearchAction` (target → `/products/list?search={search_term_string}`) | ✅ |
| `/products/[slug]` ([pages/products/[slug].vue](pages/products/[slug].vue)) | `Product` с `offers` (priceCurrency=RUB, availability=InStock, sku=article, brand, image, seller→Organization) + `BreadcrumbList` (Главная → Бренд → Товар) | ✅ |
| `/products/list` ([pages/products/list.vue](pages/products/list.vue)) | `BreadcrumbList` + `CollectionPage` с вложенным `ItemList` (до 30 товаров, через `useAsyncData`) | ✅ |
| `aggregateRating` на товаре | пока пропущено — нет API отзывов | ⏳ |

Реализовано через `useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(...) }] })`.

### 3.2. Исправить microdata карточки товара
- **Файл**: [pages/products/[slug].vue:24-71](pages/products/[slug].vue#L24-L71).
- В `Offer` обязательны: `priceCurrency` (`<meta itemprop="priceCurrency" content="RUB">`), `availability` (`https://schema.org/InStock`).
- Корневой тип лучше сделать `Product`, а `Offer` — вложенным.
- `<h1>` сейчас содержит только бренд (кликабельный для перехода к фильтру) ([pages/products/[slug].vue:32-44](pages/products/[slug].vue#L32-L44)) — это **плохой H1**: должен описывать товар целиком. Перевести `<h1>` на полное название (`{brand} {name} {capacity} мл`), бренд оставить как ссылку рядом.

### 3.3. Хлебные крошки
- **Файл**: [pages/products/[slug].vue:282-285](pages/products/[slug].vue#L282-L285).
- Сейчас крошки — только "Главная" → бренд, без категории и без структурированной разметки.
- **Что сделать**:
  - Цепочка: Главная → Категория → Бренд → Товар.
  - Привязать `BreadcrumbList` JSON-LD.
  - Использовать обычные `<a href>`, не SPA-переходы через `router.push` (для краулера и копирования ссылки).

### 3.4. Универсальное генерируемое мета через `useSeoMeta`
- Сейчас в каждой странице руками собирается массив `meta: [...]` — много дублирования и опечаток (`property: 'title'`, `og:logo`).
- **Что сделать**: перейти на `useSeoMeta({ title, description, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, ... })` — Nuxt сам поставит правильные ключи, можно вынести фабрику в `composables/useProductSeo.ts`.

### 3.5. Чистые URL для каталога
- Сейчас: `/products/list?brand=Dior` — слабо ранжируется по бренду.
- **Что сделать**: добавить маршруты:
  - `/brand/[slug]` — лендинг бренда (H1, описание бренда, товары, JSON-LD `Brand`)
  - `/category/[slug]` — категория
  - `/category/[cat]/brand/[brand]` — пересечение
- `/products/list` оставить как fallback с `noindex`.

---

## 4. Средний приоритет (P2 — производительность и UX-сигналы)

### 4.1. Изображения
- В шапке/футере/декантах `alt=""` или отсутствует — задать осмысленный alt ([components/Header/desktop.vue:5](components/Header/desktop.vue#L5), [pages/decantInfo.vue:8](pages/decantInfo.vue#L8)).
- Главная: `<img class="bg-img">` без `src` — `src` задан в SCSS через `content: url(...)` ([pages/index.vue:6-12](pages/index.vue#L6-L12)), краулер этот фон **не видит как контент** и LCP-картинку не приоритезирует. Заменить на `<picture>` с двумя `<source>` (desktop/mobile) + `fetchpriority="high"`.
- Везде задать `width`/`height` (предотвращает CLS).
- Внутри товара/каталога — `loading="lazy"` для off-screen, `fetchpriority="high"` для LCP-картинки.
- Подключить `@nuxt/image` (есть `@nuxt/fonts`, аналогично) — автоматический webp/avif, srcset, lazy.

### 4.2. PWA-манифест
- **Файл**: [nuxt.config.ts:73-80](nuxt.config.ts#L73-L80) — единственная иконка 512×512 в webp; для PWA-аудита нужно минимум 192×192 PNG + maskable иконка.
- Добавить иконки 192/512 PNG + maskable.

### 4.3. Шрифты
- Шрифт `anselmSans` грузится через `@nuxt/fonts` — проверить, что используется `font-display: swap` (предотвращает FOIT).
- Preload основного шрифта в `<head>`.

### 4.4. `lang`-атрибут и hreflang
- `lang="ru"` есть ([nuxt.config.ts:13-15](nuxt.config.ts#L13-L15)) — ок.
- Если в перспективе будет английская версия — заложить `hreflang`.

### 4.5. Core Web Vitals (частично ✅)
- [ ] **Element Plus on-demand** — откатили. `@element-plus/nuxt@1.1.5` использует `import.meta.dev`, который jiti в Nuxt 3.12 не парсит → билд падает. Вариант: обновить Nuxt до 3.14+ (с новым jiti) либо перейти на `unplugin-vue-components` напрямую.
- [x] **`useAsyncData` вместо `mounted()`** — [pages/index.vue](pages/index.vue) переписан на `<script setup>`, `productsHit`/`productsSale`/`media` тянутся на SSR и попадают в HTML до гидрации. В [api/productApi.js](api/productApi.js) `localStorage.getItem('user')` обёрнут в `if (import.meta.client)`, чтобы не падало на сервере.
- [x] **LCP-картинка** — фон главной заменён с `<img>` через `content: url()` в CSS (краулер не видел) на `<picture>` с явным `src`/`srcset` для desktop/mobile + `fetchpriority="high"` + `decoding="async"` + `width`/`height` (CLS-защита). Карточки в скроллерах ниже получили `loading="lazy"`.

---

## 5. Низкий приоритет (P3 — гигиена и контент)

### 5.1. Удалить/переосмыслить
- `meta name="keywords"` — поисковики игнорируют. Если оставляете — не дублируйте бренд во всех страницах: это «keyword stuffing».
- Дубликат `og:url` в [pages/products/[slug].vue:217 и 229](pages/products/[slug].vue#L217).
- `property: 'title'` ([pages/products/list.vue:155](pages/products/list.vue#L155)) — невалидно, удалить.
- `og:logo` ([pages/products/[slug].vue:225](pages/products/[slug].vue#L225)) — заменить на корректный `og:image` с абсолютным URL без билд-хеша.

### 5.2. Контентные страницы
- `/decantInfo` — один экран текста, нет внутренних ссылок на каталог. Добавить:
  - `<h2>` секции (Что такое отливант / Объёмы / Доставка / Как заказать).
  - 3-5 внутренних ссылок (на `/products/list?...` или новый `/category/decants`).
  - FAQ-блок + `FAQPage` JSON-LD (хорошие сниппеты).
- Создать SEO-страницы: «О компании», «Доставка и оплата», «Возврат», «Контакты» (сейчас «О нас» / «Доставка» — модалки, индексировать невозможно).
- Блог / статьи о парфюмерии — мощный канал для информационного трафика.

### 5.3. Внутренняя перелинковка
- В карточке товара блок «Продукты этого бренда» есть ([pages/products/[slug].vue:159-169](pages/products/[slug].vue#L159-L169)) — добавить ещё «Похожие ароматы», «С такими же нотами».
- В футере — ссылки на топ-категории, топ-бренды.

### 5.4. Сигналы доверия
- В `<head>` добавить ссылки на профили: VK, Telegram, WhatsApp (`og:see_also` или JSON-LD `Organization.sameAs`).
- Микроразметка отзывов (если есть).

---

## 6. Технический чек-лист аналитики

- [ ] Подтвердить, что Yandex.Metrika и Google Analytics реально работают ([plugins/yandex-metrika.client.js](plugins/yandex-metrika.client.js), [plugins/google-analytics.js](plugins/google-analytics.js)) — проверить ID не равны заглушке.
- [ ] Подключить Search Console (Google) и Webmaster (Yandex), загрузить sitemap, отслеживать ошибки индексации.
- [ ] Настроить цели в Метрике/GA: «оформление заказа», «отправка заявки на бренд» (форма из layout `noBrands`).
- [ ] Включить отчёт «Скорость сайта» / Core Web Vitals в Search Console.

---

## 7. План внедрения по неделям

### Неделя 1 — критический минимум
1. `public/robots.txt`.
2. `@nuxtjs/sitemap` + динамический sitemap из API.
3. Починить переменные в meta карточки товара (`product.value?.*`).
4. `<h1>` на главной, `<h1>` и стабильный `<title>` на каталоге.
5. Canonical без query-параметров на листинге; `noindex` на отфильтрованных URL.

### Неделя 2 — структурированные данные и URL
6. JSON-LD: `Organization` (в layout), `Product`+`Offer` (карточка), `BreadcrumbList`, `WebSite` (главная).
7. Дружелюбные URL `/brand/[slug]`, `/category/[slug]` + редиректы со старых `/products/list?...`.
8. Полные хлебные крошки до товара.

### Неделя 3 — производительность
9. `@nuxt/image`, `<picture>`, `loading="lazy"`, `fetchpriority`, `width/height`.
10. Перенести fetch главной в `useAsyncData` (SSR-данные в HTML).
11. Per-component import для Element Plus, разбор CSS-бандла.

### Неделя 4 — контент
12. Контентные страницы (Доставка, Оплата, Возврат, Контакты, О компании) как полноценные роуты.
13. FAQ-блок + `FAQPage` JSON-LD на ключевых страницах.
14. Внутренняя перелинковка: похожие товары, ноты, бренды в футере.

### Постоянно
- Мониторинг Search Console / Вебмастера: проблемы индексации, CWV, клики/показы.
- Расширение контента: блог о парфюмерии, гайды по нотам.

---

## 8. Файлы, которых это коснётся (быстрый индекс)

- [nuxt.config.ts](nuxt.config.ts) — модули sitemap, image, robots, PWA-иконки.
- [layouts/default.vue](layouts/default.vue) — глобальный JSON-LD `Organization`, default `useSeoMeta`.
- [pages/index.vue](pages/index.vue) — H1, SSR-данные, JSON-LD `WebSite`, LCP-изображение.
- [pages/products/list.vue](pages/products/list.vue) — H1, canonical, robots, дружелюбные URL.
- [pages/products/[slug].vue](pages/products/[slug].vue) — фикс meta, JSON-LD `Product`, корректный H1, microdata.
- [pages/decantInfo.vue](pages/decantInfo.vue) — H2, FAQ, JSON-LD.
- [pages/offer.vue](pages/offer.vue), [pages/privacy.vue](pages/privacy.vue) — H1, корректная иерархия заголовков.
- [components/Header/desktop.vue](components/Header/desktop.vue), [components/Header/mobile.vue](components/Header/mobile.vue) — alt у логотипа.
- [public/robots.txt](public/robots.txt) — создать.
- [server/](server/) — endpoint sitemap, опционально server-meta для динамических роутов.

---

## 9. Метрики успеха (после внедрения P0+P1)

- 100% страниц с уникальными `title` и `description` (Search Console → Покрытие).
- 0 дублей по canonical.
- Богатые сниппеты в выдаче по запросам `купить {бренд} парфюм`.
- LCP < 2.5s, CLS < 0.1, INP < 200ms по 75-му перцентилю.
- Рост органического трафика по брендовым/категорийным запросам через 4-8 недель.

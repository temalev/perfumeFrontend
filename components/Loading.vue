<template>
  <div class="loading-spinner" v-if="visible">
    <!-- Здесь может быть ваш HTML-код для спиннера загрузки -->
    <div class="example">
      <div class="block">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  /* Дополнительные стили для спиннера */
}

body {
  background: #618f4f;
}

.example {
  position: fixed;
  top: 50%;
  left: 50%;
  height: 24px;
  width: 24px;
  transform: translateX(-50%) translateY(-50%);
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
}

.block {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;

  > .item {
    position: absolute;
    height: 24px;
    width: 24px;
    background: #3c3c3c;
    animation: move 2s linear infinite;
    border: 1px solid #eee;
    border-radius: 2px;

    &:nth-of-type(1) {
      top: -24px;
      left: -24px;
      animation-delay: -7 * 2s / 8;
    }

    &:nth-of-type(2) {
      top: -24px;
      left: 0;
      animation-delay: -6 * 2s / 8;
    }

    &:nth-of-type(3) {
      top: -24px;
      left: 24px;
      animation-delay: -5 * 2s / 8;
    }

    &:nth-of-type(4) {
      top: 0;
      left: 24px;
      animation-delay: -4 * 2s / 8;
    }

    &:nth-of-type(5) {
      top: 24px;
      left: 24px;
      animation-delay: -3 * 2s / 8;
    }

    &:nth-of-type(6) {
      top: 24px;
      left: 0;
      animation-delay: -2 * 2s / 8;
    }

    &:nth-of-type(7) {
      top: 24px;
      left: -24px;
      animation-delay: -1 * 2s / 8;
    }

    &:nth-of-type(8) {
      top: 0;
      left: -24px;
      animation-delay: 0 * 2s / 8;
    }
  }
}

@keyframes move {
  0% {
    transform: rotate(0) scale(1);
    animation-timing-function: ease-in;
  }
  10% {
    transform: rotate(90deg) scale(0);
  }
  50% {
    transform: rotate(90deg) scale(0);
    animation-timing-function: ease-out;
  }
  60% {
    transform: rotate(180deg) scale(1);
  }
  100% {
    transform: rotate(180deg) scale(1);
  }
}
</style>

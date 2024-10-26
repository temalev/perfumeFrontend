<template>
  <div v-if="!isHidden" class="drawer-wrapper">
    <div
      class="drawer-background"
      :class="[{ 'drawer-background-hidden': isClosed }, positioning]"
    >
      <div
        class="drawer"
        :class="{ 'drawer-close': isClosed }"
        @animationend="onAnimationEnd"
      >
        <button class="ico-btn d-flex align-center j-c p-3" @click="onClose">
          <span style="font-size: 30px">✕</span>
        </button>
        <div class="drawer-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    positioning: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      isClosed: false,
      isHidden: false,
    };
  },
  methods: {
    onClose() {
      this.isClosed = true;
    },
    onAnimationEnd() {
      if (this.isClosed) {
        this.isHidden = true;
        this.$emit('close');
      }
    },
    beforeUnmount() {
      this.isClosed = false;
      this.isHidden = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 9999;
}
.drawer-background {
  background-color: #000000a7;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  animation: show 0.2s ease-in;
}

.center {
  justify-content: center;

  & .drawer {
    width: 60%;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
}

.drawer {
  --drawer-width: 40%;
  @media (max-width: 500px) {
    --drawer-width: 100%;
  }
  width: var(--drawer-width);
  height: 100%;
  background-color: #fff;
  animation: open 0.2s ease-out;
}

.drawer-content {
  height: 100%;
}

.drawer-close {
  animation: close 0.2s ease-out;
}

.drawer-background-hidden {
  animation: hidden 0.2s ease-out;
}

@keyframes open {
  from {
    width: 0;
  }
  to {
    width: var(--drawer-width);
  }
}

@keyframes close {
  from {
    width: var(--drawer-width);
  }
  to {
    width: 0;
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hidden {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

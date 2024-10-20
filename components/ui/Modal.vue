<template>
  <div v-if="!isHidden" class="modal-wrapper">
    <div
      class="modal-background"
      :class="{ 'modal-background-hidden': isClosed }"
      @animationend="onAnimationEnd"
    >
      <div class="modal">
        <div class="modal-header">
          <h1 class="modal-header-text">{{ header }}</h1>

          <button class="ico-btn" @click="onClose">
            <span style="font-size: 30px">✕</span>
          </button>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: '',
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
      this.$emit('close');
    },
    onAnimationEnd() {
      if (this.isClosed) {
        this.isHidden = true;
      }
    },
    beforeUnmount() {
      this.isClosed = false;
      this.isHidden = false;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
.modal-background {
  background-color: #0000008d;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: show 0.2s ease-in;
  width: 100%;
  height: 100%;
}

.modal {
  background-color: #fff;
  min-width: 300px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    gap: 20px;
  }
}

.modal-content {
  width: 100%;
}

.modal-background-hidden {
  animation: hidden 0.2s ease-out;
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

<template>
  <div v-if="!isHidden" class="modal-wrapper">
    <div
      class="modal-background"
      :class="{ 'modal-background-hidden': isClosed }"
      @animationend="onAnimationEnd"
    >
      <div class="modal">
        <button class="ico-btn m-4" @click="onClose">
          <Icon name="material-symbols-light:close" style="font-size: 40px" />
        </button>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

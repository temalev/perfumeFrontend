<template>
  <div class="the-input">
    <label v-if="label" :for="id">{{ label }}</label>

    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :value="modelValue"
        :placeholder="placeholder"
        :class="inputClass"
        :disabled="disabled"
      />
      <div class="input-suffix">
        <slot name="input-suffix">
          <Icon
            name="material-symbols:keyboard-arrow-down-rounded"
            style="font-size: 20px"
            @click="$emit('focus', $event)"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.input-wrapper {
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: border-color 0.3s;
  padding: 2px;
}

input {
  padding: 0.5em;
  font-size: 1em;
  border: none;
  width: 100%;
  outline: none;
}

input:focus {
  .input-wrapper {
    border-color: black;
    outline: none;
  }
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.input-suffix {
  height: 20px;
  margin: 0 12px;
  cursor: pointer;
  color: #ccc;
}
</style>

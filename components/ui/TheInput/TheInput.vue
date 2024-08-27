<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :placeholder="placeholder"
      :class="inputClass"
      :disabled="disabled"
    />
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

<style scoped>
.input-wrapper {
  margin-bottom: 1em;
}

input {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s;
}

input:focus {
  border-color: black;
  outline: none;
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
</style>

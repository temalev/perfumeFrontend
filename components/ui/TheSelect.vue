<template>
  <div class="select-container">
    <UiTheInput
      type="text"
      v-model="searchQuery"
      placeholder="Поиск..."
      :label="label"
      @focus="toggleDropdown"
      @blur="closeDropdown"
      @input="filterOptions"
    />
    <transition name="fade">
      <div v-if="isOpen" class="dropdown">
        <ul>
          <li
            v-for="option in filteredOptions"
            :key="option.id"
            @click.stop="selectOption(option)"
            :class="{ selected: option.id === selectedOption?.id }"
          >
            {{ option.name }}
          </li>
          <li v-if="filteredOptions.length === 0" class="no-options">
            Нет совпадений
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchQuery: '',
      isOpen: false,
      selectedOption: null,
      filteredOptions: [],
    };
  },
  methods: {
    closeDropdown() {
      this.isOpen = false;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && this.filteredOptions.length === 0) {
        this.filteredOptions = this.options;
      }
    },
    filterOptions() {
      const query = this.searchQuery.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        option.name.toLowerCase().includes(query)
      );
    },
    selectOption(option) {
      this.selectedOption = option;
      this.searchQuery = option.name;
      this.isOpen = false;
      this.$emit('change', this.selectedOption);
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery === '') {
        this.filteredOptions = this.options;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.select-container {
  position: relative;
  width: 100%;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}

.dropdown li.selected {
  background-color: #007bff;
  color: white;
}

.dropdown li.no-options {
  padding: 8px;
  color: #999;
}

/* Анимация появления и исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

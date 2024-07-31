import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.vue"],
  rules: {
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
        externalIgnores: [],
      },
    ],
    // vue disabled
    "vue/html-self-closing": "off",
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/v-slot-style": "off",
    "vue/attributes-order": "warn",
    "vue/no-v-html": "off",
    "vue/custom-event-name-casing": "off",
    "vue/html-button-has-type": "off",
    "vue/no-lone-template": "off",

    // vue additional
    "vue/no-invalid-model-keys": "error",
    "vue/no-multiple-objects-in-class": "error",
    "vue/no-reserved-component-names": "error",
    "vue/no-this-in-before-route-enter": "error",
    // "vue/no-unregistered-components": "error",
    // "vue/require-name-property": "error",
    "vue/script-indent": "warn",

    // eslint
    "no-console": ["error", { allow: ["info", "warn", "error"] }],
    "comma-dangle": [
      "warn",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "comma-spacing": "warn",
    "comma-style": ["warn", "last"],
    "computed-property-spacing": ["warn", "never"],
    "eol-last": ["warn", "always"],
    // "indent": ["warn", 2, {
    //   "ignoredNodes": ["TemplateLiteral"]
    // }],
    // "linebreak-style": ["warn", "windows"],
    "no-trailing-spaces": "warn",
    "no-whitespace-before-property": "warn",
    "object-curly-spacing": ["warn", "always"],
    quotes: ["warn", "single"],
    "no-duplicate-imports": "error",
  },
});

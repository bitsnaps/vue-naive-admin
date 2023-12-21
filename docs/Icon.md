## Use iconify icon

First go to the icon library address:[icones](https://icones.js.org/) Find the right icon

### 1. Combine unocss use

```html
<i i-carbon-sun />
<i class="i-carbon-sun" />
```

### 2. Binding plug -in unpCustom label usecons 自定义标签使用

`<icon-[iconify icon name]`

```html
<icon-ant-design:fullscreen-exit-outlined  />
<icon-ant-design:fullscreen-outlined />
```

This method also supports custom SVG icons.
`<icon-custom-[SVG icon file name]`

```
<icon-custom-logo />
```

For specific configuration build/plugin/unplugin.js

### 3. Naive UI's NIcon component packaging and use

```html
<!-- iconify icon -->
<TheIcon icon="material-symbols:delete-outline" />
<!-- Custom SVG icon -->
<TheIcon icon="logo" type="custom" />
```

Packaging component src/components/icon
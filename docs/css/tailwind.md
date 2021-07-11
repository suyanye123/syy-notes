# Tailwindcss

## Preflight 预检查

Preflight建立在[现代规范化](https://github.com/sindresorhus/modern-normalize)之上，是 Tailwind 项目的一组基本样式，旨在消除跨浏览器的不一致，让您在设计系统的约束内更轻松地工作。

如果你安装官方教程配置好环境后，Tailwind 会自动注入这些样式：

```css
@tailwind base; /* Preflight will be injected here 预检查会在此处插入 */

@tailwind components;

@tailwind utilities;
```

那么预检查做了哪些事呢？

### 1.删除默认边距

预检查 在标题、块引用、段落等元素中删除所有默认边距。

```css
blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre {
  margin: 0;
}
```

### 2. 清除标题样式

默认情况下，所有标题元素都完全没有样式，并且具有与普通文本相同的字体大小和字体粗细。

```css
h1,h2,h3,h4,h5,h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

但是你可以，添加自己的基本样式，来更改默认标题样式

### 3.清除列表样式

默认情况下，有序和无序列表没有样式，没有项目符号/数字，也没有边距或填充。

```css
ol,ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

如果您想设置列表样式，可以使用[list-style-type](https://tailwindcss.com/docs/list-style-type)和[list-style-position](https://tailwindcss.com/docs/list-style-position)

同样你也可以通过自定义自己的基本样式，来更改这个默认配置

### 4. 图像是块级的

默认情况下，图像和其他替换元素（如`svg`、`video`、`canvas`等）默认为`display: block`。

```css
img,svg,video,canvas,audio,iframe,embed,object {
  display: block;
  vertical-align: middle;
}
```

如果非要使用inline-block行内元素样式，直接添加inline 样式即可覆盖

```html
<img class="inline" src="..." alt="...">
```

### 5. 边框样式全局重置

```css
*,
::before,
::after {
  border-width: 0;
  border-style: solid;
  border-color: theme('borderColor.default', currentColor);
}
```

在集成某些第三方库（例如[Google 地图）](https://github.com/tailwindlabs/tailwindcss/issues/484)时，这可能会导致一些意外结果。

当遇到这样的情况时，可以通过使用自己的自定义 CSS 覆盖预检样式来解决这些问题：

```css
.google-map * {
  border-style: none;
}
```

### 6. 按钮具有默认轮廓

```css
button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}
```

### 7.更改预检配置

如果您想在 Preflight 之上添加您自己的基本样式，只需将它们添加到您的 CSS`@layer base`指令中：

```css
/*在 index.css文件中 */
@tailwind base;
@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  a {
    @apply text-blue-600 underline;
  }
}
@tailwind components;
@tailwind utilities;
```

### 8. 禁用预检

如果你想完全禁用预检，更改配置 `preflight:false` 即可

```diff
/* tailwind.config.js*/
  module.exports = {
    corePlugins: {
+     preflight: false,
    }
  }
```


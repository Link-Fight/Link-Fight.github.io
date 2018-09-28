# normalize.css的学习

### 乱语

最近在网上学习过程中遇到了 [normalize.css](https://necolas.github.io/normalize.css/),发现是一个知名的样式基础库，作为css小白，不得不拜读下。其实源代码里附带了完整的英文注释，所以此文的目的是学习，记录。

## 序言

  几乎每个网页，都会存在这样的一个样式文件或那几段css样式，从项目构建之日起，到项目终结，无论需求怎么玩，它们都是丝毫不变。

  它们的作用是为了让各个浏览器的css样式有着统一的基准。之前比较常用的 `css reset`,主要方法是`清零`。

  而这篇文字的主角`Normalize.css`就是一种CSS reset的替代方法。`A modern, HTML5-ready alternative to CSS resets`,如它口号所述，一个现代化的，支持h5的`CSS resets`。

  ## Show Code

  以下代码基于[v8.0.0](https://necolas.github.io/normalize.css/8.0.0/normalize.css)

  ``` css
  /* Document */
  /**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 *
 * 1. 修正所有浏览器的行高
 * 2. 防止在ios上因为切换横屏而产生的字体大小调整
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

```

* 开始就重置了浏览器的`line-hegith`属性，而用的是`number(unitless)`:没有单位的数值。而据我们所知`line-height`能设置的值的类型分别可有`normal/number(unilless)/length/percentage`，而`number(unitless)`就之中最佳选择，而`length/percentage`在属性继承时，会有糟糕的表现。在[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)里有提到。同时，里面也提到在设置段落内容时，最小该用`1.5`。

* 看到`-webkit-text-size-adjust`，我一下子就想起`-webkit-overflow-scrolling:touch;`,这个属性在移动端是必设的，不然在ios上滚动会缺乏那如丝般丝滑。

``` css
/* Sections */
/**
 * Remove the margin in all browsers.
 * 
 * 移除margin
 */

body {
  margin: 0;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 * 
 * 修正元素的样式表现
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
```


* 如果按照注释所述，源代码是不漏了`section`,`srticle`了呀...

``` css
/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 * 
 * 1.把hr的盒子模型统一为标准w3c盒子模型，因为firefox里默认的盒子模型不是这个
 * 2.在Edge和IE上显示滚动
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 * 
 * 统一pre元素在所有浏览器中字体的表现
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

```

``` css
/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 * 
 * 去掉a元素在IE 10中active状态时，产生灰色背景的情况。
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 * 
 * 去掉abbr元素在Chrome 57-上的底部边框
 * 统一其在各个浏览器的文本修饰的表现
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 * 
 * 统一b,strong元素的表现
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 * 
 * 统一这些元素的字体渲染的表现
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 * 
 * 统一small元素的字体大小
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 * 
 * 就是防止上标和下标元素影响行高的渲染
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}
```

```css
/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 * 移除在IE 10上img元素默认的边框样式
 */

img {
  border-style: none;
}
```

``` css
/* Forms 表单元素
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 * 统一这些元素字体渲染情况
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 * 让这些元素在IE以及Edge上都是展示滚动的
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 *
 * text-transform这个属性在日常开发比较少用，毕竟不是日常用语不是西文，这里是统一清除了这个属性
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 *
 * -webkit-appearance属性可以指定元素的外观风格，使其类似元素控件，这里是让IOS以及Safari和其它浏览器有统一的表现
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 *
 * 移除按钮在Firefox上的独特表现
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 *
 * 统一按钮在Firefox上的focusring的表现
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 * 统一元素样式表现
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 * 
 * 1. 统一指定legend的盒子模型为IE的和值模型
 * 2 去掉在IE时，其默认的颜色表现
 * 3 去掉padding值
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 *
 * 统一元素的vertical-align值
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 *
 * 去掉textarea元素在IE10+上默认的滚动条
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 *
 * 指定这类型元素的盒子模型
 * 去除默认的padding
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 *
 * 修正在chrome上表现
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 *
 * 指定该类型元素在Chrome/safair的外包表现
 * 修正outline的样式
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 * 去掉macOS上 chrome/Safari的padding
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 * 
 * 修正file类型控件的样式
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}
```
``` css

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 * 统一指定元素的display属性
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 * 统一指定元素的display属性
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 * 统一指定元素的display属性
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
```
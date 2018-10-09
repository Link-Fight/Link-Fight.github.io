# Top 26 JavaScript Interview Questions I Wish I Knew

![原文](https://dev.to/aershov24/top-26-javascript-interview-questions-i-wish-i-knew-26k1)

其实就是，面试中遇到的题目类型。本篇仅仅是本人的读书笔记，仅做个人理解，记录。

## Q1: What is Coercion in JavaScript?

> In JavaScript conversion between different two build-in types called `coercion`. Coercion comes in two forms in JavaScript: `explicit` and `implicit`.

就是问JavaScript里面的显式类型转换和隐式类型转换。


## Q2: What is Scope in JavaScript?

问下js中的函数作用域，一般会伴随着变量提升，闭包的知识点来问。

## Q3: Explain equality in JavaScript

主要涉及 `==` 和  `===` 的区别，前面那个会有隐式类型转换，工作里面都会用后面那个。

要知道 `0`,`""`,`[]`是假值。

## Q4: Explain what a callback function is and provide a simple example.

简单解释下回调什么是回调函数。就是一个函数被当做参数传递到一个函数中，并在函数要结束的时候，执行。

个人觉得，js这些动态语言的特别之处就在于，函数可以当做是一个参数，传递到方法里面去，并且可以在方法里面执行。

## Q5: What does "use strict" do?

在严格模式下，会有什么作用。

主要是规范下JavaScript语法中的一些不合理，不严谨的行为。

* 变量要先声明才能使用
* this不会指向全局变量
* 禁止函数内部读取 `caller`
* 更多报错提示，例如：
   * 对对象的只读属性进行赋值，会报错
* 对象不能有重名的属性
* 函数不能有重名的参数
* 不允许对arguments赋值
* arguments不再追踪参数变化
* 禁止使用arguments.callee

## Q6: Explain Null and Undefined in JavaScript

两个都是`无`,都是`假值`。

但是:

``` js

typeof undefined === 'undefined'

typeof null === 'object'

```

> unll 表示`没有对象`，即该处不应该有值。常用于：
* 作为函数的参数，表示该函数的参数不是对象。
* 作为原型链的终点。

> undefined 表示`缺少值`,就是此处应该有值，但是还没有定义。作用于：
* 变量被声明了，但是没有赋值，就等于undefined。
* 调用函数时，应该提供的参数没有提供，该参数就等于undefined。
* 对象没有赋值的属性，该属性就等于undefined。
* 函数没有返回值时，默认返回undefined。

![undefined与null的区别-阮一峰](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

## Q7: Write a function that would allow you to do this.

题目：

``` js
var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27
```

``` js 
// 我的直觉答案
function createBase(base){
  return function (last){
    return base + last
  }
}
```

不需要解释了吧

## Q8: Explain Values and Types in JavaScript

js是动态语言，值是有类型的，而变量是没有类型的。内置类型有:

* string
* number
* boolean
* null/undefined
* object
* symbol（new to ES6）

## Q9: Explain event bubbling and how one may prevent it

事件冒泡，就是事件在最深，最具体的元素触发，然后沿着父级的嵌套层级逐级向上触发。

`event.stopPropagation`/`event.cancelBubble`用在阻止该冒泡行为。

## Q10: What is let keyword in JavaScript?

就是 `let` 的作用，而相比于 `let` ,主要区别有：
* `var`的作用域是整个封闭函数。而let定义的变量，作用域是在块级或子块中。
* let不允许在相同作用域内，重复声明同一个变量。
* 只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不再受外部的影响。总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的，尽管代码块外也存在相同全局变量。
* 变量提升，在函数内，无论`var`在哪行进行声明，在预解析时候，都会把声明提升到作用域的顶部，此时赋值未undefined。而`let`,也是把声明提到作用域的顶部，但是没有赋值，并且在正式声明前访问会报错。

## Q11: How would you check if a number is an integer?

就是判断一个数字是否是整数：
```js
function isInteger(num){
  return typeof num ==='number'&&num/1===num
}
```

原文给的答案，数字字符串也能通过，感觉不够严谨。

## Q12: What is IIFEs (Immediately Invoked Function Expressions)?

实名是立即执行函数...不用解释..

## Q13: How to compare two objects in JavaScript?

就本人的开发体验来说，工作中遇到的对比两个对象，其实是在对比两个数据的是不是相同，一般都是纯数据对象，所以用`JSON.stringify`转为字符串后进行对比。

而面试中，这应该就是用到递归，遍历，逐个属性进行对比。如果是基本数据类型，直接用`===`，如果是引用的，就递归下去。


## Q14: Could you explain the difference between ES5 and ES6

> `ES5`(2009),已在所有现在浏览器中实现了。`ES6`(2015),在大部分现代浏览器中实现。
ES6,主要带来了：
* 箭头函数
* const,let更加严谨的变量声明
* 块级作用域(let)
* 默认参数值
* class
* 析构
* Promise
* 模块化的统一

## Q15: Explain the difference between "undefined" and "not defined" in JavaScript

主要就是要区别下声明和定义的区别的。

`undefined`:对于一个变量来说，其声明了，但是没有赋值。或者，对一个没有声明的变量，使用`typeof`操作符，也会得到undefined。
`not defined`:就是去访问一个没有声明过的变量时，得到的提示。

## Q16: What is the difference between anonymous and named functions?

## Q17: What is “closure” in javascript? Provide an example?

就是嵌套函数内，其内嵌函数可以访问外层函数的变量，而在函数外面是访问不到函数内部变量，并且嵌套函数，执行后把里面内嵌的函数暴露出来后，该函数以及其变量就不会销毁，该内联函数可以一直访问到函数里面的变量。

``` js
function test(p){
  let base = 1;
  return function (o){
    return base + p + o
  }
}
```

## Q18: How would you create a private variable in JavaScript?

一般用闭包。还可以用`Symbol`关键字。

## Q19: Explain the Prototype Design Pattern
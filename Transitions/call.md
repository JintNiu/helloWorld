## 如何在 JavaScript 中使用 apply(💅),call(📞),bind(➰)函数

![](https://user-gold-cdn.xitu.io/2019/1/21/1686da39092644ab?w=2560&h=1858&f=jpeg&s=578203 "Photo by Andrew Worley on Unsplash")

> 原文链接：[How to use the apply(💅), call(📞), and bind(➰) methods in JavaScript](https://medium.freecodecamp.org/how-to-use-the-apply-call-and-bind-methods-in-javascript-80a8e6096a90)  
> 原文作者：[Ashay Mandwarya](https://medium.freecodecamp.org/@ashaymurceilago)  
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd)   
> 推荐理由：`apply`,`call` 和 `bind` 是面试和日常编码中常常会遇到的问题，了解和掌握他们的用法变得尤为重要。


在本文中，我们将讨论函数原型链中 `apply`，`call` 和 `bind` 方法。它们是 `JavaScript` 中最重要且经常使用的概念，并且与 `this` 关键字密切相关。

因此，想要掌握本文所述内容，您必须熟悉 `this` 关键字的概念和用法。如果您已经熟悉它，那么可以继续 - 否则，可以参考[这篇文章](https://medium.freecodecamp.org/a-guide-to-this-in-javascript-e3b9daef4df1)，然后再回来。

要了解 `apply` | `call` | `bind`，我们也需要了解 `JavaScript` 中的函数，前提是您可以熟料运用 `this` 了。

## Functions

![](https://user-gold-cdn.xitu.io/2019/1/21/1686da39092644ab?w=2560&h=1858&f=jpeg&s=578203 "Photo by Andrew Worley on Unsplash")

`Function` 构造函数创建了一个新的 `Function` 对象。直接调用构造函数的话，可以动态地创建出可以在全局范围内执行的函数。

由于函数是 `JavaScript` 中的对象，因此可以由`apply`，`call` 和 `bind` 方法对他们进行调用。

要检查函数是否为一个 `Function` 对象，我们可以使用以下代码进行判断，该代码段返回 `true`。

![](https://user-gold-cdn.xitu.io/2019/1/21/1686da39092644ab?w=2560&h=1858&f=jpeg&s=578203 "Photo by Andrew Worley on Unsplash")

> 全局Function对象没有自己的方法或属性。但是，由于它本身就是一个函数，它确实通过Function.prototype的原型链继承了一些方法和属性。 - MDN


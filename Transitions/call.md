## 如何在 JavaScript 中使用 apply(💅),call(📞),bind(➰)函数

![](https://user-gold-cdn.xitu.io/2019/3/11/1696bd0eca224a8d?w=2560&h=1706&f=jpeg&s=723007)

> 原文链接：[How to use the apply(💅), call(📞), and bind(➰) methods in JavaScript](https://medium.freecodecamp.org/how-to-use-the-apply-call-and-bind-methods-in-javascript-80a8e6096a90)  
> 原文作者：[Ashay Mandwarya](https://medium.freecodecamp.org/@ashaymurceilago)  
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd)   
> 推荐理由：`apply`,`call` 和 `bind` 是面试和日常编码中常常会遇到的问题，了解和掌握他们的用法变得尤为重要。


在本文中，我们将讨论函数原型链中 `apply`，`call` 和 `bind` 方法。它们是 `JavaScript` 中最重要且经常使用的概念，并且与 `this` 关键字密切相关。

因此，想要掌握本文所述内容，您必须熟悉 `this` 关键字的概念和用法。如果您已经熟悉它，那么可以继续 - 否则，可以参考[这篇文章](https://medium.freecodecamp.org/a-guide-to-this-in-javascript-e3b9daef4df1)，然后再回来。

要了解 `apply` | `call` | `bind`，我们也需要了解 `JavaScript` 中的函数，前提是您可以熟料运用 `this` 了。

## Functions


![](https://user-gold-cdn.xitu.io/2019/3/11/1696bd12c740963a?w=800&h=600&f=jpeg&s=74186)

`Function` 构造函数创建了一个新的 `Function` 对象。直接调用构造函数的话，可以动态地创建出可以在全局范围内执行的函数。

由于函数是 `JavaScript` 中的对象，因此可以由`apply`，`call` 和 `bind` 方法对他们进行调用。

要检查函数是否为一个 `Function` 对象，我们可以使用以下代码进行判断，该代码段返回 `true`。


![](https://user-gold-cdn.xitu.io/2019/3/11/1696bd1548091be7?w=800&h=352&f=png&s=40735)

> 全局 `Function` 对象没有自己的方法或属性。但由于它本身就是一个函数，可以通过 `Function.prototype` 的原型链继承了一些方法和属性。 - MDN

以下是函数原型链中的方法：

+ `Function.prototype.apply()`
+ `Function.prototype.bind()`
+ `Function.prototype.call()`
+ `Function.prototype.isGenerator()`
+ `Function.prototype.toSource()`
+ `Object.prototype.toSource`
+ `Function.prototype.toString()`
+ `Object.prototype.toString`

这篇文章中我们只讨论其前三个。

## Apply 💅

![](https://user-gold-cdn.xitu.io/2019/3/11/1696c68f09b17b6e?w=800&h=1000&f=jpeg&s=110254)

> `apply()` 是存在于函数原型中的一个重要方法，用于调用函数， 参数为给定的 `this` 值，以及一个数组（或类似数组的对象）。

类数组对象可以参照 `NodeList` 或函数内的 `arguments` 对象。

这意味着我们可以调用任何函数，并显式指定在调用时  `this` 的引用。

### 语法

``` javascript
function.apply(this,[argumentsArray])
```

### 返回值

返回 `this` 调用的函数结果。

### 描述

`apply()` 方法使对象 `x` 中的一个函数/对象可以被对象 `y` 调用。

### 例子

### 1.

``` javascript
var array = ['a', 'b'];
var elements = [1, 2, 3];
array.push(elements);
console.log(array);  // ['a', 'b', [1, 2, 3]]
```

以上代码中可以看出，当我们将一个数组 `push` 进另一个数组时，整个数组被视为一个元素直接 `push` 进数组变量中。

但如果我们想要将数组 `elemennts` 中的元素分别 `push` 进数组 `array` 中呢？当然有很多方法可以这样做，在这里我们使用 `apply()`。

``` javascript
var array = ['a', 'b'];
var elements = [1, 2, 3];
array.push.apply(array, elements);
console.log(array); // ["a", "b", 1, 2, 3]
```

该例中，给定数组之间使用 `apply` 连接，`arguments`参数为数组 `elements`，`this` 指向变量 `array`。数组 `elements` 中的元素被 `push` 进 `this` 指向的对象（`array`）中。最终结果为第二个数组中的每个元素被 `push` 进 `this` 指向的数组中。

### 2.

``` javascript
var numbers = [53, 65, 25, 37, 78];
console.log(Math.max(numbers)); //NaN
```

`JS` 中的 `max` 函数用于查找给定元素中最大值的元素。但正如我们所见，如果给定值是数组的形式，返回结果为 `NaN`。当然，`JavaScript` 中有很多方法可以解决，在这里我们使用 `apply`。

``` javascript
var numbers = [53, 65, 25, 37, 78];
console.log(Math.max.apply(null, numbers)); //78
```

当我们使用 `apply` 和 `Math.max()` 时，返回正确结果。`apply` 会将数组中的所有值作为单独的参数传入数组，然后再调用 `max`，最终返回数组中的最大值。

值得注意的是，我们使用 `null`  代替了 `this`。由于提供的参数是数字数组，即使使用了 `this`，它也仍会指向同一个数组，最终得到相同的结果。因此，这种情况下我们可以使用 `null`  代替 `this`。也就是说，`apply` 函数中的 `this` 参数是一个可选参数。

## Call 📞


![](https://user-gold-cdn.xitu.io/2019/3/11/1696cad7c0e8f511?w=800&h=1200&f=jpeg&s=350654)

> `call()` 方法用于调用一个函数，参数为给定的 `this` 值，以及若干个单独指定的参数。

这意味着我们可以调用任何函数，并显式指定在调用时  `this` 的引用。

这与 `apply` 非常相似，唯一的区别是 `apply` 以数组或类数组对象的形式接受参数，`call` 的参数是单独提供的。

### 语法

``` javascript
function.call(thisArg,arg1,arg2,...)
```

### 返回值

返回 `this` 和给定参数调用的函数结果。

### 描述

`call()` 方法使对象 `x` 中的一个函数/对象可以被对象 `y` 调用。

### 例子

### 1.

```javascript
function Product(name, price) {
    this.name = name;
    this.price = price;
}
function Pizza(name, price) {
    Product.call(this, name, price);
    this.category = 'pizza';
}
function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
}

var pizza = new Pizza('margherita', 50);
var toy = new Toy('robot', 40);
console.log(toy); // Toy {name: "robot", price: 40, category: "toy"}
console.log(pizza); // Pizza {name: "margherita", price: 50, category: "pizza"}
```

这是构造函数链的一个例子。可以看到，每个函数中都调用了 `Product` 的构造函数，并使用 `call` 将 `Product` 对象的属性分别与 `Pizza` 和 `Toy` 连接在一起。

创建 `Pizza` 和 `Toy` 对象的实例并输出，可以看到结果中显示了 `name`,`price` 和 `category` 三个属性。但我们只定义了 `category`一个属性，其他属性 `name` 和 `price` 则是由于已经在 `Product` 对象中定义并应用，因此可以通过 `Product` 对象的链式构造函数获得。将以上代码稍作改动就可实现继承。

### 2. 

``` javascript
function sleep(){
    var reply=[this.animal,'typically sleep between',this.sleepDuration].join(' ');
    console.log(reply); // I typically sleep between 12 and 16 hours
}
var obj={
    animal:'I',sleepDuration:'12 and 16 hours'
};
sleep.call(obj);
```

在上面的代码中，我们定义了一个名为 `sleep` 的函数，其包含一个数组 `reply` ，该数组由使用 `this` 进行属性寻址得到的元素组成，这些元素在函数外的独立对象中定义。

使用对象 `obj` 作为参数调用函数 `sleep` 。可以看出，`this.animal` 和 `this.sleepDuration` 分别取到了 `obj` 的属性，并输出完整的句子。


## Bind➰


![](https://user-gold-cdn.xitu.io/2019/3/11/1696ce60cfe52dc0?w=800&h=533&f=jpeg&s=120063)

> The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. — MDN

> `bind()` 方法会创建一个新函数，当调用该函数时，`this` 将设为给定值，并在调用新函数时，在任何提供的参数之前提供给定的参数序列。  — MDN

### 语法

``` javascript
function.bind(this,arg1,arg2,arg3,...)
```

### 返回值

返回 `this` 和给定参数调用的函数副本。

### 描述
The bind function is much like the call function, with the main difference being that bind returns a new function whereas call does not.

According to ECMAScript 5 specifications, the function returned by bind is a special type of exotic function object (as they call it) called the Bound function (BF). The BF wraps the original function object. Calling a BF runs the wrapped function in it.

`bind` 方法与 `call` 方法类似，主要区别在于 `bind` 返回一个新函数，而 `call` 不返回。

根据 ECMAScript 5 规范，`bind` 方法返回的函数是一种特殊类型的外来函数对象，被称为绑定函数 （ BF ）。BF 包含原始函数对象，调用 BF 会运行其中的包含函数。

### 例子
``` javascript
var x = 9;
var module = {
    x: 81,
    getX: function () {
        return this.x;
    }
};
console.log(module.getX()); // 81
var retrieveX = module.getX;
console.log(retrieveX()); // 9
var boundGetX = retrieveX.bind(module);
console.log(boundGetX()); // 81
```

在上面的代码中，我们定义了一个变量 `x` 和一个对象 `module`，该对象包含一个属性 `x` 和一个返回 `x` 值的函数。

当调用函数 `getX` 时，它返回的是对象内定义的 `x` 的值，而不是全局作用域中的 `x`。

另一个变量在全局作用域中声明，并调用 `module`对象中的 `getX` 函数。但由于该变量处于全局作用域下，因此 `getX` 中的 `this` 指向全局作用域下的 `x`，返回 9。

最后，又定义了另一个变量 `boundGetX`，该变量调用函数 `retrieveX`，与之前不同的是，这次将函数 `retrieveX`与对象 `module` 绑定，返回的是对象内 `x` 的值。由于绑定的作用，函数中的 `this` 指向对象中的 `x` 值而不是全局 `x`，输出 81。

## 结论

现在我们已经了解了以上三种方法的基础知识，但你可能会疑惑：为什么要用 3 个不同的方法去做相同的事情。为了解决这个问题，你必须在不同场景下反复练习，更全面地了解什么时候使用它们，以及如何更好的使用，这肯定会让你的代码更清晰，更强大。

如果您喜欢这篇文章，点个赞👏，加个关注👣 吧。

![](https://user-gold-cdn.xitu.io/2019/3/11/1696d205cf0013ad?w=146&h=174&f=gif&s=746813)


## [译] JavaScript 中 this 指南

![](https://user-gold-cdn.xitu.io/2019/3/12/16970fd072311e67?w=1200&h=800&f=jpeg&s=534672)

> 原文链接：[A guide to this in JavaScript](https://medium.freecodecamp.org/a-guide-to-this-in-javascript-e3b9daef4df1)  
> 原文作者：[Ashay Mandwarya](https://medium.freecodecamp.org/@ashaymurceilago)  
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd)   
> 推荐理由：`this` 一直是 `JavaScript` 中的重难点，借助这篇文章，重新认识并理解 `this`，加深印象。


`this` 无疑是 `JavaScript` 中使用最广泛但又容易被误解的关键字，今天我将会对其进行详细的解释。

当我们在学校学习英语代词时：

> Phelps is swimming fast because he wants to win the race.

这句话中，我们不直接使用 Phelps，而是使用代词“he”来指代他。类似地，`JavaScript` 中使用 `this` 关键字指向引用上下文中的对象。

例：
``` javascript 
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model); 
        console.log(car.make + " " + car.model); 
    }
}
car.fullName();

// Lamborghini Huracán
// Lamborghini Huracán
```

在上面的代码中，我们定义了一个具有属性 `make`，`model`  和 `fullName` 的对象 `car`，其中 `fullName` 是一个函数，函数体内使用 2 种不同的方法输出 `make` 和 `model`。

+ 使用 `this` 时，`this.make+ " " +this.model` 中的 ` this` 指的是在上下文中的对象，也就是 `car`，则 `this.make` 为 `car.make`，`this.model`  为 `car.model`；
+ 使用点操作符时，我们可以直接访问对象的属性 `car.make` 和 `car.model`。

## this

现在我们已经了解了什么是 `this` 以及它 最基本的用法，为方便记忆，我们将列出一些场景，并分别举例说明。

根据出现的位置，`this` 可分为以下几种情况：

1. 在方法内使用
2. 在函数内使用
3. 单独存在
4. 在事件中使用
5. `call()` 和 `apply()`

### 1. 在方法内使用 `this`

当 `this` 在方法内使用时，指向其所属的对象。

**在对象内定义的函数称为方法**。再来看看汽车的例子：

``` javascript 
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model);
        console.log(car.make + " " + car.model);
    }
}
car.fullName();
```

该例中，`fullName()` 即为方法，方法中的 `this` 指向对象 `car`。

### 2. 在函数内使用 `this`

函数中的 `this` 就有些复杂了。与对象一样，函数也具有属性。函数每次执行时都会获取 `this`，它指向调用它的对象。

> `this` 实际上只是“先行对象”的一种快捷引用，也就是对象调用。   
>  —  javascriptissexy.com

如果函数未被某对象调用，则函数内的 `this`  属于全局对象，该全局对象被称为 `window`。在这种情况下，`this` 将指向全局作用域中的变量。且看以下例子：

```javascript
var make = "Mclaren";
var model = "720s"
function fullName() {
    console.log(this.make + " " + this.model);
}
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model);
    }
}
car.fullName(); // Lmborghini Huracán
window.fullName(); // Mclaren 720S
fullName(); // Mclaren 720S
```

![](https://user-gold-cdn.xitu.io/2019/3/12/16971caa67e03f7e?w=800&h=362&f=png&s=81401)

该例中，在全局对象中定义了 `make`, `model` 和 `fullName`，对象 `car` 中也实现了 `fullName` 方法。当使用 `car` 调用该方法时，`this` 指向该对象内的变量；而使用另外两种调用方式时，`this` 指向全局变量。

### 3. 单独使用 `this`

当单独使用 `this`，不依附于任何函数或者对象时，指向全局对象。

![](https://user-gold-cdn.xitu.io/2019/3/12/16971dd394abbe56?w=314&h=83&f=png&s=5935)

这里的 `this` 指向全局变量 `name`。

### 4. 在事件内使用 `this`

![](https://user-gold-cdn.xitu.io/2019/3/12/16971def0c4c11b8?w=500&h=666&f=jpeg&s=80450)

`JS` 中有很多种事件类型，但为了描述简单，这里我们以点击事件为例。

每当单击按钮并触发一个事件时，可以调用另一个函数来去执行某个任务。如果在函数内使用 `this`，则指向触发事件中的元素。DOM 中，所有元素都以对象的形式储存，也就是说网页元素实际上就是 DOM 中的一个对象，因此每触发一个事件时，`this` 就会指向该元素。

例：
```html
<button onclick="this.style.display='none'">
  Remove Me!
</button>
```

### 5. call(), apply() & bind()

+ `bind`：允许我们在方法中设置 `this` 指向
+ `call`&`apply`：允许我们借助其他函数并在函数调用中改变 `this` 的指向。

有关 `call()`, `apply()` 和 `bind()` 的知识会在另一篇文章阐述。

> 译者注：可参考文章：
<a href="https://juejin.im/post/5c8617d86fb9a049e93d8e4a" target="_blank">[译] 如何在 JavaScript 中使用 apply(💅)，call(📞)，bind(➰)</a>

## 难点

理解掌握了 `this` 会使工作变轻松很多，但实际情况往往不是那么如意。请看以下例子。

### 例1：
 
``` javascript
var car = {
    make: "Lamborghini",
    model: "Huracán",
    name: null,
    fullName: function () {
        this.name = this.make + " " + this.model;
        console.log(this.name); 
    }
}
var anotherCar = {
    make: "Ferrari",
    model: "Italia",
    name: null
}
anotherCar.name = car.fullName();

// Lamborghini Huracán
```

结果并不是我们所期望的。分析其原因：当我们使用 `this` 调用另一个对象的方法时，只是为 `anotherCar` 分配了该方法，但实际调用者是 `car`。因此返回的是 Lamborghini  而不是 Ferrari。

我们可以使用 `call()` 解决这个问题。

![](https://user-gold-cdn.xitu.io/2019/3/12/1697235457911793?w=459&h=508&f=png&s=21613)

该例中利用 `call()` 方法使 `anotherCar` 对象调用 `fullName()`，该对象中原本并没有 `fullName()` 方法，但输出了 `Ferrari Italia`。

另外，当我们输出 `car.name` 和 `anotherCar.name` 的值时，前者输出 `null`，而后者输出了 `Ferrari Italia`，也就是说 `fullName()` 函数确实被 `anotherCar` 调用了，而不是被 `car` 调用。

### 例2：

![](https://user-gold-cdn.xitu.io/2019/3/14/16979dd02e43ea76?w=600&h=329&f=png&s=43333)

``` javascript
var cars = [
    { make: "Mclaren", model: "720s" },
    { make: "Ferrari", model: "Italia" }
]
var car = {
    cars: [{ make: "Lamborghini", model: "Huracán" }],
    fullName: function () {
        console.log(this.cars[0].make + " " + this.cars[0].model);
    }
}
var vehicle = car.fullName;
vehicle() // Mclaren 720s
```

该例中，我们定义了一个全局变量 `cars`，并且在对象 `car` 中也定义了同名变量，接着将 `fullName()` 方法赋给变量 `vehicle`，然后调用它。该变量属于全局变量，由于上下文的关系，`this` 指向的是全局变量 `cars` 而不是局部变量。

我们可以使用 `bind()` 解决这个问题。

![](https://user-gold-cdn.xitu.io/2019/3/12/16972347a22f274d?w=584&h=406&f=png&s=18745)

`bind` 改变了`this` 的指向，使变量 `vehicle` 指向局部变量 `car`。也就是说，`this` 的指向取决于 `car` 的上下文环境。

### 例3：

```javascript
var car = {
   cars: [
        { make: "Lamborghini", model: "Huracán" },
        { make: "Mclaren", model: "720s" },
        { make: "Ferrari", model: "Italia" }
    ],
    brand:"lamborghini",
    fullName: function () {
        this.cars.forEach(function(car){
            console.log(car.model + " " + this.brand);
        })
    }
}
car.fullName();

// Huracán undefined
// 720s undefined
// Italia undefined
```

在以上代码中，`fullName()` 使用 `forEach` 迭代数组 `cars`，每次迭代都产生一个没有上下文的匿名函数，这类定义在函数内部的函数，称之为闭包（`closure`）。闭包在 `JavaScript` 中非常重要，而且被广泛使用。

另一个重要的概念是作用域（`scope`）。定义在函数内部的变量不能访问其作用域以外的变量和属性；匿名函数中的 `this` 不能访问外部作用域，以至于 `this` 只能指向全局对象。该例中，全局对象中没有定义 `this` 所要访问的属性 `brand`，因此输出 `undefined`。

以上问题的解决方法是：我们可以在匿名函数外为 `this` 赋值，然后在函数内使用。

![](https://user-gold-cdn.xitu.io/2019/3/12/169726fe080eb47a?w=503&h=534&f=png&s=23026)

将 `this` 赋给变量 `self`，并代替函数体内的 `this`，输出期望结果。

### 例4：

```javascript
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function (cars) {
        cars.forEach(function (vehicle) {
            console.log(vehicle + " " + this.model);
        })
    }
}
car.fullName(['lambo', 'ferrari', 'porsche']);

// lambo undefined
// ferrari undefined
// porsche undefined
```

当无法使用 `this` 进行访问时，可以使用变量 `self` 来保存它（如例 3 ），但在该例中，也可以使用箭头函数来解决：

![](https://user-gold-cdn.xitu.io/2019/3/12/169727448e7b35bb?w=490&h=449&f=png&s=19967)

可以看出，在 `forEach()` 中使用箭头函数就可以解决该问题，而不是进行绑定或暂存 `this`。这是由于箭头函数绑定了上下文，`this` 实际上指向原始上下文或原始对象。

### 例5：

![](https://user-gold-cdn.xitu.io/2019/3/13/1697679e48118944?w=476&h=528&f=png&s=22964)

```javascript
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model);
    }
}
var truck = {
    make: "Tesla",
    model: "Truck",
    fullName: function (callback) {
        console.log(this.make + " " + this.model);
        callback();
    }
}
truck.fullName(car.fullName);

// Tesla Truck
// undefined undefined
```

上述代码中定义了两个相同的对象，但其中一个包含**回调函数**，回调函数将作为参数传入另一个函数，然后通过外部函数调用来完成某种操作。

该代码中对象 `truck` 的 `fullName` 方法包含一个回调函数，并在方法中直接进行调用。当将 `car.fullName` 作为参数调用 `truck.fullName()` 时，输出 `Tesla Truck` 和 `undefined undefined`。

结果出乎意料。实际上，`car.fullName` 只是作为参数传入，而不是由 `truck` 对象调用。换句话说，回调函数调用了对象 `car` 的方法，但却把 `this` 绑定到全局作用域上，如下图：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976e366be9873e?w=557&h=487&f=png&s=23725)

为便于观察，我们输出了 `this`。可以看到回调函数中的 `this` 指向了全局作用域。继续创建全局变量 `make` 和 `model` 如下例：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976e9a809bc5cc?w=574&h=504&f=png&s=24060)

显而易见，回调函数中的输出了全局变量 `make` 和 `model`，再次证明了 `this` 指向全局对象。

为得到期望结果，我们将使用 `bind()` 将 `car` 强制绑定到回调函数中。如下：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976f43e0105f59?w=570&h=506&f=png&s=24878)

## 完成！

毫无疑问，`this` 是非常有用的，但不容易理解。希望通过这篇文章你可以逐渐了解它的使用方法。

如果这篇文章对您有所帮助，点个赞👏，加个关注👣 吧~

![](https://user-gold-cdn.xitu.io/2019/3/12/1697250d1ec96b32?w=146&h=174&f=gif&s=746813)

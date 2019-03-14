
## [译] JavaScript 中 this 指南

![](https://user-gold-cdn.xitu.io/2019/3/12/16970fd072311e67?w=1200&h=800&f=jpeg&s=534672)

> 原文链接：[A guide to this in JavaScript](https://medium.freecodecamp.org/a-guide-to-this-in-javascript-e3b9daef4df1)  
> 原文作者：[Ashay Mandwarya](https://medium.freecodecamp.org/@ashaymurceilago)  
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd)   
> 推荐理由：`this` 一直是 `JavaScript` 中的重难点，借助这篇文章，重新认识并理解 `this`，加深印象。


`this` 无疑是 `JavaScript` 中使用最广泛但又容易被误解的一个关键字，今天我将会对其进行详细的解释。

当我们在学校学习英语代词时：

> Phelps is swimming fast because he wants to win the race.

这句话中，我们不直接使用 Phelps，而是使用代词“he”来指代他。类似地，`JavaScript` 中使用 `this` 关键字指向引用上下文中的对象，即 `subject`。

例：
``` javascript 
var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model); // Lamborghini Huracán
        console.log(car.make + " " + car.model); // Lamborghini Huracán
    }
}
car.fullName();
```

在上面的代码中，我们定义了一个具有属性 `make`，`model`  和 `fullNamecar` 的对象 `car`,其中 `fullName` 是一个函数，它使用 2 种不同的语法进行输出。

+ 使用 `this`：`this.make+” “ +this.model` 中的 ` this` 指的是在上下文中的对象，也就是 `car`，则 `this.make` 为 `car.make`，`this.model`  为 `car.model`；
+ 使用点表示法时，我们可以直接访问对象的属性 `car.make` 和 `car.model`。

## this
现在我们已经了解了什么是 `this` 以及它 最基本的用法，为了更方便记忆，以下我们将指定一些规则。

### this 关键字指向它所属的对象。

``` javascript 
var car = {
    make：'....' 
    func: () => { console.log（this.make） }
}
```

以上代码中，`this` 所属的对象是汽车。

### 根据用途，`this` 可分为以下几种情况

1. 在方法内使用
2. 在函数内使用
3. 单独存在
4. 在事件中使用
5. `call()` 和 `apply()`

**1. 在方法内使用 `this`**

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

该例中，`fullName()` 即为方法，方法中的 `this` 属于 `car`。

**2. 在函数内使用 `this`**

函数中的 `this` 有些复杂。首先要知道的是，与所有对象都具有属性一样，函数也具有属性。每当执行该函数时，它都会获取 `this` 属性，该属性是一个变量，其中包含调用它的对象的值。

> 这实际上只是“先行对象”的一种快捷引用。 — javascriptissexy.com

如果函数未被对象调用，则函数内的 `this`  属于全局对象，称为 `window`。在这种情况下，`this` 将指向全局作用域下定义的值。以下为一个更好理解的例子：

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

这里的 `make`, `model` 和 `fullName` 被定义在全局， 而对象 `car` 中也实现了 `fullName` 方法。当该方法被 `car` 调用时，`this` 指向对象内定义的属性；当被另外两种函数调用时，`this` 指向相同的全局属性并返回。

**3. 单独使用 `this`**

当单独使用 `this`，不依附于任何函数或者对象时，指向全局对象。


![](https://user-gold-cdn.xitu.io/2019/3/12/16971dd394abbe56?w=314&h=83&f=png&s=5935)

这里的 `this` 指向全局变量 `name`。

**4. 在事件内使用 `this`**

事件可以是任何类型，但为了简单和清晰起见，我们以点击事件为例。

![](https://user-gold-cdn.xitu.io/2019/3/12/16971def0c4c11b8?w=500&h=666&f=jpeg&s=80450)

每当单击一个按钮并引发一个事件时，它可以调用另一个函数来基于单击来执行某个任务。如果 `this` 在函数内使用，它将指向事件引发的元素。DOM 中的所有元素都以对象的形式储存，也就是说网页中的元素实际上就是 DOM 中的一个对象，因此当触发一个事件时，`this` 就会指向该元素。

例：
```html
<button onclick="this.style.display='none'">
  Remove Me!
</button>
```

**5. call(), apply() & bind()**

+ `bind`：允许我们在方法中设置 `this` 指向
+ `call`&`apply`：允许我们借助其他函数并在函数调用中改变 `this` 的指向。

有关 `call()`, `apply()` 和 `bind()` 的知识会在另一篇文章阐述。

## 最棘手的部分

如果理解得当，`this` 在某城中堵上会让工作更轻松，但在某些情况下会被误解。

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

// 运行结果：
// Lamborghini Huracán
```

所得结果不是我们期望的。分析其原因为：当我们使用 `this` 从另一个对象中借用了一个方法时，只是为 `anotherCar` 分配了该方法，但实际调用者是 `car`。因此返回的是 Lamborghini  而不是 Ferrari。

我们可以使用 `call()` 解决这个问题。


![](https://user-gold-cdn.xitu.io/2019/3/12/1697235457911793?w=459&h=508&f=png&s=21613)

该例中 `call()` 方法在 `anotherCar` 对象上调用了 `fullName()`，而该对象原本并没有 `fullName()` 函数。

另外，当我们输出 `car.name` 和 `anotherCar.name` 时，前者输出 `null`，而后者输出了 `Ferrari Italia`，也就是说，`fullName()` 函数确实被 `anotherCar` 调用而不是被 `car`。

### 例2：

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
vehicle()

// 运行结果：
// 报错
```

该例中，我们定义了一个全局对象 `cars`，并且在对象 `car` 中也定义了同名对象，接着将 `fullName()` 方法赋值给变量 `vehicle`，然后调用该变量。该变量属于全局对象，因此由于上下文，`this` 调用全局对象 `cars` 而不是全局对象。

我们可以使用 `bind()` 解决这个问题。

![](https://user-gold-cdn.xitu.io/2019/3/12/16972347a22f274d?w=584&h=406&f=png&s=18745)

`bind` 可以改变 `this` 的指向，因此变量 `vehicle` 将指向对象 `car` 而不是全局对象，也就是说，`this` 的指向取决于 `car` 的上下文。

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

// 运行结果：
// Huracán undefined
// 720s undefined
// Italia undefined
```

在以上代码中，`fullName()` 使用 `forEach` 对数组 `cars` 进行迭代，每次迭代都产生一个没有上下文的匿名函数，这类定义在函数内的函数被称为闭包（`closure`），在 `JavaScript` 中非常重要，而且被广泛使用。

另一个重要的概念是作用域（`scope`），函数内部的变量不能访问作用域外的变量和属性。匿名函数中的 `this` 不能访问外部 `this`，以至于 `this` 只能指向全局对象。在该例中，全局对象中没有定义 `this` 所要访问的属性，因此输出 `undefined`。

以上问题的解决方法是：我们可以在匿名函数外为 `this` 赋值，然后在函数内使用。

![](https://user-gold-cdn.xitu.io/2019/3/12/169726fe080eb47a?w=503&h=534&f=png&s=23026)

将 `this` 赋给变量 `self`，并代替函数体内的 `this`，输出期望结果。

### 例4：

![](https://user-gold-cdn.xitu.io/2019/3/12/1697272d30ed7b48?w=493&h=363&f=png&s=16605)

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
```

该例中无法访问 `this`，我们可以使用一个名为 `self` 的变量来保存它（如上例），但在该例中，也可以使用箭头函数来解决：

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
```

上述代码由两个相同的对象组成，但其中一个包含**回调函数**，回调函数将作为参数传递给另一个函数，然后通过外部函数调用来完成某种操作。

该代码中对象 `truck` 的 `fullName` 方法包含一个回调函数，同时调用了该函数。当使用 `car.fullName` 回调函数作为参数调用 `truck.fullName()` 时，输出 `Tesla Truck` 和 `undefined undefined`。

结果出乎意料，实际上，`car.fullName` 是作为参数传递的，而不是由 `truck` 对象调用。回调函数调用了对象 `car` 的方法，但值得注意的是，函数的实际调用位置是回调函数，其将 `this` 绑定到全局作用域上。

![](https://user-gold-cdn.xitu.io/2019/3/13/16976e366be9873e?w=557&h=487&f=png&s=23725)

为便于观察，我们输出 `this`。可以看到回调函数中的 `this` 指向全局作用域。因此我们继续创建全局变量 `make` 和 `model`。如下例：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976e9a809bc5cc?w=574&h=504&f=png&s=24060)

结果显而易见，回调函数中的输出了全局变量 `make` 和 `model`，证明 `this` 指向了全局对象。

为得到期望结果，我们将使用 `bind()` 将 `car` 强制绑定到回调函数中。如下图：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976f43e0105f59?w=570&h=506&f=png&s=24878)

## 完成！

毫无疑问，`th` 是非常有用的，但不容易理解。希望通过这篇文章你可以逐渐了解它的使用方法。

如果您喜欢这篇文章，点个赞👏，加个关注👣 吧~

![](https://user-gold-cdn.xitu.io/2019/3/12/1697250d1ec96b32?w=146&h=174&f=gif&s=746813)
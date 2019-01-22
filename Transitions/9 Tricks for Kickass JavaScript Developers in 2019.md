
![](https://user-gold-cdn.xitu.io/2019/1/21/1686da39092644ab?w=2560&h=1858&f=jpeg&s=578203 "Photo by Andrew Worley on Unsplash")

> 原文链接：[9 Tricks for Kickass JavaScript Developers in 2019](https://levelup.gitconnected.com/9-tricks-for-kickass-javascript-developers-in-2019-eb01dd3def2a)<br>
> 原文作者：[Lukas Gisder-Dubé](https://levelup.gitconnected.com/@gisderdube) <br>
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd) <br>
> 推荐理由：`JavaScript` 已经成为了当今使用最为广泛、最受欢迎的语言之一，掌握一些使用技巧不仅可以提高开发效率，更有利于思维转换。

---

过去的一年， `JavaScript` 在持续变化着，其使用范围也越来越广。接下来，我将针对 `JavaScript` 的使用，列出 9 条 建议，以帮助你写出更加整洁高效的代码，成为更好的开发者。


## 1. async/await

`JavaScript` 极速发展的今天，回调地狱所产生的问题已不复存在。实际开发过程中我们应当尽量避免使用回调函数，除非为了遵守代码库规则或是维护性能。而解决回调地狱的一个常用方法为 `Promise`，但在代码量较多时使用会适得其反。于是提出了 `async / await`，使代码结构更加清晰明了，便于阅读和维护。一般而言，可以 `await` 任何 `Promise` 以防止正使用的库的返回值为 `Promise` ，也就是说 `async/await` 是 `Promise` 的语法糖，而且使用方法也十分简单：在函数前加 `async`。下面是一个简单的例子：

``` javascript
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data
    console.log('data', data)
    return data
}
getData()
```

```!
注意:Note that await on the top level is not possible, you can only call an async function.
```

*`async/await` 是 ES2017 中引入的，请务必转换代码*


## 2. 异步控制流

当我们进行异步调用并获得返回值时，通常期望直接获取多个数据集，并且分别操作每个数据集。因此有了以下方式：

### for...of

假设页面上要展示 Pokemon 数据，可以通过 `axios` 获取它们的详细信息，我们所期望的是在得到返回值时立即更新页面中的所有数据，而不是等所有调用完成后才进行更新。

我们可以使用 `for...of` 解决上述问题。 首先循环遍历数组，并在每个循环内执行异步代码，当所有调用都成功时跳出循环。需要注意的是，这种方法虽然会对性能产生一些影响，但也不乏是一个很好的方法。

以下是一个例子：

``` javascript

import axios from 'axios'

let myData = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]

async function fetchData(dataSet) {
    for (entry of dataSet) {
        const result = await axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
        const newData = result.data
        updateData(newData)
        console.log(myData)
    }
}
function updateData(newData) {
    myData = myData.map(el => {
        if (el.id === newData.id) return newData
        return el
    })
}
fetchData(myData)

```

> 译者注：除了循环本身带来的性能问题之外，在使用 `async/await` 处理异步请求时也会对性能造成影响：如果使用过多 `await` 语句，而且候这些语句并不需要依赖于之前的语句，则会产生 `async/await` 地狱，影响性能。

> 可以直接将这些例子复制粘贴到编辑器中运行。


### Promise.all


如果想要并行获取所有的 Pokemon，我们可以使用 `Promise.all` 方法来 `await` 所有 `Promise`：

``` javascript

import axios from 'axios'
  
let myData = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
async function fetchData(dataSet) {
    const pokemonPromises = dataSet.map(entry => {
        return axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
    })
    const results = await Promise.all(pokemonPromises)
    results.forEach(result => {
        updateData(result.data)
    })
    console.log(myData)
}
function updateData(newData) {
    myData = myData.map(el => {
        if (el.id === newData.id) return newData
        return el
    })
}
fetchData(myData) 

```
*`for...of` 和 `Promise.all` 都是 `ES6+` 引入的，使用时请转换代码。*



## 3. 解构赋值 & 默认值


回到上个例子：

``` javascript
const result = axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
const data = result.data
```

现在有一种更简单的方法来实现它：通过解构赋值的方式从对象或数组中获取一个或多个值：

``` javascript
const { data } = await axios.get(...)
```

重命名变量：

``` javascript
const { data: newData } = await axios.get(...)
```

另一种方法是在解构赋值时指定默认值，这样做可以确保代码不会出现 `undefined`，也避免手动检查变量的麻烦。

``` javascript
const { id = 5 } = {}
console.log(id) // 5
```

这些方法也可以用于函数参数，例如：

``` javascript
function calculate({ operands = [1, 2], type = 'addition' } = {}) {
    return operands.reduce((acc, val) => {
        switch (type) {
            case 'addition':
                return acc + val
            case 'subtraction':
                return acc - val
            case 'multiplication':
                return acc * val
            case 'division':
                return acc / val
        }
    }, ['addition', 'subtraction'].includes(type) ? 0 : 1)
}
console.log(calculate()) // 3 
console.log(calculate({ type: 'division' })) // 0.5 
console.log(calculate({ operands: [2, 3, 4], type: 'multiplication' })) // 24 
```

*`ES6` 引入了解构赋值和默认值，使用时请转换代码。*


## 4. 真值和虚值

当我们使用默认值时，通常要对现有值进行一系列判断，这种方法使代码变得异常繁琐，而现在我们可以真值（`Truthy`）和虚值（`Falsy`）的方式来改进它，不仅可以节省代码量，还使人更加信服。

以下是之前的做法：

``` javascript
if (myBool === true) {
    console.log(...)
}
// OR
if (myString.length > 0) {
    console.log(...)
}
// OR
if (isNaN(myNumber)) {
    console.log(...)
}
```

简化后：

``` javascript
if (myBool) {
    console.log(...)
}
// OR
if (myString) {
    console.log(...)
}
// OR
if (!myNumber) {
    console.log(...)
}
```

以下为 `Falsy` 和 `Truthy` 的概念：

**Falsy**
+ 长度为0的字符串
+ 数字 `0`
+ `false`
+ `undefined`
+ `null`
+ `NaN`

**Truthy**
+ 空数组
+ 空对象
+ 其他

使用真值和虚值时没有确切的比较方式，这类似于我们进行比较时常使用双等号 `==` 而不是三等号 `===`。一般而言，这两者的判定方式相同，但在某些情况下也会遇到一些错误，对我来说主要为数字 `0`。

![](https://user-gold-cdn.xitu.io/2019/1/21/1686e6bb3db41fd0?w=800&h=534&f=jpeg&s=32973 "Photo by Philippe Leone on Unsplash")


## 5. 逻辑运算符和三元运算符

逻辑运算符和三元运算符主要用于精简代码，有助于保持代码整洁度，但当他们形成运算链时会显得杂乱。

### 逻辑运算符

逻辑运算符：和（`&&`）、或（`||`），一般用于比较两个表达式，返回值为： `true`、`false` 或着它的匹配值。如下例：

```javascript
console.log(true && true) // true
console.log(false && true) // false
console.log(true && false) // false
console.log(false && false) // false
console.log(true || true) // true
console.log(true || false) // true
console.log(false || true) // true
console.log(false || false) // false
```

我们可以将逻辑运算符与真值和虚值的相关知识结合起来。

如果有表达式 `A` 和 `B`，针对两种逻辑运算符，有以下规则：
+ `A && B` ： 当 `A` 为 `false` 时则直接返回 `A` 的值 ；否则返回 `B` 的值。
+ `A || B` ： 当 `A` 为 `true` 时则直接返回 `A` 的值 ；否则返回 `B` 的值。

> 译者注：上述规则为逻辑运算中的短路现象。

```javascript
console.log(0 && { a: 1 }) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true
```

### 三元运算符

三元运算符与逻辑运算符非常相似，但有由三个部分组成：

1. 条件表达式：其结果为真值或是虚值
2. 返回值 1：条件表达式为真值时，返回返回值 1
3. 返回值 2：条件表达式为虚值时，返回返回值 2

例如：

```javascript
 const lang = 'German'
console.log(lang === 'German' ? 'Hallo' : 'Hello') // Hallo
console.log(lang ? 'Ja' : 'Yes') // Ja
console.log(lang === 'French' ? 'Bon soir' : 'Good evening') // Good eveing
```

## 6. 自判断链接

当访问某个嵌套对象的属性时，由于不能确定目标对象或者属性性是否存在，而需要进行一系列判断：

```javascript
let data
if (myObj && myObj.firstProp && myObj.firstProp.secondProp && myObj.firstProp.secondProp.actualData)
    data = myObj.firstProp.secondProp.actualData
```

显而易见，代码变得非常臃肿难看。而自判断链接（`optional chaining`）的提出，正好可以满足对嵌套属性的校验需求，并使代码更加清晰整洁。如下例：

```javascript
const data = myObj?.firstProp?.secondProp?.actualData
```

> 译者注：自判断链接： 检查一个对象上面是否存在某属性。<br>
> 出现原因：调用某 `Object`属性链中的某个属性时，如果该属性不存在，会导致 `Cannot read property xxx of undefined` 错误。于是自判断链接 `?.` 出现。<br>
> 使用方式：`obj?.a?.b?.c`。依次对代码中的属性进行判断，如果为 `null` 或者 `undefined` 时，结束调用，返回 `undefined` 。

*目前，自判断链接还未纳入官方规范中，只处于第一阶段的实验特性。您需要在 `babelrc` 中添加 `@ babel / plugin-proposal-optional-chaining` 后方可使用它。*

## 7. 类属性 & 绑定

`JavaScript` 中经常会用到绑定（`bind`）。`ES6` 规范中箭头函数的引入，使 `JavaScript` 开发人员有了一种将函数自动绑定到执行上下文中的常用方法，同时这种方法非常重要。

由于 `JavaScript` 中的类方法有特定的调用方式，因此当我们首次声明一个类时不能使用箭头函数，因此需要在其他位置进行函数绑定，比如在构造函数中（以 `React.js` 为例）。工作当中我总是先定义类方法再对其进行绑定，这种方法非常繁琐且容易出错。但如果使用 `class` 语法，我们可以通过箭头函数自动绑定它。以下是绑定 `_increaseCount` 的例子：

``` javascript
 class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this._increaseCount}>Increase Count</button>
            </div>
        )
    }
    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }
} 
```

*目前，类属性还未纳入官方规范中，只处于第三阶段的实验特性。您需要在 `babelrc` 中添加 `@ babel / plugin-proposal-class-properties` 后方可使用。*


## 8. 使用 ParcelJS

作为前端开发人员，保证会有打包项目或着转换代码的需求，对此，webpack 已经在很久之前提出先关规范了。第一次使用 webpack v1.0 时，我花了很长时间进行配置，虽然最终运行成功，但整个过程非常痛苦，而且成功后的我变得畏手畏脚，生怕破坏之前的配置。直到几个月前，`ParcelJS` 的发现使我心情大好，在提供开箱即用功能的同时，它还实现了按需配置，也可以支持类似于 webpack 或 babel 的插件系统，最重要的是它的速度极快。

> 译者注：[ParcelJS](https://parceljs.org/)官网显示，parcelJS 的打包速度比 webpack 快 2 倍以上。

## 9. 封装自己的组件库

这是一个非常有趣的话题，关于它我有很多的想法。对于 `CSS`，很多人更倾向于使用类似于 BootStrap 这样的组件库。而对于 `JavaScript`，仍然有人调用 `jQuery` 或者其他库来实现验证、滑块等功能。首先不否认使用各种库的好处，但还是强烈建议可以亲手实现这些功能，而不是盲目地安装 npm 包。当整个团队正构建一个类似于 [moment.js](https://momentjs.com/) 或 [react-datepicker](https://reactdatepicker.com/) 的大型库（甚至框架）时，你没必要亲手实现它，但可以封装为属于自己的组件库，而且在实现组件库的同时，您可以：

1. 准确掌握代码的结构以及运行机制
2. **真正**理解编程及其工作原理
3. 防止代码库变得臃肿

直接使用 npm 包是当然非常容易，但如果想要实现某些 npm 包中不具备的功能时则会需要更多的时间：如果软件没有按预期正常工作，或者要将其转换为另一个软件包，您将会花费更多时间来了解其 API 的配置方式。因此，您可以为自己量身定做一套数据自己的组件库。

---

*关于作者：Lukas Gisder-Dubé 组件并领导了一家初创公司，并任职 CTO 一年半，建立了技术团队。 离开创业公司后，在 [Ironhack](https://medium.com/@ironhack) 担任首席讲师。如今在柏林正建立一家创业咨询公司。查看 [dube.io](https://dube.io/) 以了解更多信息。*


![](https://user-gold-cdn.xitu.io/2019/1/22/16874954279b7f74?w=200&h=196&f=png&s=16770)

---

## 参考文章：

1. [怎样处理async/await浪费性能问题](http://www.php.cn/js-tutorial-399247.html)
2. [Async/Await 优于 Promise 的 6 个理由](https://www.oschina.net/translate/6-reasons-why-javascripts-async-await-blows-promises-away?cmp)
3. [MDN - Falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)
4. [MDN - Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
5. [Optional Chaining for JavaScript](https://github.com/tc39/proposal-optional-chaining)

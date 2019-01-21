

# [译] 优秀 JavaScript 开发人员应掌握的9个技巧


![](https://user-gold-cdn.xitu.io/2019/1/21/1686da39092644ab?w=2560&h=1858&f=jpeg&s=578203 "Photo by Andrew Worley on Unsplash")

> 原文链接：[9 Tricks for Kickass JavaScript Developers in 2019](https://levelup.gitconnected.com/9-tricks-for-kickass-javascript-developers-in-2019-eb01dd3def2a)<br>
> 原文作者：[Lukas Gisder-Dubé](https://levelup.gitconnected.com/@gisderdube) <br>
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd) <br>
> 推荐理由：`JavaScript` 已经成为了当今使用最为广泛、最受欢迎的语言之一，掌握一些使用技巧不仅可以提高开发效率，更有利于转换思维。


过去的一年， `JavaScript` 在持续变化着，其使用范围也越来越广。接下来，我将针对 `JavaScript` 的使用，列出 9 条 建议，以帮助你写出更加整洁高效的代码的同时，使你成为更好的开发者。


## 1. async/await

If you’re still stuck in callback hell, 2014 wants its code back. 在开发的过程中，我们应当尽量避免使用回调函数，除非为了遵守代码库规则或是维护性能。`Promise` 是解决回调地狱的一个很好的选择，但如果代码量较多时则会适得其反。因此解决回调地狱的首选方案变为 `async / await`，它可以使你的代码结构更清晰明了，便于之后的阅读和维护。事实上，在 `JavaScript` 中可以 `await` 任何 `Promise`，防止正在使用的库返回 `Promise` 。因此，`async/await` 可以说是 `Promise` 的语法糖。而它的使用方法也很简单：只需要在函数前加 `async`就可以了。下面是一个简单的例子：

``` javascript
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data
    console.log('data', data)
    return data
}
getData()
```
**注意：**
```!
**注意：**: ~~so make sure to transpile your code.~~
```

*`async/await` 是 ES2017 中引入的，因此请务必进行代码转换*

## 2. 异步控制流

通常，在所有异步调用返回值之后，有必要获取多个数据集，同时对于每个数据集，需要执行某些操作以完成任务。



**for...of**

假设页面上需要展示几个有关 Pokemon 的数据，我们想要通过 `axios` 获取它们的详细信息，并且希望在得到返回值时马上更新页面中所有数据集，而不是等待所有调用完成才更新，尤其是我们不知道有多少个调用。因此，我们可以使用 `for...of` 循环遍历数组，并在每个循环块内执行异步代码，当每次调用都成功时停止执行。值得注意的是，这个方法会出现一些性能瓶颈，但是依旧是一个很有用的方法。

> 译者注：当使用`async/await`处理异步请求时，人们总是使用很多 `await` 语句，但很多时候这些语句并不需要依赖于之前的语句，因此引起了 `async/await` 地狱，影响性能。

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
> 这些示例是可以运行的，您可以将它们复制并粘贴到您的编辑器中


**Promise.all**

如果您想并行获取所有的 Pokemon 怎么办？只需使用 `Promise.all` ，就可以 `await` 所有 `Promise`：

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
*`for...of` 和 `Promise.all` 都是 `ES6+` 引入的，因此请务必进行代码转换。*


## 3. 解构赋值 & 默认值


我们回到上一个示例：

``` javascript
const result = axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
const data = result.data

```

有一种更简单的方法实现上例：使用解构赋值，从对象或数组中获取一个或多个值：

``` javascript
const { data } = await axios.get(...)
```

您还可以重命名变量：

``` javascript
const { data: newData } = await axios.get(...)
```

另一种方法是在解构赋值时指定默认值，可以确保代码永远不会出现未定义，同时也不必手动检查变量。

``` javascript
const { id = 5 } = {}
console.log(id) // 5
```

这些方法也可以与函数参数同时使用，例如：

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

*`ES6` 引入了解构赋值和默认值，因此请务必进行代码转换。*


## 4. Truthy & falsy values

当我们使用默认值时，通常需要对现有值进行判断，但这种方法将被抛弃，取而代之的是使用 Truthy & falsy values。这种方法改进了代码，并节省了一些操作指令，使其更具说服力。之前我们经常这样做：

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

现在，以上代码可以简化为：

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

以下给出truthy and falsy values 的概念，帮助您更好地理解这种写法的好处：

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

需要注意的是，使用 truthy / falsy值 时没有确切的比较方式，类似于我们使用双等号 `==` 进行比较，而不是使用三等号 `===`。一般而言，他们的比较方式是相同的，但在某些情况下却会遇到错误，对于我来说发生错误的情况多为数字 `0`。

![](https://user-gold-cdn.xitu.io/2019/1/21/1686e6bb3db41fd0?w=800&h=534&f=jpeg&s=32973 "Photo by Philippe Leone on Unsplash")


## 5. 逻辑运算符和三元运算符

逻辑运算符和三元运算符主要用于缩短代码，节省代码行数的情况下，有助于保持代码整洁度，但有时会显得杂乱，尤其是当他们形成链式运算时。

**逻辑运算符**

逻辑运算符一般用于比较两个表达式，返回 `true`.`false` 或者其匹配值，分别为：`&&` 表示“和”，`||` 表示“或”。如下例：

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

我们可以将逻辑运算符与上文所述的truthy and falsy values相关知识结合起来。

如果有表达式 `A` 和 `B`，针对两种逻辑运算符，有以下规则：
+ `A && B` ： 当 `A` 为 `false` 时则直接返回 `A` 的值 ；否则返回 `B` 的值。
+ `A || B` ： 当 `A` 为 `true` 时则直接返回 `A` 的值 ；否则返回 `B` 的值。

> 译者注：上述为逻辑运算中的短路特性。

```javascript
console.log(0 && { a: 1 }) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true

```

**三元运算符**
三元运算符与逻辑运算符非常相似，但有三个部分：

1. 条件表达式：结果为 `true` 或者 `false` 
2. 返回值 1：如果条件表达式为 `true` 时返回
3. 返回值 2：如果条件表达式为 `false` 时返回

例如：

```javascript
 const lang = 'German'
console.log(lang === 'German' ? 'Hallo' : 'Hello') // Hallo
console.log(lang ? 'Ja' : 'Yes') // Ja
console.log(lang === 'French' ? 'Bon soir' : 'Good evening') // Good eveing
```


## 6.自判断链接

您是否遇到过当访问某嵌套对象的属性时，由于不知道该对象或其子属性是否存在，而需要进行一系列判断：

```javascript
let data
if (myObj && myObj.firstProp && myObj.firstProp.secondProp && myObj.firstProp.secondProp.actualData)
    data = myObj.firstProp.secondProp.actualData
```

这样做的话，是你的代码显的非常臃肿难看，现有一种更好的方法来实现上述需求：自判断链接。其使用方法如下：

```javascript
const data = myObj?.firstProp?.secondProp?.actualData
```

我认为这是一种检查嵌套属性并能够使代码更清晰整洁的方式。

> 译者注：自判断链接： 检查一个对象上面是否存在某属性。<br>
> 出现原因：调用某 `Object`属性链中的某个属性时，如果该属性不存在，会导致 `Cannot read property xxx of undefined` 错误。于是自判断链接 `?.` 出现。<br>
> 使用方式：`obj?.a?.b?.c`。依次对代码中的属性进行判断，如果为 `null` 或者 `undefined` 时，结束调用，返回 `undefined` 。

*目前，自判断链接还未纳入官方规范中，只处于第一阶段的实验特性。您需要在 `babelrc` 中添加 `@ babel / plugin-proposal-optional-chaining` 后方可使用它。*

## 7.类属性和类绑定

`JavaScript` 中经常需要用到绑定（`bind`）。`ES6` 规范中箭头函数的引入，使 `JavaScript` 开发人员有了一种常用的可以自动将函数绑定到执行上下文中的方法，而且这种方法也是非常重要的。
由于必须以特定的方式进行类的声明，因此，当一个类首次被引入时不能使用箭头函数，而且需要在其他地方进行函数绑定，比如构造函数（以 `React.js` 为例）。工作时，我总是先定义类方法，然后在进行绑定，这种方法非常繁琐且容易出错。在使用 `class` 语法时，我们可以通过箭头函数的方式对其进行自动绑定。以下是绑定_increaseCount的示例：

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


## 8.使用 ParcelJS（译者注：原文为 parcel）

作为前端开发人员，保证会打包项目或转换代码。之前我们已经使用 webpack 很长一段时间了。当第一次使用 webpack v1.0 时，为了使它成功运行，我花了很长时间进行相应的配置，整个过程非常痛苦。而且，当我配置成功后，便不敢对它进行操作以免破坏任何东西。直到几个月前，[ParcelJS](https://parceljs.org/)的发现使我心情大好，在提供开箱即用功能的同时，它还实现了按需配置，也可以支持类似于 webpack 或 babel 的插件系统，最重要的是它的速度极快。

> 译者注：ParcelJS 官网显示，parcelJS 的打包速度比 webpack 快 2 倍以上。

## 9.封装自己的组件库

这是一个非常有趣的话题，关于它我有很多的想法。对于 `CSS`，很多人更倾向于使用类似于 BootStrap 这样的组件库。而对于 `JavaScript`，我仍然看到人们通过调用 `jQuery` 或者小型库来实现验证、滑块等功能。不否认使用各种库的意义，但我还是强烈建议您亲手实现这些功能，而不是盲目地安装 npm 软件包。当整个团队正构建一个类似于[moment.js](https://momentjs.com/)或[react-datepicker](https://reactdatepicker.com/)的大型库（甚至框架）时，其实没必要亲自实现。但是，您可以封装属于自己的组件库，而且在实现组件库的同时，您可以：

1. 准确得知代码的结构以及运行机制
2. **真正理解**编程及其工作原理
3. 防止代码库变得臃肿

直接使用 npm 包是当然非常容易，但如果要实现某些 npm 包中不具备的功能时则会需要更多的时间：如果软件没有按预期正常工作，或者要将其转换为另一个软件包，您将会花费更多时间来了解其 API 的配置方式。因此，您可以为自己量身定做一套数据自己的组件库。

---

*关于作者：Lukas Gisder-Dubé 组件并领导了一家初创公司，并任职 CTO 一年半，建立了技术团队。 离开创业公司后，在 [Ironhack](https://medium.com/@ironhack) 担任首席讲师。如今在柏林正建立一家创业咨询公司。查看 [dube.io](https://dube.io/) 以了解更多信息。*


## 参考文章：

1. [怎样处理async/await浪费性能问题](http://www.php.cn/js-tutorial-399247.html)
2. [Async/Await 优于 Promise 的 6 个理由](https://www.oschina.net/translate/6-reasons-why-javascripts-async-await-blows-promises-away?cmp)
3. [Truthy and Falsy: When All is Not Equal in JavaScript](https://www.sitepoint.com/javascript-truthy-falsy/)
4. [Optional Chaining for JavaScript](https://github.com/tc39/proposal-optional-chaining)

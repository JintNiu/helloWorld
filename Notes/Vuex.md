

## Vuex

状态管理器，用于优化 `vue` 中组件通信。

> 采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### Vuex 使用

安装：
``` javascript
npm install vuex --save
```
 `main.js` 中：
```javascript
import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{},
    getters:{},
    actions:{},
    mutations:{}
})
```

实例化 `vue` 使挂载 `store` 对象：

``` javascript
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
```


### Vuex 核心

![vuex核心](https://vuex.vuejs.org/vuex.png)

+ `module`:模块。分离 `store`。
+ `state`：单一状态树。保存公共状态。类似于 `data`。
+ `getters`：计算属性。缓存他的依赖，有且只有依赖发生变化时才被重新计算。类似于 `computed`。
+ `mutations`：`commit mutations` 用于更改 `state`。类似于 `methods`。**必须同步执行**
+ `actions`：`dispatch action` 用于分发 `mutations`，不直接变更 `state`.**可以异步**
+ `mapState`、`mapGetters`、`mapActions`：简化调用方法。


### module

之前会将 `stroe` 写在 `main.js` 中，但当项目较大时，`stroe` 会变的非常臃肿，不利于维护。因此，可以将 `store` 分成 `module` ，每个 `module` 拥有自己的 `state`、`mutation`、`action`、`getter`和子模块。

1. 新建 `store\index.js`。
   ```javascript
    import Vue from 'vue'
    import vuex from 'vuex'
    import aModule from '../modules/aModule.js';//引入某个store对象
    import aModule from '../modules/bModule.js';//引入某个store对象
    Vue.use(vuex);

    export default new vuex.Store({
        state:{},
        modules: {
          aModule,
          bModule
        }
    })
   ```
2. `main.js` 中：
   ```javascript
    import store from './store'

    new Vue({
      el: '#app',
      router,
      store,//使用store
      template: '<App/>',
      components: { App }
    })
   ```
3. 单个 `modules`：
   ```javascript
    const state = {}
    const getters = {}
    const actions = {}
    const mutations = {}
    export default {
      namespaced: true,// 命名空间
      state,
      getters,
      actions,
      mutations
    }
   ```

### 命名空间 `namespaced: true`：

使每个 `module` 都有各自的作用域，避免模块混乱造成污染。`state`、`mutation`、`action`、`getter` 会自动根据模块注册的路径调整命名。

调用全局属性：
```javascript
  actions:{
    someGetter (state, getters, rootState, rootGetters) {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    },
    dispatch('someOtherAction') // -> 'foo/someOtherAction'
    dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

    commit('someMutation') // -> 'foo/someMutation'
    commit('someMutation', null, { root: true }) // -> 'someMutation'
  }
```

命名空间内注册全局 `action`：
```javascript
  modules: {
    foo: {
      namespaced: true,

      actions: {
        //root: true，并将这个 action 的定义放在函数 handler 中。
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
```

带命名空间的绑定函数:

```javascript
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数:

```javascript
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

### State

定义：

```javascript
const state = {
  count: 0,
}
```

调用用：

```javascript
// store中
store.state.count

//组件中调用：
this.$store.state.count
```

### MapState

生成计算属性。返回对象。

```javascript
computed: {
  ...mapState({
    checkoutStatus: state => state.cart.checkoutStatus
  }),
},
```

### Getters

`getters` 和 `vue` 中的 `computed` 类似 , 都是用来计算 `state` 然后生成新的数据 ( 状态 ) 的。

参数：`state`,`getters`,`rootState`。

```javascript
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}
```

使用：

```javascript
// store中
store.getters.cartProducts

//组件中调用：
this.$store.getters.cartProducts
```

### MapGetters

```javascript
computed: {
  ...mapGetters('cart', {
    products: 'cartProducts',
    total: 'cartTotalPrice'
  }),
  // ...mapGetters({
  //   products: 'cart/cartProducts',
  //   total: 'cart/cartTotalPrice'
  // })
},
```

相当于：

```javascript
computed: {
    checkoutStatus(){
      return this.$store.state.cart.checkoutStatus
    },
    products() {
      return this.$store.getters['cart/cartProducts']
    },
    total() {
      return this.$store.getters['cart/cartTotalPrice']
    }
  },
```

### Mutations

更改 `state` 中的状态。类似于 `methods`，但不适合**异步操作**。

参数：`state `,`payload`(荷载。额外参数,大多数情况下为对象的形式)

```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

提交：
```javascript
// store中
store.commit('increment', {
  amount: 10
})
// 对象风格提交
store.commit({
  type: 'increment',
  amount: 10
})

// 组件中提交：
this.$store.commit('increment')

```

使用**常量**替代 Mutation 事件类

> 使用常量替代 `mutation` 事件类型在各种 `Flux` 实现中是很常见的模式。这样可以使 `linter` 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 `app` 包含的 `mutation` 一目了然：

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```javascript
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

###  MapMutations

```javascript
 methods: {
  ...mapMutations([
     // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    'increment',

    // 载荷：
    // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    'incrementBy' 
  ]),

  // 重命名
  ...mapMutations({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
  })
```

### Actions

类似于 `mutation`，但
+ `Action` 提交的是 `mutation`，而不是直接变更状态。
+ `Action` 可以包含任意异步操作。

参数：`store `(可解构赋值：`{ state, commit }`),`payload`

```javascript
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

```javascript
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

//组件中分发
this.$store.dispatch('incrementAsync')
```


### MapActions

```javascript
methods: mapActions('cart', [
  'addProductToCart'
]),  
```


```javascript
methods: {
  addProductToCart(product){
    this.$store.dispatch('cart/addProductToCart', product)
  }
},
```



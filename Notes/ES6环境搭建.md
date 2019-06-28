## ES6环境搭建

### node 配置 

> [菜鸟教程 - node](https://www.runoob.com/nodejs/nodejs-install-setup.html)

### 新建工程

新建文件夹，并在该文件夹下新建两个文件夹：
+ **src**：写 es6 代码。
+ **dist**：利用 `Babel` 编译成的 ES5 代码的文件夹，在 HTML 页面需要引入的时这里的 `js` 文件。

#### index.html

根目录下新建文件：index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- 将es6代码转码后引入 -->
        <script src="./dist/index.js"></script>
    </head>
    <body>
        Hello ECMA Script 6
    </body>
</html>
```


#### index.js

```javascript
let a=1;
console.log(a);
```

项目创建完成。

### 搭建 es6 项目

#### 初始化项目

打开 cmd（vscode快捷键：shift+~。‘~’在 Tab 上面），然后输入命令。其中 `-y` 表示默认同意所有配置。

```javascript
npm init -y
```

执行完之后会在根目录生成 package.json 文件。

### 配置淘宝 npm 镜像

由于使用 npm 安装依赖包时要从国外服务器下载，速度很慢且容易出错，因此淘宝团队出了个 npm 镜像----cnpm。

**方法一：**

1. 下载
+ 临时使用：
   ```
   npm --registry https://registry.npm.taobao.org install express
   ```
+ 长期使用：
   ```
   npm config set registry https://registry.npm.taobao.org
   ```

2. 检查：
```
npm config get registry
或
npm info express
```

**方法二：**

1. 安装
   
   ```
   npm install -g cnpm --registry=https://registry.npm.taobao.org
   ```

2. 配置环境变量
   >　因为cnpm会被安装到D:\Program Files\nodejs\node_global下，而系统变量path并未包含该路径。在系统变量path下添加该路径即可正常使用cnpm;如下图配置

3. 检查
  ```
  cnpm -v
  ```

> 注：我电脑环境有点乱，所以我用的第一种成功了，没有试第二种。

#### 安装插件

1.  Babel-cli

```
cnpm install -g babel-cli
```

2. 本地安装 Babel-preset-es2015,babel-cli

```
cnpm install --save-dev babel-preset-es2015 babel-cli
```

安装完后，package.json 中会出现：

```javascript
"devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1"
  }
```

#### 新建 .babelrc

根目录新建 .babelrc 文件，存放有关 babel 的配置：

```javascript
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}
```

#### es6 转 es5

```javascript
babel src/index.js -o dist/index.js
```

转换后的代码：

```javascript
"use strict";

var a = 1;
console.log(a);

```

以上，就完成了 es6 转 es5 的相关配置，但是问了简便，现修改 package.json 中 `script` 配置：

```javascript
"scripts": {
    "build": "babel src/index.js -o dist/index.js"
  },
```

之后就可以使用 `npm run build` 进行转码了。


> 还有个 `live-server` 工具，按 `ctrl+s` 时就可以自动转码。

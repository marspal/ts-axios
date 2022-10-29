# ts-axios

`简介:` ts 重构 axios, 更深入的了解 XMLHttpRequest

> 使用

```
  npm i ts-axios-xmq
```

## table of content

> 主要实现功能

- 项目脚手架
- 基础功能实现
- 异常情况处理
- api 扩展
- 拦截器实现
- 配置化实现
- 取消功能实现
- 更多功能

> 学到的知识点？

- 脚手架搭建?
- Promise 链式调用?
- 拦截器的设计与使用?
- 测试如何使用?
- 打包发布?

> 主要的 npm 包

- Jest 测试
- Commitizen
- Rollup js 打包构建
- TSLint 代码风格一致性
- Prettier 美化项目
- Semantic release 版本发布
- typeDoc 生成项目文档

> Features

- 在浏览器使用 XMLHttpRequest 对象通讯
- 支持 Promise Api
- 支持请求和相应拦截器
- 支持请求数据和响应数据的转换
- 支持请求取消
- JSON 数据制动转换
- 客户端防止 XSRF

> 相关的基础知识

### 脚手架创建：

脚手架采用现成的 typescript-library-starter;

> usage

```
git clone https://github.com/alexjoverm/typescript-library-starter.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

> 创建入口文件，types 文件简单实现 xhr 发送功能

> 创建 demo 运行环境的包（example）

> 重点包学习, 使用时需要阅读更多的配置文件

- webpack-dev-middleware:
  注意: This should be used for development only
  benefits:

1. No files are written to disk, rather it handles files in memory;
2. If files changed in watch mode, the middleware delays requests until compiling has completed.
3. Supports hot module reload:
   Webpack hot reloading using only webpack-dev-middleware. This allows you to add hot reloading into an existing server without webpack-dev-server.

```js
// 使用 注意: 在webpack配置文件中 output: publicPath 也使用相同的
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true, // Tells stats whether to output in the different colors.
      chunks: false
    }
  })
)
```

- webpack-hot-middleware

### 打包部署

### 基础知识

> ts 相关

1. 类型保护机制

```ts
function isFish(pet: Bird | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

2. 类型断言

```ts
// sn！ !类型断言 非空
function f(sn: string | null): string {
  return sn! || 'default'
}
```

3. null, undefined

null、undefined 可以是类型 可以是值; null 不能赋值给 number、string

> git 相关

1. 创建工程并关联到远程分支

- 查看远程分支: git remote -v
- 关联远程分支: git remote add origin git@url
- 拉取远程分支: git pull origin master
- git branch: 查看当前分支
- git add
- npm run commit: 调用 commitizen

### 请求模块单元测试

请求模块 axios 最基础的模块，通过 axios 方法发送 ajax 请求

#### jasmine-ajax

jasmine 是一个 BDD(行为驱动开发)的测试框架, 插件有: jasmine-ajax jasmine-ajax 依赖于 jasmine-core @types/jasmine-ajax

# ts-axios

``简介:`` ts重构axios, 更深入的了解XMLHttpRequest

## table of content

> 主要实现功能

- 项目脚手架
- 基础功能实现
- 异常情况处理
- api扩展
- 拦截器实现
- 配置化实现
- 取消功能实现
- 更多功能
- 打包部署实现

> 主要的 npm 包

- Jest 测试
- Commitizen
- Rollup js打包构建
- TSLint 代码风格一致性
- Prettier 美化项目
- Semantic release 版本发布
- typeDoc 生成项目文档

> Features

- 在浏览器使用XMLHttpRequest对象通讯
- 支持Promise Api 
- 支持请求和相应拦截器
- 支持请求数据和响应数据的转换
- 支持请求取消
- JSON数据制动转换
- 客户端防止XSRF

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

### 基础知识

> ts相关

1. 类型保护机制

```ts
  function isFish(pet: Bird | Fish): pet is Fish {
    return (pet as Fish).swim !== undefined
  }
```

2. 类型断言

``` ts
 // sn！ !类型断言 非空
 function f(sn: string | null): string{
   return sn! || 'default';
 }
```

3. null, undefined 

null、undefined 可以是类型 可以是值; null不能赋值给number、string


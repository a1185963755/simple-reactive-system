# 简易Vue响应式系统实现

这个项目旨在实现一个简单的Vue响应式系统，帮助深入理解Vue的响应式原理。通过手写实现，我们将学习Vue是如何追踪数据变化并触发相应更新的。

## 项目目标

实现Vue响应式系统的核心功能：

1. 数据劫持（Data Hijacking）
   - 使用Proxy实现对数据的劫持
   - 监听数据的读取和修改操作

2. 依赖收集（Dependency Collection）
   - 收集数据属性和使用该数据的依赖关系
   - 建立响应式数据与副作用函数的映射关系

3. 派发更新（Dispatch Updates）
   - 当数据变化时自动触发相关的副作用函数
   - 实现最小化更新，避免不必要的计算

## 技术栈

- JavaScript：使用原生JavaScript实现响应式系统
- Jest：单元测试框架，确保功能的正确性

## 项目结构

```
src/
  ├── reactive.js     # 响应式核心实现
  ├── effect.js      # 副作用函数收集与触发
  ├── dep.js         # 依赖管理
  └── index.js       # 入口文件
```

## 使用方法

1. 安装依赖：
```bash
npm install
```

2. 开发模式：
```bash
npm run dev
```

3. 运行测试：
```bash
npm test
```

## 实现思路

1. 通过Proxy创建响应式对象，拦截数据的get/set操作
2. 在get操作时收集依赖（track），建立数据属性与副作用函数的对应关系
3. 在set操作时触发依赖（trigger），执行相关的副作用函数
4. 使用WeakMap、Map和Set数据结构来管理依赖关系

## 许可证

MIT
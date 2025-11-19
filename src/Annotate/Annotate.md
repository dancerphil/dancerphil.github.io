数据标注的模版是否可以图灵完备？也就是说，想要什么标注方式完全自定义。

可以，用 `@codesandbox/sandpack-react` 可以实现，也就是现在的 demo。

TODO

1. 仅 Component 支持自定义，然后通过 postMessage 来通信
2. 迁移到 trade 那个库，支持存数据和分发
3. 支持远程的 Component 文件，比如 github，半自动刷新


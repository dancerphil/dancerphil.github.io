# async await 代码风格指南

_如何用最合理的方式书写 async await 代码_

> BY 张聪([dancerphil@github](https://github.com/dancerphil/trick/))
>
> 除非另行注明，页面上所有内容采用[MIT](#license)协议共享

## async 函数的特性

```
> const asyncFunction = async () => {};

> typeof asyncFunction
< 'function'

> asyncFunction.constructor.name
< "AsyncFunction"
```

## no-return-promise

如果你可以直接返回一个值，你不需要把它包在 Promise.resolve 里，async 函数本身就帮你做了

```javascript
// bad
const foo = async () => Promise.resolve(0);

// good
const foo = async () => 0;
```

## no-return-await

你不应该 return await promise，await 应该在 asyncFunction 函数的外侧。参见 [eslint](http://eslint.cn/docs/rules/no-return-await)

```javascript
// bad
const foo = async () => {
  return await bar();
}

// still bad
const foo = async () => {
  const result = await bar();
  return result;
}

// good
const foo = async () => {
  return bar();
}

// good
const foo = async () => {
  try {
    return await bar();
  } catch (error) {}
}
```

由于 async 函数包了 Promise.resolve，下面两个写法的实际表现相同的：

```javascript
const foo = async () => {
  const result = await bar();
  return result;
}

const foo = async () => {
  const result = await bar();
  return Promise.resolve(result);
}
```

return await 事实上不会做任何事情，并且推迟了函数的返回时间，使这个函数有性能的风险。同时，等待 await 的值重新包装 Promise.resolve 也是完全不需要的操作。

## await-promise

并不一定要 `await asyncFunction()` 可以直接 `await promise`，这样你可以控制发起 promise 的时间，注意以下代码的不同

```javascript
// 1. wait for 3000 ms
console.log(await delay(1000));
console.log(await delay(2000));

// 2. wait for 2000 ms
const foo = delay(1000);
const bar = delay(2000);
console.log(await foo); // after 1000 ms
console.log(await bar); // after 2000 ms

// 3. wait for 2000 ms
const foo = delay(1000);
const bar = delay(2000);
console.log(await bar); // after 2000 ms
console.log(await foo); // after 2000 ms

// 4. wait for 2000 ms
Promise.all([delay(1000), delay(2000)]).then(([a, b]) => {
  console.log(a);
  console.log(b);
});
```

对于上述 2、3，由于现实中难以确定 promise 的顺序，很少会这样写

## Reference

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

tc39: https://github.com/tc39/ecmascript-asyncawait

# Front-end Code Challenge - React

## Questions
### Explain the difference between a var, a let, and a const.

The main difference is the scope that the variables receives, being `var` more _permisisve_ , while `let` and `const` has a strict _block scope_ and the difference between `let` and `const` relies in that the `let` variables can be reassigned another value, while the const is a value that will not change through the execution of the code.

### What are the differences between declaring a function with the keyword function against creating it with an arrow function?

Once again the answer is in the scope that `this` keyword will have, when using the keyword `function` then `this` will be bind to the function context and will not have access to the outer variables. while if we use the `arrow` function approarch then the `this` keyword will have access to its parent variables.

### How would you turn a method with a callback argument into a promise?

```javascript
const fnCallback = (fn) => {
   const info = ""
   ...
   fn(info);
};
```

###### Answer

```javascript
const fnCallback = async fn => {
    const info = 'test';
    Promise.resolve(fn(info));
}
```
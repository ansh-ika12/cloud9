# JavaScript Basics

## Variables
JavaScript has three ways to declare variables: var, let, and const. Use const by default, let when the value needs to change, and avoid var because it has function scope which causes confusion.

## Asynchronous Programming
JavaScript is single-threaded and uses an event loop. Async operations are handled with callbacks, Promises, and async/await. async/await is the modern and preferred approach.

Common mistake: forgetting the await keyword inside an async function causes the code to work with a Promise object instead of the actual value.
Common mistake: using forEach with async/await does not wait for each iteration. Use a for...of loop instead.

## Arrow Functions
Arrow functions are a shorter syntax for writing functions. They do not have their own this context, which is important when working with objects and classes.

## Type Coercion
JavaScript performs automatic type conversion in comparisons. Use === (strict equality) instead of == (loose equality) to avoid unexpected results. For example, 0 == "" is true but 0 === "" is false.

## Common Errors
ReferenceError means you used a variable that was not declared.
TypeError means you performed an operation on the wrong data type, like calling .map() on undefined.
SyntaxError means there is a structural mistake in your code, like a missing bracket.
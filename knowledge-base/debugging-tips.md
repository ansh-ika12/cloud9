# Debugging Tips for Beginners

## Read the Error Message
The error message tells you what went wrong and which line it happened on. Always start by reading it carefully. The last line of a traceback in Python shows the actual error. In JavaScript, the browser console shows the error type, message, and stack trace.

## Common Debugging Strategy
1. Reproduce the bug consistently.
2. Isolate the problem by commenting out code sections.
3. Add print statements or console.log to check variable values at each step.
4. Check your assumptions. The variable might not contain what you think it does.
5. Compare what you expect to happen versus what actually happens.

## Rubber Duck Debugging
Explain your code line by line to someone or something (even a rubber duck). The act of explaining often reveals the bug because it forces you to think through your logic carefully.

## Off-By-One Errors
These happen when your loop runs one time too many or one time too few. Common causes include using <= instead of < in loop conditions, or starting an index at 1 instead of 0.

## Null and Undefined Errors
In JavaScript, TypeError: Cannot read property of undefined means you are trying to access a property on something that does not exist. Check if the variable is defined and not null before accessing its properties.

In Python, AttributeError: NoneType object has no attribute means a function returned None when you expected a value. Check the return statement of the function.
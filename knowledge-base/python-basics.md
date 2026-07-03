# Python Basics

## Variables and Data Types
Python is a dynamically typed language. You do not need to declare variable types explicitly. Common data types include int, float, str, bool, list, tuple, dict, and set.

Example:
name = "Alice"
age = 25
is_student = True
grades = [90, 85, 92]

## Loops
Python supports for loops and while loops. A for loop iterates over a sequence like a list or range. A while loop continues as long as a condition is true.

Common mistake: forgetting the colon at the end of the loop statement.
Common mistake: modifying a list while iterating over it causes unexpected behavior.

## Functions
Functions are defined using the def keyword. They can accept parameters and return values. If no return statement is provided, the function returns None.

Common mistake: mutable default arguments like def add(item, lst=[]) cause bugs because the list is shared across calls.

## Indentation
Python uses indentation to define code blocks instead of curly braces. Mixing tabs and spaces causes IndentationError. Use 4 spaces per indent level consistently.
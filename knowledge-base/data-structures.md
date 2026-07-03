# Data Structures

## Arrays and Lists
An array (or list in Python) is an ordered collection of elements. Elements are accessed by their index starting from 0. Arrays are useful when order matters and you need fast access by position.

Time complexity: Access is O(1). Search is O(n). Insert/delete at the end is O(1). Insert/delete at the beginning is O(n).

## Stacks
A stack follows Last In First Out (LIFO) order. Think of it like a stack of plates. You add and remove from the top only. Operations are push (add to top) and pop (remove from top).

Use cases: undo functionality, function call stack, balanced parentheses checking.

## Queues
A queue follows First In First Out (FIFO) order. Think of it like a line at a store. You add to the back and remove from the front. Operations are enqueue (add to back) and dequeue (remove from front).

Use cases: task scheduling, breadth-first search, print job management.

## Hash Maps (Dictionaries)
A hash map stores key-value pairs and provides near-instant lookup by key. In Python it is called a dictionary (dict). In JavaScript it is a plain object or Map.

Time complexity: Insert, delete, and lookup are all O(1) on average.

Common mistake: assuming dictionaries maintain insertion order. In Python 3.7+ they do, but relying on order is not always safe in other languages.

## Linked Lists
A linked list is a chain of nodes where each node contains data and a pointer to the next node. Unlike arrays, elements are not stored in contiguous memory. Insertion and deletion at any position is O(1) if you have a reference to the node, but access by index is O(n).
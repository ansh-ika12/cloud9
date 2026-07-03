Algorithms for Beginners

What is an Algorithm?

An algorithm is a step-by-step set of instructions to solve a specific problem. Think of it like a recipe — it takes inputs, follows a procedure, and produces an output.

Time and Space Complexity

Big O notation describes how an algorithm's performance scales with input size.

Common complexities from fastest to slowest:


O(1) — Constant: Same time regardless of input size. Example: accessing an array element by index.
O(log n) — Logarithmic: Halves the problem each step. Example: binary search.
O(n) — Linear: Time grows proportionally with input. Example: searching an unsorted list.
O(n log n) — Linearithmic: Efficient sorting. Example: merge sort, quick sort.
O(n^2) — Quadratic: Nested loops over input. Example: bubble sort, selection sort.
O(2^n) — Exponential: Doubles with each addition. Example: naive recursive Fibonacci.


Searching Algorithms

Linear Search

Check each element one by one until you find the target or reach the end.

pythondef linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

Time complexity: O(n)
When to use: Small lists, unsorted data.

Binary Search

Only works on sorted arrays. Repeatedly divide the search space in half.

pythondef binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

Time complexity: O(log n)
When to use: Sorted arrays, large datasets.

Common mistake: Forgetting the array must be sorted first.
Common mistake: Using < instead of <= in the while condition, which can miss the target.

Sorting Algorithms

Bubble Sort

Repeatedly swap adjacent elements if they are in the wrong order. Simple but slow.

pythondef bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

Time complexity: O(n^2) average and worst case, O(n) best case (already sorted).
Not practical for large datasets but good for learning.

Selection Sort

Find the minimum element and place it at the beginning. Repeat for the remaining elements.

pythondef selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

Time complexity: O(n^2) in all cases.

Merge Sort

Divide the array in half, sort each half, then merge them. Uses the divide-and-conquer strategy.

pythondef merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

Time complexity: O(n log n) in all cases.
Space complexity: O(n) — needs extra space for merging.

Quick Sort

Pick a pivot element, partition the array around it, then sort the partitions.

pythondef quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

Time complexity: O(n log n) average, O(n^2) worst case (already sorted with bad pivot).
Space complexity: O(log n) for the recursion stack.

Recursion

Recursion is when a function calls itself to solve a smaller version of the same problem.

Every recursive function needs:


A base case — when to stop
A recursive case — the function calling itself with a smaller input


python# Factorial: n! = n * (n-1) * (n-2) * ... * 1
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

Common mistake: Forgetting the base case (causes infinite recursion).

python# Bug: no base case
def countdown(n):
    print(n)
    countdown(n - 1)  # never stops!

# Fix: add a base case
def countdown(n):
    if n <= 0:
        print("Done!")
        return
    print(n)
    countdown(n - 1)

Classic recursive problems:


Fibonacci sequence
Tower of Hanoi
Tree traversals
Merge sort
Binary search (recursive version)


Two Pointer Technique

Use two pointers to solve problems involving pairs or subarrays.

Example: Check if a string is a palindrome.

pythondef is_palindrome(s):
    left = 0
    right = len(s) - 1

    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1

    return True

Example: Find two numbers that add up to a target (sorted array).

pythondef two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None

Sliding Window

Used for problems involving contiguous subarrays or substrings.

Example: Find the maximum sum of any subarray of size k.

pythondef max_subarray_sum(arr, k):
    if len(arr) < k:
        return None

    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Slide the window
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

This technique avoids recalculating the sum from scratch each time, reducing O(n*k) to O(n).

Tips for Solving Algorithm Problems


Understand the problem completely before writing code.
Work through small examples by hand first.
Think about edge cases: empty input, single element, duplicates, negative numbers.
Start with a brute force solution, then optimize.
Consider which data structure fits the problem best.
Test your solution with the examples and edge cases.
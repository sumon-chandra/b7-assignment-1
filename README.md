# Advanced Problem Solving with TypeScript & OOP

## Overview

This repository contains solutions to the TypeScript & OOP assignment, including 7 coding problems and 2 blog posts.

## File Structure

```
├── solutions.ts    # All 7 coding solutions
├── blog-1.md       # Blog: any vs unknown & type narrowing
├── blog-2.md       # Blog: Pick and Omit utility types
└── README.md
```

## Problem Solutions

| Problem | Function | Description |
|---------|----------|-------------|
| 1 | `filterEvenNumbers` | Filters even numbers from an array |
| 2 | `reverseString` | Reverses a string |
| 3 | `checkType` | Type guard using union type `StringOrNumber` |
| 4 | `getProperty` | Generic function with key constraint |
| 5 | `toggleReadStatus` | Adds `isRead` boolean to a `Book` object |
| 6 | `Student` class | OOP inheritance with `getDetails` method |
| 7 | `getIntersection` | Returns common elements of two arrays |

## Blog Posts

- **blog-1.md** — Why `any` is a "type safety hole" and why `unknown` is the safer choice. Covers type narrowing with `typeof`, `instanceof`, and custom type guards.
- **blog-2.md** — How `Pick` and `Omit` utility types keep TypeScript code DRY by creating specialized slices of a master interface.

## How to Run

```bash
# Install TypeScript if not already installed
npm install -g typescript

# Compile
tsc solutions.ts

# Run compiled output
node solutions.js
```
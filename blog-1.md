# `any` কেন "Type Safety Hole" এবং `unknown` কেন নিরাপদ বিকল্প?

## Introduction

TypeScript ব্যবহারের মূল উদ্দেশ্য হলো type safety নিশ্চিত করা — অর্থাৎ, compile-time-এ ভুল ধরা। কিন্তু `any` type ব্যবহার করলে TypeScript-এর এই পুরো সুবিধা নষ্ট হয়ে যায়। অন্যদিকে, `unknown` type একই নমনীয়তা দেয়, কিন্তু type safety বজায় রাখে। এই ব্লগে আমরা দেখব কেন `any` একটি বিপজ্জনক "hole" এবং `unknown` কেন তার নিরাপদ বিকল্প।

---

## `any` — The Type Safety Hole

`any` ব্যবহার করলে TypeScript মূলত চুপ করে যায়। সেই variable-এ যেকোনো operation করা যায়, TypeScript কোনো error দেয় না।

```typescript
function processInput(data: any) {
  console.log(data.toUpperCase()); // No error at compile time
  console.log(data * 2);          // No error at compile time
}

processInput(42); // Runtime crash: data.toUpperCase is not a function
```

উপরের উদাহরণে, `data` যদি number হয়, তাহলে `.toUpperCase()` call করলে runtime-এ crash করবে — কিন্তু TypeScript কোনো warning দেয়নি। এটিই `any`-এর সমস্যা: এটি type checking সম্পূর্ণ বন্ধ করে দেয়।

### `any` কেন এত বিপজ্জনক?

1. **Compile-time protection নেই** — ভুল operations ধরা পড়ে না।
2. **Autocomplete কাজ করে না** — IDE সঠিক suggestions দিতে পারে না।
3. **Refactoring-এ ঝুঁকি** — কোড পরিবর্তনে কোথায় ভুল হবে বোঝা যায় না।
4. **Contagious** — `any` একটি জায়গায় ঢুকলে ধীরে ধীরে পুরো codebase-এ ছড়িয়ে পড়ে।

---

## `unknown` — The Safe Alternative

`unknown` হলো `any`-এর type-safe সংস্করণ। এটি বলে: "এই value-এর type আমি এখনো জানি না, কিন্তু ব্যবহারের আগে আমাকে নিশ্চিত হতে হবে।"

```typescript
function processInput(data: unknown) {
  console.log(data.toUpperCase()); // ❌ Compile error: Object is of type 'unknown'
}
```

TypeScript সরাসরি `unknown` type-এর উপর কোনো operation করতে দেয় না। আগে type নিশ্চিত করতে হবে।

---

## Type Narrowing

Type narrowing হলো সেই প্রক্রিয়া যার মাধ্যমে TypeScript বুঝতে পারে একটি broad type (যেমন `unknown` বা union type) আসলে কোন specific type।

### `typeof` দিয়ে Narrowing

```typescript
function processInput(data: unknown) {
  if (typeof data === "string") {
    console.log(data.toUpperCase()); // ✅ Safe — TypeScript knows it's a string
  } else if (typeof data === "number") {
    console.log(data * 2); // ✅ Safe — TypeScript knows it's a number
  }
}
```

### `instanceof` দিয়ে Narrowing

```typescript
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message); // ✅ Safe
  } else {
    console.log("Unknown error occurred");
  }
}
```

### Custom Type Guard দিয়ে Narrowing

```typescript
interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value
  );
}

function greetUser(data: unknown) {
  if (isUser(data)) {
    console.log(`Hello, ${data.name}!`); // ✅ Safe
  }
}
```

---

## `any` vs `unknown` — পাশাপাশি তুলনা

| বৈশিষ্ট্য | `any` | `unknown` |
|---|---|---|
| যেকোনো operation | ✅ অনুমতি আছে | ❌ নেই |
| Type narrowing প্রয়োজন | না | হ্যাঁ |
| Compile-time safety | নেই | আছে |
| API response handle | বিপজ্জনক | নিরাপদ |

---

## Practical Example: API Response

```typescript
async function fetchUserData(): Promise<void> {
  const response = await fetch("/api/user");
  const data: unknown = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof (data as any).name === "string"
  ) {
    console.log((data as { name: string }).name); // ✅ Safe
  }
}
```

---

## Conclusion

`any` ব্যবহার করা TypeScript-এ seat belt না পরে গাড়ি চালানোর মতো। স্বল্পমেয়াদে সহজ মনে হলেও, দীর্ঘমেয়াদে runtime error এবং debugging nightmare তৈরি করে। `unknown` ব্যবহার করলে আপনি forced হন type narrowing করতে, যা কোডকে সত্যিকারের type-safe করে তোলে। পরিচিত না হলেও একটু অভ্যাসেই `unknown` + type narrowing স্বাভাবিক হয়ে যায় — এবং এটিই professional TypeScript লেখার সঠিক পথ।
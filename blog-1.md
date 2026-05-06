# `any` কেন "Type Safety Hole" এবং `unknown` কেন নিরাপদ বিকল্প?

## Introduction

TypeScript ব্যবহার করার মূল কারণ হলো compile-time এ ভুল ধরা। কিন্তু any ব্যবহার করলে এই সুবিধাটাই প্রায় পুরোপুরি নষ্ট হয়ে যায়।

---

## `any` — The Type Safety Hole

`any` দিলে TypeScript আর কিছু চেক করে না। আপনি যেকোনো কিছু করতে পারবেন—সঠিক বা ভুল, কিছুই ধরা হবে না।

```typescript
function processInput(data: any) {
  console.log(data.toUpperCase());
}

processInput(42); // ❌ runtime error
```

এখানে TypeScript কোনো error দেয়নি, কিন্তু runtime-এ crash করেছে।

**👉 সমস্যাটা কী?**

Type checking বন্ধ হয়ে যায়
ভুল code সহজে ঢুকে পড়ে
IDE সাহায্য কমে যায়
ধীরে ধীরে পুরো project-এ `any` ছড়িয়ে পড়ে


## `unknown` — The Safe Alternative

`unknown` বলছে: “আমি জানি না এটা কী, আগে check করো, তারপর ব্যবহার করো।”

```typescript
function processInput(data: unknown) {
   console.log(data.toUpperCase()); // ❌ error
}
```

এখানে TypeScript আপনাকে জোর করে safe হতে বাধ্য করে।

---


## `any` vs `unknown` — ছোট তুলনা

| বৈশিষ্ট্য | `any` | `unknown` |
|---|---|---|
| সব operation করা যায়| ✅ | ❌ |
| type check দরকার | না | হ্যাঁ |
| safety | নেই | আছে |

---

## Bottom Line

- `any` = “যা খুশি করো” → dangerous
- `unknown` = “আগে verify করো” → safe
- 👉 বাস্তবে, production-level code এ `any` এড়িয়ে চলাই best practice।
- 👉 `unknown` + type narrowing = clean, reliable TypeScript code.
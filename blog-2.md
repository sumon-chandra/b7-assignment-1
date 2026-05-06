# `Pick` এবং `Omit` — TypeScript-এ DRY Code লেখার স্মার্ট উপায়

## Introduction

বড় প্রজেক্টে একই interface বারবার লিখতে গেলে duplication হয়। এখানেই `Pick` এবং `Omit` আপনাকে clean ও maintainable code লিখতে সাহায্য করে। যেমন, একটি User interface আছে, কিন্তু form-এর জন্য password ছাড়া দরকার, আবার public profile-এর জন্য শুধু কিছু field দরকার। এই সমস্যার elegant সমাধান হলো TypeScript-এর `Pick` এবং `Omit` utility types

---

## সমস্যাটা কোথায়?

ধরুন আপনার একটি master interface আছে:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
}
```
**এখন ধরুন:**

- Public profile → কিছু field দরকার
- Update form → কিছু অন্য field
- API → password বাদ

❌ আলাদা interface লিখলে:
- duplication বাড়ে
- maintain করা কঠিন
- ভুল হওয়ার chance বেশি

যদি কখনো `User`-এ `email` এর type পরিবর্তন হয়, তাহলে প্রতিটি interface আলাদা করে update করতে হবে। এটি error-prone এবং time-consuming।

---

## `Pick` — যা দরকার তাই নাও

`Pick<T, K>` একটি type তৈরি করে যেখানে `T` থেকে শুধু `K`-তে উল্লেখ করা keys থাকে।

```typescript
type PublicProfile = Pick<User, "id" | "name" | "email">;
// Result: { id: number; name: string; email: string }

type UpdateForm = Pick<User, "name" | "email">;
// Result: { name: string; email: string }
```

এখন `User` interface পরিবর্তন হলে `PublicProfile` এবং `UpdateForm` automatically update হয়ে যাবে।

### Real-world Example

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

type ProductCard = Pick<Product, "id" | "title" | "price" | "imageUrl">;
```

---

## `Omit` — যা দরকার নেই তা বাদ দাও

`Omit<T, K>` `T` থেকে `K`-তে উল্লেখ করা keys **বাদ দিয়ে** বাকি সব নিয়ে নতুন type তৈরি করে।

```typescript
// password বাদ দিয়ে User-এর বাকি সব field
type SafeUser = Omit<User, "password">;
// Result: { id: number; name: string; email: string; role: "admin" | "user"; createdAt: Date }

// id এবং createdAt বাদ দিয়ে create করার জন্য
type CreateUserInput = Omit<User, "id" | "createdAt">;
```

### কখন `Pick` বনাম `Omit` ব্যবহার করবেন?

| পরিস্থিতি | উপযুক্ত utility |
|---|---|
| কম field দরকার (2-3টি) | `Pick` |
| বেশিরভাগ field দরকার, কয়েকটি বাদ | `Omit` |
| Sensitive data লুকাতে | `Omit` |
| Specific "slice" তৈরি | `Pick` |

---

## `Pick` এবং `Omit` একসাথে

```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  publishedAt: Date;
  tags: string[];
  isDraft: boolean;
}

// Create করার সময় id ও publishedAt দরকার নেই
type CreatePostInput = Omit<BlogPost, "id" | "publishedAt">;

// List view-এ content দরকার নেই
type PostSummary = Omit<BlogPost, "content" | "isDraft">;

// Edit form-এ শুধু কিছু field
type EditPostForm = Pick<BlogPost, "title" | "content" | "tags">;
```



## Bottom Line

- `Pick` = select specific fields
- `Omit` = remove unwanted fields
- দুটোই → DRY + maintainable code

👉 Professional TypeScript-এ এগুলো avoid করা মানে unnecessary extra কাজ করা।
// Problem 1
function filterEvenNumbers(numbers: number[]): number[] {
   return numbers.filter((n) => n % 2 === 0);
 }
 
 // Problem 2
 function reverseString(str: string): string {
   return str.split("").reverse().join("");
 }
 
 // Problem 3
 type StringOrNumber = string | number;
 
 function checkType(value: StringOrNumber): "String" | "Number" {
   if (typeof value === "string") return "String";
   return "Number";
 }
 
 // Problem 4
 function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
   return obj[key];
 }
 
 // Problem 5
 interface Book {
   title: string;
   author: string;
   publishedYear: number;
 }
 
 function toggleReadStatus(book: Book): Book & { isRead: boolean } {
   return { ...book, isRead: true };
 }
 
 // Problem 6
 class Person {
   name: string;
   age: number;
 
   constructor(name: string, age: number) {
     this.name = name;
     this.age = age;
   }
 }
 
 class Student extends Person {
   grade: string;
 
   constructor(name: string, age: number, grade: string) {
     super(name, age);
     this.grade = grade;
   }
 
   getDetails(): string {
     return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
   }
 }
 
 // Problem 7
 function getIntersection(arr1: number[], arr2: number[]): number[] {
   const set = new Set(arr2);
   return arr1.filter((n) => set.has(n));
 }

// Test

const problem1 = filterEvenNumbers([1,2,3,4,5,6])
const problem2 = reverseString("hello")
const problem3 = checkType("hello")
const problem4 = getProperty({name: "John", age: 30}, "name")
const problem5 = toggleReadStatus({title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925})
const problem6 = new Student("John", 30, "A")
const problem7 = getIntersection([1,2,3,4,5], [3,4,5,6,7])
// console.log(problem1)
// console.log(problem2)
// console.log(problem3)
// console.log(problem4)
// console.log(problem5)
// console.log(problem6.getDetails())
// console.log(problem7)
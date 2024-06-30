interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher2 = new Teacher({
  name: "tom",
  age: 24,
  gender: "male"
});

console.log(teacher2.getInfo("name"));
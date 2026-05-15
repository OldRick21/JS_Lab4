interface IUser {
  name: string;
  age: number;
  hello(): void;
}

class User implements IUser {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const new_user: IUser = new User("Andrey", 21);
new_user.hello();
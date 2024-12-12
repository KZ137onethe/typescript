/** 协变
 * 子类型可以赋值给父类型
 * 如果A是B的子类型，那么F<A> 是 F<B> 的子类型，换句话说，F<A> 可以赋值给 F<B>，
 */
namespace Covariant {
  export class Animal {
  }
  
  export class Dog extends Animal {
  }
  
  export interface Box<T = any> {
    value: T
  }
  
  export interface Person {
    name: string
  }
  
  export interface Student extends Person {
    age: number
  }
}
// example1: 对象
let animalRandom: Covariant.Box<Covariant.Animal>
let animalDog: Covariant.Box<Covariant.Dog> = {value: new Covariant.Dog()};

animalRandom = animalDog
console.log(animalRandom)

// example2: 函数，在这里返回值不一样
type AnimalFactory = () => Covariant.Animal
type DogFactory = () => Covariant.Dog

let createAnimal: AnimalFactory;
let createDog: DogFactory = () => new Covariant.Dog();

createAnimal = createDog

// example3: 数组
let dogs: Covariant.Dog[] = [new Covariant.Dog(), new Covariant.Dog()]
let animals: Covariant.Animal[] = []

animals = dogs

// example4: 使用接口定义对象
let tim: Covariant.Person = {name: 'tim'}
let kobe: Covariant.Student = {name: 'kobe', age: 16}

tim = kobe

/** 逆变
 * 如果类型A是类型B的父类型，那么在函数参数的位置上，类型A可以赋值给类型B。也就是说逆变允许父类型的类型参数赋值给子类型的类型参数
 */
namespace Inverter {
  export class Animal {
    speak() {
      console.log('animal sound')
    }
  }
  
  export class Dog extends Animal {
    speak() {
      console.log('Wang Wang Wang!')
    }
    
    get type() {
      return '德国牧羊犬'
    }
  }
  
  export type AnimalHandler = (args: Animal) => void
  export type DogHandler = (args: Dog) => void
}

// example1:
let handleAnimal: Inverter.AnimalHandler = (args: Inverter.Animal) => {
  args.speak()
}
let handleDog: Inverter.DogHandler = (args: Inverter.Dog) => {
  args.speak()
}

// 思考一下，这样为什么没有问题?
handleDog = handleAnimal
// 当 tsconfig.json 中 "strictFunctionTypes": true 时，思考一下，这样为什么有问题?
// handleAnimal = handleDog

/** 双向协变
 * 双向协变是 TypeScript 中的一种特殊行为，允许函数参数的类型既可以协变，也可以逆变
 */
namespace BidirectionalCovariance {
  export class Animal {
    speak() {
      console.log('animal sound')
    }
  }
  
  export class Dog extends Animal {
    speak() {
      console.log('Wang Wang Wang!')
    }
    
    get type() {
      return '德国牧羊犬'
    }
  }
  
  export type AnimalHandler = (args: Animal) => any
  export type DogHandler = (args: Dog) => any
}

// example1:
let _handleAnimal: BidirectionalCovariance.AnimalHandler = (args: BidirectionalCovariance.Animal) => {
  args.speak()
}
let _handleDog: BidirectionalCovariance.DogHandler = (args: BidirectionalCovariance.Dog) => {
  return args.type
}

// tsconfig.json 中 "strictFunctionTypes": false 时，开启双向协变，但是推荐别这么做
_handleAnimal = _handleDog
_handleDog = _handleAnimal


/** 不变
 * 两个没有父子级的类型互相赋值时，回报类型错误，这就是不变
 */
namespace Nochanged {
  export interface Duck {
    name: string
    weight: number
    varieties: string
  }
  export interface Bowl {
    price: number
    material: string
  }
}

// example1
let duck1: Nochanged.Duck = {
  name: 'bili',
  weight: 10.8,
  varieties: '桂西鸭'
}
let bowl1: Nochanged.Bowl = {
  price: 17.8,
  material: 'porcelain'
}

// Error 类型错误，Nochanged.Bowl 和 Nochanged.Duck 是不能兼容的，这种情况不允许变型
// duck1 = bowl1

// example2: 联合类型转交叉类型
type UnionToIntersctions<U> = (U extends U ? (a: U) => any : never) extends (
    a: infer R
) => any ? R : never;
type Copy<Obj> = {
  [K in keyof Obj]: Obj[K]
}
type res = UnionToIntersctions<{a: 1} | {b: 2}>
type copy_res = Copy<res>
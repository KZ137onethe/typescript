// 泛型 generic 泛指的类型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}

function anotherJoin<T>(first: T, second: T): T {
  return first;
}

function map<T>(params: T[]) {
  return params;
}

join<string, number>("1", 2);
anotherJoin<string>("abc", "def");
map<number>([2, 3, 5, 7, 11, 13]);
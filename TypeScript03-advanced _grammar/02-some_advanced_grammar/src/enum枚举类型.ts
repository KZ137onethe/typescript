// 枚举类型是一个相对的映射
enum Status {
  OFFLINE,
  ONLINE,
  DELETED,
}

function getResult(status: number) {
  if(status === Status.OFFLINE) {
    return "offline"
  } else if(status === Status.ONLINE) {
    return "online"
  } else if(status === Status.DELETED) {
    return "deleted"
  }
  return "error"
}

const result = getResult(Status.OFFLINE);
console.log(result);
console.log(Status[0], Status.OFFLINE);


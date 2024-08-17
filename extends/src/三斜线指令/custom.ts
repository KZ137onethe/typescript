/// <reference lib="dom" />

const customError = await import("http://192.168.1.4:8081/lib/customError.js") as CustomError
function riskyOperation(value: number): never | number {
  if (value < 0) {
    new customError.Def("Value must be non-negative");
  }
  return Math.sqrt(value)
}

function randomInteger() {
  const s = Math.random() > 0.5 ? 1: -1
  const val = Math.floor(Math.random() * 100)
  return s * val
}

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new customError.Api("Failed to fetch data", response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof customError.Api) {
      console.error("API Error:", error.toString());
    } else if (error instanceof customError.Def) {
      console.error("Custom Error:", error.toString());
    } else {
      console.error("Unknown Error:", error);
    }
  }
}

// 主程序逻辑
(async () => {
  try {
    const value = randomInteger();
    console.log(value, riskyOperation(value));
  } catch (error) {
    if (error instanceof customError.Def) {
      console.error(error.toString());
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
  
  fetchData("https://dog.ceo/api/breed/pembroke/images/random")
  .then(data => {
    console.log("Data:", data);
  })
  .catch(error => {
    console.error("Fetch failed:", error);
  });
})();

import fetch from 'node-fetch';
import {CustomError, APIError} from './customError';

function riskyOperation(value: number) {
  if (value < 0) {
    throw new CustomError("Value must be non-negative", 1001);
  }
  return Math.sqrt(value);
}

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new APIError("Failed to fetch data", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      console.error("API Error:", error.toString());
    } else if (error instanceof CustomError) {
      console.error("Custom Error:", error.toString());
    } else {
      console.error("Unknown Error:", error);
    }
  }
}

try {
  console.log(riskyOperation(9)); // 输出: 3
  console.log(riskyOperation(-5)); // 抛出错误
} catch (error) {
  if (error instanceof CustomError) {
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

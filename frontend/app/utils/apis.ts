import { type Guitar } from "./models";

export async function fetchGuitars() {
  const response = await fetch("http://localhost:3000/guitar/list");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as unknown as Guitar[];
}

export async function addGuitarToOrders() {
  const response = await fetch("http://localhost:3000/guitars");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as unknown as Guitar[];
}

export async function getUserByUsername(data: string) {
  const response = await fetch("http://localhost:3000/user/getUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

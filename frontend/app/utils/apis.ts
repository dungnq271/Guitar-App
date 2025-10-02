import axios from "axios";
import { type Guitar } from "./models";

export async function fetchGuitars() {
  const response = await fetch("http://localhost:3000/guitar/list");
  return response.json() as unknown as Guitar[];
}

export async function addGuitarToOrders() {
  const response = await fetch("http://localhost:3000/guitars");
  return response.json() as unknown as Guitar[];
}

export async function login(data: object) {
  const response = await axios.post("http://localhost:3000/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function register(data: object) {
  const response = await axios.post(
    "http://localhost:3000/auth/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
}

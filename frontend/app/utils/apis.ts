export interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  price: number;
}

export async function fetchGuitars() {
  const response = await fetch("http://localhost:3000/guitars");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as unknown as Guitar[];
}

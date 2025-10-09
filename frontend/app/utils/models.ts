enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  profilePicUrl: string;
  role: Role;
}

export interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  price: number;
}

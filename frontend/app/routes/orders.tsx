import {
  Form,
  Link,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/guitars";
import { fetchGuitars, type Guitar } from "../utils/apis";

export async function clientLoader({ params }: Route.LoaderArgs) {}

export async function clientAction({ params }: Route.ClientActionArgs) {}

export default function Guitars({ loaderData }: Route.ComponentProps) {
  return <div className="bg-black text-white p-5">Hello</div>;
}

import type { Route } from './+types/orders';
import { useAuth } from '~/Providers/authProvider';
import './Orders.css';

export async function clientLoader({ params }: Route.LoaderArgs) {}

export async function clientAction({ params }: Route.ClientActionArgs) {}

export default function Guitars({ loaderData }: Route.ComponentProps) {
  const { user } = useAuth();
  return <div id="orders">{user?.username}'s orders:</div>;
}

import type { Route } from './+types/orders';
import { useAuth } from '~/Providers/authProvider';

export async function clientLoader({ params }: Route.LoaderArgs) {}

export async function clientAction({ params }: Route.ClientActionArgs) {}

export default function Guitars({ loaderData }: Route.ComponentProps) {
  const { user, jwt, setJwt, setRefreshToken } = useAuth();

  return <div className="bg-black text-white p-5">{user?.username}'s orders:</div>;
}

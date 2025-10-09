import { useAuth } from "~/provider/auth/authProvider";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <p>Name: {user?.username}</p>
    </div>
  );
}

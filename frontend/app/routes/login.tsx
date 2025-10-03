import { Form, Link, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { login } from "~/utils/apis";
import "./login.css";
import { useAuth } from "~/provider/auth/authProvider";

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await login(data);
    return response;
  } catch (err) {
    return redirect(`/login`);
  }
}

export default function SignInPage({ actionData }: Route.ComponentProps) {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  if (actionData?.data.token && actionData?.data.token !== token) {
    console.log(actionData?.data);
    setToken(actionData?.data.token);
    navigate("/", { replace: true });
  }

  /* async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  *   e.preventDefault();
  
  *   const form = new FormData(e.target as HTMLFormElement);
  *   const parsedData = Object.fromEntries(form.entries());
  
  *   try {
  *     const response = await login(parsedData);
  *     if (response.data.token) {
  *       setToken(response.data.token);
  *       navigate("/", { replace: true });
  *     }
  *   } catch (err) {
  *     return redirect(`/login`);
  *   }
  * } */

  return (
    <div id="login-page">
      <div id="modal">
        <div id="title">
          <h1>Sign in</h1>
        </div>
        <Form id="login-form" method="post">
          <div id="email">
            <p>Username or email address</p>
            <input name="email" />
          </div>
          <div id="password">
            <div>
              <p>Password</p>
              <Link to="/signup">Forgot password?</Link>
            </div>
            <input name="password" type="password" />
          </div>
          <button id="login" type="submit">
            Sign in
          </button>
          <div id="separation">
            <span>or</span>
          </div>
          <button id="with-google" type="submit">
            Continue with Google
          </button>
        </Form>
        <div id="create-account">
          <p>
            New?{" "}
            <Link id="to_register" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

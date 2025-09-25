import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/login";
import { getUserByUsername } from "~/utils/apis";
import "./login.css";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await getUserByUsername(JSON.stringify(data));
  // TODO: implement try-catch in case user id does not exist
  try {
    return redirect(`/${response.id}`);
  } catch (err) {
    console.log(err);
  }
}

export default function SignInPage() {
  return (
    <div id="login-page">
      <div id="modal">
        <div id="title">
          <h1>Sign in</h1>
        </div>
        <Form id="login-form" method="post">
          <div id="username">
            <p>Username or email address</p>
            <input name="username" />
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

import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/login";
import { createUser } from "~/utils/apis";
import "./register.css";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await createUser(JSON.stringify(data));
  try {
    return redirect(`/${response.id}`);
  } catch (err) {
    console.log(err);
  }
}

export default function RegisterPage() {
  return (
    <div id="register-page">
      <div id="modal">
        <div id="left-modal">
          <div id="title">
            <h1>Create an account</h1>
          </div>
          <Form id="register-form" method="post">
            <div id="username">
              <p>Username or email address</p>
              <input name="username" />
            </div>
            {/* TODO: Implement password validation */}
            <div id="password">
              <p>Password</p>
              <input name="password" type="password" />
            </div>
            <button id="register" type="submit">
              Create account
            </button>
            <div id="separation">
              <span>or</span>
            </div>
            <div id="already-have-account">
              <span>
                Already have an account?{" "}
                <Link id="to_login" to="/login">
                  &rarr; Login
                </Link>
              </span>
            </div>
          </Form>
        </div>
        <div id="right-modal">
          <img src="./app/images/guitars.jpg" />
        </div>
      </div>
    </div>
  );
}

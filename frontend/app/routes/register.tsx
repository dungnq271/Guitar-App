import { Form, Link, redirect } from "react-router";

export default function RegisterPage() {
  return (
    <div id="register-page">
      <div id="modal">
        <Form id="register-form" method="post">
          <div id="username">
            <p>Username or email address</p>
            <input aria-label="First name" name="username" />
          </div>
          <div id="password">
            <div>
              <p>Password</p>
              <Link to="/register">Forgot password?</Link>
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
      </div>
    </div>
  );
}

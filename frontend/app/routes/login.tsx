import { useState, type FormEvent } from "react";
import { Form, Link, useNavigate } from "react-router";
import { login } from "~/utils/apis";
import { useAuth } from "~/provider/auth/authProvider";
import "./login.css";

export default function SignInPage() {
  const [errorMsg, setErrorMsg] = useState<string>();
  const { setUser, setJwt, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  /* const location = useLocation(); */

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const parsedData = Object.fromEntries(form.entries());

    try {
      const response = await login(parsedData);
      if (!response.data.success) {
        setErrorMsg(response.data.message);
      } else {
        setUser(response.data.user);
        setJwt(response.data.jwt);
        setRefreshToken(response.data.refreshToken);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="login-page">
      <div id="modal">
        <div id="title">
          <h1>Sign in</h1>
        </div>
        <Form id="login-form" method="post" onSubmit={handleSubmit}>
          {errorMsg && <p id="error">{errorMsg}</p>}
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

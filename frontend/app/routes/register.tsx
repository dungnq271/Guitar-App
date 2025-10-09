import { useState, type FormEvent } from "react";
import { Form, Link, useNavigate } from "react-router";
import { register } from "~/utils/apis";
import "./register.css";

export default function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState<string>();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const parsedData = Object.fromEntries(form.entries());

    try {
      const response = await register(parsedData);
      console.log(response.data);
      if (!response.data.success) {
        setErrorMsg(response.data.message);
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="register-page">
      <div id="modal">
        <div id="left-modal">
          <div id="title">
            <h1>Create an account</h1>
          </div>
          <Form id="register-form" method="post" onSubmit={handleSubmit}>
            {errorMsg && <p id="error">{errorMsg}</p>}
            <div id="name">
              <div id="first-name">
                <p>First name</p>
                <input name="firstName" />
              </div>
              <div id="last-name">
                <p>Last name</p>
                <input name="lastName" />
              </div>
            </div>
            <div id="username">
              <p>Username</p>
              <input name="username" />
            </div>
            <div id="email">
              <p>Email address</p>
              <input name="email" />
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

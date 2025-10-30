import { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router';
import { register } from '~/utils/apis';
import './Register.css';
import type { AxiosError } from 'axios';

export default function RegisterPage() {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [countPasswordCritMatch, setCountPasswordCritMatch] = useState(0);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordStrength =
    countPasswordCritMatch <= 1 ? 'low' : countPasswordCritMatch === 2 ? 'medium' : 'strong';

  console.log(passwordStrength);
  console.log(input.password.length);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    validateInput(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const parsedData = Object.fromEntries(form.entries());

    try {
      const response = await register(parsedData);
      console.log(response.data);
      navigate('/login');
    } catch (err: AxiosError) {
      console.log(err.response.data);
    }
  };

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError((prev) => {
      const errorObj = { ...prev };

      switch (name) {
        case 'firstName':
          if (!value) {
            errorObj[name] = 'Please enter first name.';
          } else {
            errorObj[name] = '';
          }
          break;
        case 'lastName':
          if (!value) {
            errorObj[name] = 'Please enter last name.';
          } else {
            errorObj[name] = '';
          }
          break;
        case 'username':
          if (!value) {
            errorObj[name] = 'Please enter username.';
          } else {
            errorObj[name] = '';
          }
          break;
        case 'email':
          if (!value) {
            errorObj[name] = 'Please enter email.';
          } else {
            errorObj[name] = '';
          }
          break;
        case 'password':
          validatePassword(errorObj, value);
          break;
        case 'confirmPassword':
          if (!value) {
            errorObj[name] = 'Please enter Confirm Password.';
          } else if (input.password && input.confirmPassword !== input.password) {
            errorObj['confirmPassword'] = 'Password and Confirm Password does not match.';
          } else {
            errorObj[name] = '';
          }
          break;

        default:
          break;
      }
      return errorObj;
    });
  };

  const validatePassword = (
    errorObj: { password: string; confirmPassword: string },
    value: string
  ) => {
    if (!value) {
      errorObj.password = 'Please enter Password.';
    } else {
      errorObj.password = '';
      let countCritMatch = 0;

      // Password at least 8 characters long
      if (value.length >= 8) {
        countCritMatch += 1;
      }

      // Password contains at least one uppercase letter
      if (/[A-Z]/.test(value)) {
        countCritMatch += 1;
      }

      // Password contains at least one number
      if (/[0-9]/.test(value)) {
        countCritMatch += 1;
      }

      // Password contains at least one special character
      if (/[!@#\$%\^\&*\)\(+=._-]/.test(value)) {
        countCritMatch += 1;
      }

      // ignore confirm password error if user currently typing pasword
      if (error.confirmPassword) {
        errorObj.confirmPassword = '';
      }

      setCountPasswordCritMatch(countCritMatch);
    }
  };

  return (
    <div id="register-page">
      <div id="left"></div>
      <div id="right">
        <div id="modal">
          <h1>Create an account</h1>
          <Form id="register-form" method="post" onSubmit={handleSubmit}>
            <div className="name">
              <div id="first-name">
                <p>
                  First name <span className="required-asterisk">*</span>
                </p>
                <input
                  name="firstName"
                  value={input.firstName}
                  onChange={handleInputChange}
                  onBlur={validateInput}
                />
                {error.firstName && <span className="err">{error.firstName}</span>}
              </div>
              <div id="last-name">
                <p>
                  Last name <span className="required-asterisk">*</span>
                </p>
                <input
                  name="lastName"
                  value={input.lastName}
                  onChange={handleInputChange}
                  onBlur={validateInput}
                />
                {error.lastName && <span className="err">{error.lastName}</span>}
              </div>
            </div>
            <div id="username">
              <p>
                Username <span className="required-asterisk">*</span>
              </p>
              <input
                name="username"
                value={input.username}
                onChange={handleInputChange}
                onBlur={validateInput}
              />
              {error.username && <span className="err">{error.username}</span>}
            </div>
            <div id="email">
              <p>
                Email address <span className="required-asterisk">*</span>
              </p>
              <input
                name="email"
                value={input.email}
                onChange={handleInputChange}
                onBlur={validateInput}
              />
              {error.email && <span className="err">{error.email}</span>}
            </div>
            <div id="password">
              <p>
                Password <span className="required-asterisk">*</span>
              </p>
              <div id="password-input">
                <input
                  name="password"
                  // TODO: implement toggling eye
                  type={passwordVisibility ? 'text' : 'password'}
                  value={input.password}
                  onChange={handleInputChange}
                  onBlur={validateInput}
                  required
                />
                <button
                  id="toggle-visibility"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  <span className="material-symbols-outlined" id="visibility">
                    {passwordVisibility ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {error.password && <span className="err">{error.password}</span>}
              {input.password.length > 0 && (
                <span className="password-strength" id={passwordStrength}>
                  Strength: {passwordStrength}
                </span>
              )}
            </div>
            <div id="confirm-password">
              <p>
                Confirm password <span className="required-asterisk">*</span>
              </p>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleInputChange}
                onBlur={validateInput}
                required
              />
              {error.confirmPassword && <span className="err">{error.confirmPassword}</span>}
            </div>
            <button id="register" type="submit">
              Create account
            </button>
            <div className="separation">
              <span>or</span>
            </div>
            <div id="already-have-account">
              <span>
                Already have an account?{' '}
                <Link id="to_login" to="/login">
                  &rarr; Login
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

import { useState, type FormEvent } from 'react';
import { Form, Link, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { login } from '~/utils/apis';
import { useAuth } from '~/Providers/authProvider';
import type { AxiosError } from 'axios';
import './Login.css';

const LoginUserSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' })
});

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

export default function SignInPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [errorMsg, setErrorMsg] = useState<string>();
  const { setUser, setJwt, setRefreshToken } = useAuth();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return login(data);
    },
    onSuccess: (response) => {
      setUser(response.data.user);
      setJwt(response.data.jwt);
      setRefreshToken(response.data.refreshToken);
      navigate('/');
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      }
    }
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  /**
   * The current value of the 'email' field in the form.
   * @type {string}
   */
  const email: string = useWatch({
    control,
    name: 'email'
  });

  /**
   * The current value of the 'password' field in the form.
   * @type {string}
   */
  const password: string = useWatch({
    control,
    name: 'password'
  });

  const isDisabled = !email || !password || mutation.isPending;

  return (
    <div id="login-page">
      <div id="modal">
        <h1>Sign in</h1>
        <Form id="login-form" method="post" onSubmit={handleSubmit(onSubmit)}>
          {!errors.email && !errors.password && <p className="err">{errorMsg}</p>}
          <div id="email">
            <p>Email</p>
            <input
              {...register('email', {
                required: true,
                onChange: () => {
                  if (errorMsg) {
                    setErrorMsg('');
                  }
                }
              })}
            />
            {errors.email && <span className="err">{errors.email.message}</span>}
          </div>
          <div id="password">
            <div>
              <p>Password</p>
              <Link to="/signup">Forgot password?</Link>
            </div>
            <div className="password-input">
              <input
                type={passwordVisibility ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  onChange: () => {
                    if (errorMsg) {
                      setErrorMsg('');
                    }
                  }
                })}
              />
              <button
                className="toggle-visibility"
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
            {errors.password && <span className="err">{errors.password.message}</span>}
          </div>
          <button
            id="login"
            type="submit"
            disabled={isDisabled} // Prevents double-submit
          >
            Sign in
          </button>
          <div className="separation">
            <span>or</span>
          </div>
          <button id="with-google" type="submit">
            Continue with Google
          </button>
        </Form>
        <div id="create-account">
          <p>
            New?{' '}
            <Link id="to_register" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

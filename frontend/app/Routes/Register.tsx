import { useState } from 'react';
import { Form, Link, redirect, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { register as requestRegisterApi } from '~/utils/apis';
import './Register.css';

const RegisterUserSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Please enter first name' }),
    lastName: z.string().min(1, { message: 'Please enter first name' }),
    username: z.string().min(1, { message: 'Please enter username' }),
    email: z.email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
      .min(8, { message: 'Password must be at least 8 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

// Password validation patterns
const passwordValidationPatterns = {
  atLeastOneUppercase: /[A-Z]/,
  atLeastOneLowercase: /[a-z]/,
  atLeastOneNumeric: /[0-9]/,
  atLeastOneSpecialChar: /[!@#\$%\^\&*\)\(+=._-]/
};

export default function RegisterPage() {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return requestRegisterApi(data);
    },
    onSuccess: (response) => {
      console.log(response);
      // TODO: optimize pending UI after settled
      navigate('/login');
    },
    onError: (error: any) => {
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach((err: any) => {
          setError(err[0], { type: 'manual', message: err[1][0] });
        });
      }
    }
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  /**
   * The current value of the 'firstName' field in the form.
   * @type {string}
   */
  const firstName: string = useWatch({
    control,
    name: 'firstName'
  });

  /**
   * The current value of the 'lastName' field in the form.
   * @type {string}
   */
  const lastName: string = useWatch({
    control,
    name: 'lastName'
  });

  /**
   * The current value of the 'username' field in the form.
   * @type {string}
   */
  const username: string = useWatch({
    control,
    name: 'username'
  });

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

  /**
   * The current value of the 'confirmPassword' field in the form.
   * @type {string}
   */
  const confirmPassword: string = useWatch({
    control,
    name: 'confirmPassword'
  });

  const countPasswordCritMatch = Object.entries(passwordValidationPatterns).filter(([_, value]) =>
    value.test(password)
  ).length;

  const passwordStrength =
    countPasswordCritMatch <= 1 ? 'low' : countPasswordCritMatch === 2 ? 'medium' : 'strong';

  const isDisabled =
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    password !== confirmPassword ||
    mutation.isPending;

  return (
    <div id="register-page">
      {mutation.isPending && (
        <div className="modal-bg">
          <div id="loading-splash">
            <div id="loading-splash-spinner" />
            <p>Loading, please wait...</p>
          </div>
        </div>
      )}
      <div id="left"></div>
      <div id="right">
        <div id="modal">
          <h1>Create an account</h1>
          <Form id="register-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="name">
              <div id="first-name">
                <p>
                  First name <span className="required-asterisk">*</span>
                </p>
                <input {...register('firstName', { required: true })} />
                {errors.firstName && <span className="err">{errors.firstName.message}</span>}
              </div>
              <div id="last-name">
                <p>
                  Last name <span className="required-asterisk">*</span>
                </p>
                <input {...register('lastName', { required: true })} />
                {errors.lastName && <span className="err">{errors.lastName.message}</span>}
              </div>
            </div>
            <div id="username">
              <p>
                Username <span className="required-asterisk">*</span>
              </p>
              <input {...register('username', { required: true })} />
              {errors.username && <span className="err">{errors.username.message}</span>}
            </div>
            <div id="email">
              <p>
                Email address <span className="required-asterisk">*</span>
              </p>
              <input {...register('email', { required: true })} />
              {errors.email && <span className="err">{errors.email.message}</span>}
            </div>
            <div id="password">
              <p>
                Password <span className="required-asterisk">*</span>
              </p>
              <div className="password-input">
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  {...register('password', { required: true })}
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
              {errors.password ? (
                <span className="err">{errors.password.message}</span>
              ) : (
                password.length > 0 &&
                (password.length < 8 ? (
                  <span className="err">Password must be eight characters or more</span>
                ) : (
                  <span className="password-strength" id={passwordStrength}>
                    Strength: {passwordStrength}
                  </span>
                ))
              )}
            </div>
            <div id="confirm-password">
              <p>
                Confirm password <span className="required-asterisk">*</span>
              </p>
              <input type="password" {...register('confirmPassword', { required: true })} />
              {errors.confirmPassword ? (
                <span className="err">{errors.confirmPassword.message}</span>
              ) : (
                confirmPassword.length > 0 &&
                confirmPassword !== password && (
                  <span className="err">Password and Confirm Password does not match</span>
                )
              )}
            </div>
            <button
              id="register"
              type="submit"
              disabled={isDisabled} // Prevents double-submit
            >
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

import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from './index';

describe('<PasswordInput />', () => {
  const user = userEvent.setup();

  it('should render password invisibile and visibile when user clicks the toggling eye and invisible again when user clicks again', async () => {
    // render the app stub at "/login"
    render(
      <>
        <label htmlFor="password-input">Password</label>
        <PasswordInput />
      </>
    );

    // find the elements
    const passwordInput = screen.getByLabelText('Password');

    // simulate interactions
    await user.type(passwordInput, 'abcd');

    // expect password to be hidden by default
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    // password has visibitlity button displaying on by default
    expect(screen.getByRole('button', { name: 'visibility' })).toBeInTheDocument();

    // user click the first time
    await user.click(screen.getByRole('button', { name: 'visibility' }));
    // expect password to be shown
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    // expect password to hav visibility button displaying off
    expect(screen.getByRole('button', { name: 'visibility_off' })).toBeInTheDocument();

    // user click again
    await user.click(screen.getByRole('button', { name: 'visibility_off' }));
    // expect password to be hidden
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    // expect password to hav visibility button displaying on again
    expect(screen.getByRole('button', { name: 'visibility' })).toBeInTheDocument();
  });
});

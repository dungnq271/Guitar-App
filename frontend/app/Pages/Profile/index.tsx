import { Form, useNavigate } from 'react-router';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../Providers/authProvider';
import { updateUser } from '../../utils/apis';
import { getJwt, parseJwt } from '../../lib/auth';
import './index.css';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    let parsedData = Object.fromEntries(form.entries());

    if (user) {
      try {
        const jwt = parseJwt(getJwt());
        const fingerprintHash = jwt?.['X-User-Fingerprint'];
        parsedData = { fingerprintHash, ...parsedData };
        const response = await updateUser(parsedData);
        if (!response.data.success) {
          console.log(response.data.message);
        } else {
          setUser(response.data.user);
          setIsEdit(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  }

  return (
    <div id="profile">
      {isEdit ? (
        <>
          <Form method="post" onSubmit={handleSubmit}>
            <div id="username">
              <label>Username:</label>
              <input name="username" defaultValue={user?.username} />
            </div>
            <div id="first-name">
              <label>First name:</label>
              <input name="firstName" defaultValue={user?.firstName} />
            </div>
            <div id="last-name">
              <label>Last name:</label>
              <input name="lastName" defaultValue={user?.lastName} />
            </div>
            <div id="edit-form-btns">
              <button id="update" type="submit">
                Submit
              </button>
              <button id="cancel" onClick={() => setIsEdit(!isEdit)}>
                Cancel
              </button>
            </div>
          </Form>
        </>
      ) : (
        <>
          <label>Username: {user?.username}</label>
          <label>First name: {user?.firstName}</label>
          <label>Last name: {user?.lastName}</label>
          <label>Email: {user?.email}</label>
          <button id="Edit" onClick={() => setIsEdit(!isEdit)}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

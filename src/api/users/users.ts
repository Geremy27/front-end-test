// Using env in a ts file, clearer on typescript and can be used with a jinja file to insert enviromental variables.
import { USERS_BACKEND_URL } from 'config/env';
import { inUsersMapper, outUserMapper } from './users.mapper';

const userUrl = USERS_BACKEND_URL;

export const getUsers = async () => {
  const response = await fetch(`${userUrl}/users`);
  const responseJSON: FetchResponse = await response.json();
  return inUsersMapper(responseJSON);
};

export const createUser = async (user: User) => {
  console.log(outUserMapper(user));
  return fetch(`${userUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outUserMapper(user)),
  });
};

export const updateUser = async (user: User) => {
  return fetch(`${userUrl}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outUserMapper(user)),
  });
};

export const deleteUser = async (id: number | null) => {
  return fetch(`${userUrl}/users/${id}`, {
    method: 'DELETE',
  });
};

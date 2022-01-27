import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { deleteUser, getUsers } from 'api/users/users';

import { UserForm } from 'components';

import './users.styles.scss';

export const UsersPage = () => {
  const [selectedUser, setSelecterUser] = useState<User | null>(null);

  const { isLoading, data, refetch } = useQuery<User[]>('users', getUsers);

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      setSelecterUser(null);
      refetch();
    },
  });

  const handleSelectUser = (user: User) => {
    setSelecterUser(user);
  };

  if (isLoading || deleteUserMutation.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-page-wrapper">
      <header className="header">Users</header>

      <div className="user-crud-wrapper">
        <div className="user-list">
          {data && data.length ? (
            data.map(({ firstName, lastName, id, birthday, ...user }) => (
              <div className="user-list-item" key={id}>
                <div
                  onClick={() =>
                    handleSelectUser({
                      firstName,
                      lastName,
                      id,
                      birthday,
                      ...user,
                    })
                  }
                  className="user-info"
                >
                  {firstName} {lastName} - {birthday}
                </div>
                <button onClick={() => deleteUserMutation.mutate(id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="no-users">No users available...</div>
          )}
        </div>

        <div className="user-edit">
          <UserForm refetch={refetch} selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

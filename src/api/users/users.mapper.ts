export const inUsersMapper = (users: FetchResponse): User[] => {
  return users.map((user: FetchResponse) => {
    return {
      id: user.user_id || null,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      birthday: user.birthday || '',
      password: user.password || '',
      genderId: user.gender_id || '',
    };
  });
};

export const outUserMapper = (user: User): FetchResponse => {
  return {
    user_id: user.id || null,
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    birthday: user.birthday || '',
    password: user.password || '',
    gender_id: user.genderId || '',
  };
};

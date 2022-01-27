// Using env in a ts file, clearer on typescript and can be used with a jinja file to insert enviromental variables.
import { USERS_BACKEND_URL } from 'config/env';

const userUrl = USERS_BACKEND_URL;

export const getGenders = async () => {
  const response = await fetch(`${userUrl}/genders`);
  const responseJSON = await response.json();
  return responseJSON.map(
    (gender: FetchResponse): Gender => ({
      id: gender.gender_id,
      name: gender.name,
    })
  );
};

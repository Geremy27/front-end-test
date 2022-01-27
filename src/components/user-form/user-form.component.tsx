import { useMutation, useQuery } from 'react-query';
import DatePicker from 'react-date-picker';

import { createUser, updateUser } from 'api/users/users';
import { getGenders } from 'api/genders/genders';

import './user-form.styles.scss';
import { useFormik } from 'formik';

interface UserFormInterface {
  selectedUser: User | null;
  refetch: Function;
}

// Created only once.
const defualtDate = new Date();

export const UserForm = ({ selectedUser, refetch }: UserFormInterface) => {
  const { isLoading, data } = useQuery<Gender[]>('genders', getGenders);

  const createUserMutation = useMutation(createUser, {
    onSuccess: () => refetch(),
  });
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => refetch(),
  });

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik<User>(
    {
      // Uses selectedUser for updating and the default values for creating.
      initialValues: selectedUser || {
        id: null,
        firstName: '',
        lastName: '',
        birthday: defualtDate,
        password: '',
        genderId: 1,
      },
      onSubmit: async (values) => {
        if (values.id) {
          await updateUserMutation.mutate(values);
        } else {
          await createUserMutation.mutate(values);
        }
        refetch();
      },
      // Refreshes when (redundantly) a user in the app is selected.
      enableReinitialize: true,
    }
  );

  if (createUserMutation.isLoading || updateUserMutation.isLoading) {
    return <div className="user-loading">Loading user...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="user-form-wrapper">
      <label className="field-label">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={values.firstName}
      />

      <label className="field-label">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={values.lastName}
      />

      <label className="field-label">Birthday</label>
      <DatePicker
        name="birthday"
        value={values.birthday}
        onChange={(date: Date) => setFieldValue('birthday', date)}
      />

      <label className="field-label">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={values.password}
      />

      <label className="field-label">Gender</label>
      {isLoading && <div>Loading genders...</div>}
      {data &&
        data.length &&
        data.map((gender) => (
          <label key={gender.name}>
            <input
              className=".radio-button"
              checked={gender.id === values.genderId}
              type="radio"
              onChange={() => setFieldValue('genderId', gender.id)}
              value={gender.id}
            />
            {gender.name}
          </label>
        ))}

      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  birthday: Date;
  password: string;
  genderId: number;
}

interface Gender {
  id: number;
  name: string;
}

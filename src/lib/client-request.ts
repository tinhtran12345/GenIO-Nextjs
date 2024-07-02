import axios from 'axios';

export const Signup = async (
  email: string,
  password: string,
  username: string
) => {
  const res = await axios('/api/auth/register', {
    method: 'POST',
    data: {
      email,
      password,
      username,
    },
  });
  return res;
};

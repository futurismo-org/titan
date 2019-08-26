import axios from '~/lib/axios';

export const getStreamToken = async (userShortId: string) => {
  return await axios.post(
    '/getstream/register',
    {
      userId: userShortId
    },
    { headers: { Accept: 'application/json' } }
  );
};

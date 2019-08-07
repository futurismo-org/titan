import axios from 'axios';

const FORM_ID = '3RPVE4zEP4g';

export const postSubmission = (params: any) => {
  return axios.post(
    `https://formcarry.com/s/${FORM_ID}`,
    { ...params },
    { headers: { Accept: 'application/json' } }
  );
};

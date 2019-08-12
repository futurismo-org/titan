import publicIP from 'public-ip';

export const getPublicIP = () => publicIP.v4();

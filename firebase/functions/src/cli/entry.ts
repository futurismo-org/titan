import './common';
import { createCollections } from './seeds';
import { createStream } from './feeds';

export const createData = () => {
  createCollections();
  createStream();
};

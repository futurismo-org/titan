import faker from 'faker';
import moment from 'moment';
import shortId from 'shortid';

import stream from 'getstream';
import { GETSTREAM_SECRET, GETSTREAM_APP_ID, GETSTREAM_KEY } from './common';

const client = stream.connect(
  GETSTREAM_KEY as string,
  GETSTREAM_SECRET as string,
  GETSTREAM_APP_ID as string
);

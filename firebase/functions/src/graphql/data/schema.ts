import fs from 'fs';
import path from 'path';

const { gql } = require('apollo-server-cloud-functions');

const typeDefs = fs
  .readFileSync(path.join(__dirname, '../../../../../graphql/schema.graphql'))
  .toString();

const typeDef = gql`
  ${typeDefs}
`;

export default typeDef;

#!/bin/bash
firebase firestore:delete --all-collections --project "titan-dev-1234" -y
# APP_ENV=development yarn ts-node -e "require('./src/cli/seeds').deleteCollections()"

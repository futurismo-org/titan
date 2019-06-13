#!/bin/bash
APP_ENV=development yarn ts-node -e "require('./src/cli/seeds').deleteCollections()"

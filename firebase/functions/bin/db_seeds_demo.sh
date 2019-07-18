#!/bin/bash
APP_ENV=demonstration yarn ts-node -e "require('./src/cli/seeds').createCollections()"

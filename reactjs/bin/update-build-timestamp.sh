#!/bin/bash
timestamp=`date "+%Y/%m/%d %H:%M:%S"`
gitcommitid=`git rev-parse --short HEAD`
echo "export const BUILD_TIMESTAMP = '$timestamp';" > src/constants/buildInfo.ts
echo "export const BUILD_COMMIT_ID = '$gitcommitid';"  >> src/constants/buildInfo.ts

#!/bin/bash
timestamp=`date "+%Y/%m/%d %H:%M:%S"`
echo "export const BUILD_TIMESTAMP = '$timestamp';" > src/constants/buildInfo.ts


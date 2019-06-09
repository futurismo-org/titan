#!/bin/bash
set -euo pipefail
PIDFILE="/tmp/flutter.pid"
if [[ "${1-}" != "" && -e $PIDFILE ]]; then
    if [[ "$1" =~ \/state\/ ]]; then
        kill -USR2 $(cat $PIDFILE)
    else
        kill -USR1 $(cat $PIDFILE)
    fi
fi

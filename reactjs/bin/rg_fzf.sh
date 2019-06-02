#!/bin/bash
rg $@ --vimgrep -g '*.ts' -g "*.tsx" | fzf | cut -f 1 -d " " | awk -F ":" '{ print $1 ":" $2 }' | xargs code -gr

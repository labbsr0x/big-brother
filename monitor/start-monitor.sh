#!/usr/bin/env bash
set -e
set -x

if [[ "$BB_PROMSTER_LEVEL" = "" ]]; then
    echo "BB_PROMSTER_LEVEL must NOT be empty" 1>&2
    exit 4
fi

if [[ $((BB_PROMSTER_LEVEL)) -lt 1 ]]; then
    echo "BB_PROMSTER_LEVEL must be a valid integer greater than 0" 1>&2
    exit 5
fi

ll=$((BB_PROMSTER_LEVEL - 1))
if [[ $ll -eq 0 ]]; then
    export SCRAPE_MATCH_REGEX="l.*"
    export SCRAPE_ETCD_PATH="/clients"
    export SCRAPE_PATHS="/federate"
fi

sh /run.sh # inherited from labbsr0x/bb-promster

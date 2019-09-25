#!/usr/bin/env bash
#!/bin/sh
set -e

if [[ "$ETCD_URLS" != "" ]]; then
    export REGISTRY_ETCD_URL=$ETCD_URLS
    export SCRAPE_ETCD_URL=$ETCD_URLS
fi

if [[ "$REGISTRY_ETCD_URL" = "" ]]; then
    echo "REGISTRY_ETCD_URL must NOT be empty" 1>&2
    exit 1
fi

if [[ "$SCRAPE_ETCD_URL" = "" ]]; then
    echo "SCRAPE_ETCD_URL must NOT be empty" 1>&2
    exit 2
fi

if [[ "$REGISTRY_ETCD_BASE" = "" ]]; then
    echo "REGISTRY_ETCD_BASE must NOT be empty" 1>&2
    exit 3
fi

if [[ "$BB_PROMSTER_LEVEL" = "" ]]; then
    echo "BB_PROMSTER_LEVEL must NOT be empty" 1>&2
    exit 4
fi

if [[ $((BB_PROMSTER_LEVEL)) -lt 1 ]]; then
    echo "BB_PROMSTER_LEVEL must be a valid integer greater than 0" 1>&2
    exit 5
fi

ll=$((BB_PROMSTER_LEVEL - 1)) # lower level
export REGISTRY_SERVICE="l${BB_PROMSTER_LEVEL}"
if [[ $ll -eq 0 ]]; then
    export SCRAPE_ETCD_PATH="/clients" # all clients should be registered inside the /clients etcd path
else
    export SCRAPE_ETCD_PATH="${REGISTRY_ETCD_BASE}/l$ll" # in case we need to scale, big brother monitors will federate themselves
fi

if [[ "$SCRAPE_INTERVAL" = "" ]]; then
    export SCRAPE_INTERVAL="$((BB_PROMSTER_LEVEL * 30))s"
fi

if [[ "$SCRAPE_TIMEOUT" = "" ]]; then
    export SCRAPE_TIMEOUT="$((BB_PROMSTER_LEVEL * 15))s"
fi

sed -i -e 's/$ALERT_MANAGER_URLS/'"${ALERT_MANAGER_URLS}"'/g' "/prometheus.yml.tmpl"

sh /startup.sh # inherited from flaviostutz/promster

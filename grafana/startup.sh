#!/bin/bash
set -e

export GF_LOG_MODE="console"
export GF_PATHS_DATA="/data"
mkdir -p "$GF_PATHS_DATA"

if [[ $PROMETHEUS_URL == "" ]]; then
  echo "PROMETHEUS_URL ENV is required to point to an prometheus alerts instance"
  exit 1
fi

if [[ $PROMETHEUS_ACCESS_TYPE == "" ]]; then
  echo "PROMETHEUS_ACCESS_TYPE is required to instruct grafana how to query the prometheus instancies"
  exit 1
fi

FILE=/etc/grafana/provisioning/datasources/datasource-prometheus.yml

#### DATASOURCES DEFINITIONS ####
if [[ "$PROMETHEUS_URL" != "" ]]; then
cat > $FILE <<- EOM
apiVersion: 1

datasources:
- name: prometheus
  type: prometheus
  access: $PROMETHEUS_ACCESS_TYPE
  url: $PROMETHEUS_URL
  isDefault: true
  version: 1
  editable: true
  
EOM
fi


echo "==datasource-prometheus.yml=="
cat $FILE
echo "============================="

echo "Starting Grafana"

/bin/bash /run.sh
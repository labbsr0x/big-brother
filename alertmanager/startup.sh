#!/usr/bin/env bash
set -e
set -x

cat /alertmanager.yml.tmpl |\
    sed "s@\$WEBHOOK_URL@$WEBHOOK_URL@g" > /etc/alertmanager/alertmanager.yml

echo "alertmanager.yml:"
cat /etc/alertmanager/alertmanager.yml

echo "Starting alertmanager..."
alertmanager --config.file=/etc/alertmanager/alertmanager.yml --storage.path=/alertmanager


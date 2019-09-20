FROM prom/alertmanager:v0.19.0

ENV WEBHOOK_URL ''

VOLUME [ "/alertmanager" ]

ADD alertmanager.yml.tmpl /
ADD startup.sh /

ENTRYPOINT  [ "sh" ]
CMD [ "/startup.sh" ]
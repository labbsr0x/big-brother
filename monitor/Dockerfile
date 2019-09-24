FROM labbsr0x/bb-promster:0.2.0

ADD rules /etc/prometheus/

ADD start-monitor.sh /

RUN chmod 777 /start-monitor.sh

CMD ["-C", "/start-monitor.sh"]
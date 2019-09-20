# Big Brother
This project defines a bot to effectively communicate observability events to application stakeholders

# How does it work



# How to Run

Type the following command in your terminal:
```bash
> TELEGRAM_ADMIN=<yourid> TELEGRAM_TOKEN=<XXXXX:YYYYYY> docker-compose up --build
```

This will run an example app with its `bb-promster` cluster and the `big-brother` app federating it.

The `big-brother` app is composed by a telegram bot, a prometheus alertmanager, a promster cluster with its etcd key-value store.

 

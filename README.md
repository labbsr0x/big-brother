# Big Brother
This project defines a bot to effectively communicate observability events to application stakeholders.  

# How does it work

It collects the necessary metrics from a client provided `bb-promster` cluster endpoint.

Then, the **Big Brother** federates it's own `bb-promster` cluster to the provided endpoint, and starts collecting **Big Brother** specific metrics.

These metrics are defined by our collection of monitoring libraries. 

For now, we only have [express-monitor](https://github.com/labbsr0x/express-monitor) for the Node JS Express framework. 

It gives out the following metrics:

```
http_requests_second{status, method, url, le}
http_requests_second_count{status, method, url}
http_requests_second_sum{status, method, url}
http_response_size_bytes{status, method, url}
dependency_up{name}
```

Where, for a specific request, `status` registers the response HTTP status, `method` registers the HTTP method and `url` registers the requested endpoint.

In detail:

1. The `http_requests_seconds_bucket` metric defines the histogram of how many requests are falling into the well defined buckets represented by the label `le`;
2. The `http_requests_seconds_count` is a counter that counts the overall number of requests with those exact label occurrences;
3. The `http_requests_seconds_sum` is a counter that counts the overall sum of how long the requests with those exact label occurrences are taking;
4. The `http_response_size_bytes` is a counter that computes how much data is being sent back to the user for a given request type. It captures the response size from the `content-length` response header. If there is no such header, the value exposed as metric will be zero;
5. Finally, `dependency_up` is a metric to register weather a specific dependency is up (1) or down (0). The label `name` registers the dependency name;

Soon we'll also have the following libraries:

1. `iris-monitor` for the Katara's Iris web framework;
2. `mux-monitor` for the Gorilla's Mux web framework;
3. `spring-monitor` for the Pivotal's Spring web framework;
4. `ejb-monitor` for Enterprise Java Bean web frameworks;

Without these libraries, you would have to export the metrics by yourself, possibly leading to inconsistencies and other errors when setting up your app's observability with **Big Brother**.  

# How to Run

Type the following command in your terminal:

```bash
TELEGRAM_ADMIN=<yourid> TELEGRAM_TOKEN=<XXXXX:YYYYYY> docker-compose up -d --build

docker-compose exec --env ETCDCTL_API=3 etcd etcdctl put "/clients/example/example-bb-promster:9090" -- ""
```

This will run an example app with its `bb-promster` cluster and the `big-brother` app federating it.

The `big-brother` app is composed by a telegram bot, a prometheus alertmanager, a promster cluster with its etcd key-value store.

# Trivia

The name is inspired by George Orwell's 1984 **Big Brother** character. 

In this book, **Big Brother** is an entity that is *omniconscious*, being able to watch everyone, everywhere. 

This is exactly what we aim to achieve with this project: a way for you to easily and effective watch every project you have without any prior knowledge of the observability principles and practices with Prometheus. 

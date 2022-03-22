# Big Brother
This project defines a service to effectively communicate observability events to application stakeholders.  

# How does it work

![motive](https://raw.githubusercontent.com/labbsr0x/big-brother/assets/big-brotherv0.4.0.png "design")

Basically, it collects the necessary metrics from a client provided [BB Promster](https://github.com/labbsr0x/bb-promster) cluster endpoint.

More specifically, the **Cortex** app monitors and stores metrics sent by the **BB Promster Clusters**, and starts collecting **Big Brother** specific metrics, with the help of some useful programming libraries.


These metrics are treated as the fundamental protocol behind **Big Brother's** capabilities.

## Big Brother Metric Protocol

A valid **Big Brother** library should expose the following metrics: 

```
request_seconds_bucket{type, status, isError, errorMessage, method, addr, le}
request_seconds_count{type, status, isError, errorMessage, method, addr}
request_seconds_sum{type, status, isError, errorMessage, method, addr}
response_size_bytes{type, status, isError, errorMessage, method, addr}
dependency_up{name}
dependency_request_seconds_bucket{name, type, status, isError, errorMessage, method, addr, le}
dependency_request_seconds_count{name, type, status, isError, errorMessage, method, add}
dependency_request_seconds_sum{name, type, status, isError, errorMessage, method, add}
application_info{version}
```

In detail:

1. `request_seconds_bucket` is a metric that defines the histogram of how many requests are falling into the well defined buckets represented by the label `le`;
2. `request_seconds_count` is a counter that counts the overall number of requests with those exact label occurrences;
3. `request_seconds_sum` is a counter that counts the overall sum of how long the requests with those exact label occurrences are taking;
4. `response_size_bytes` is a counter that computes how much data is being sent back to the user for a given request type. It captures the response size from the `content-length` response header. If there is no such header, the value exposed as metric will be zero;
5. `dependency_up` is a metric to register weather a specific dependency is up (1) or down (0). The label `name` registers the dependency name;
6. `dependency_request_seconds_bucket` is a metric that defines the histogram of how many requests to a specific dependency are falling into the well defined buckets represented by the label le;
7. `dependency_request_seconds_count` is a counter that counts the overall number of requests to a specific dependency;
8. `dependency_request_seconds_sum` is a counter that counts the overall sum of how long requests to a specific dependency are taking;
9. Finally, `application_info` holds static info of an application, such as it's semantic version number;


## Labels

For a specific request:

1. `type` tells which request protocol was used (e.g. `grpc`, `http`, etc);
2. `status` registers the response status (e.g. HTTP status code);
3. `method` registers the request method;
4. `addr` registers the requested endpoint address;
5. `version` tells which version of your app handled the request;
6. `isError` lets us know if the status code reported is an error or not;
7. `errorMessage` registers the error message;
8. `name` registers the name of the dependency;


## Ecosystem

The following libraries make part of **Big Brother** official libraries:

1. [`express-monitor`](https://github.com/labbsr0x/express-monitor) for Node JS Express apps;
2. [`servlet-monitor`](https://github.com/labbsr0x/servlet-monitor) for Java Servlets apps;
3. [`quarkus-monitor`](https://github.com/labbsr0x/quarkus-monitor) for Java Quarkus apps;
4. [`flask-monitor`](https://github.com/labbsr0x/flask-monitor) for Python Flask apps;
5. [`mux-monitor`](https://github.com/labbsr0x/mux-monitor) for the Golang Mux apps;
6. [`fiber-monitor`](https://github.com/labbsr0x/fiber-monitor) for the Golang Fiber apps;
7. [`gin-monitor`](https://github.com/bancodobrasil/gin-monitor) for the Golang Gin apps;
8. [TODO] `iris-monitor` for Golang Iris apps;


Without these, you would have to expose the metrics by yourself, possibly leading to inconsistencies and other errors when setting up your app's observability infrastructure with **Big Brother**.   

# Components

The **Big Brother** app is composed by an **ETCD cluster**, a **Dialogflow Bot**, a **Prometheus Alertmanager**, a **Grafana**, a **Promster** cluster, a **Cortex**, and a **BB Manager**,  all with their own configuration needs.

## ETCD

The ETCD cluster serves 3 purposes:

1. Register client `bb-promster` clusters;
2. Register versions of the apps, for updating alerts dynamically;
3. [TODO] Register **Big Brother's** alertmanager cluster, for high availability;

Gets configured by:

1. `ETCD_LISTEN_CLIENT_URLS`: the addresses ETCD daemon listens to client traffic;
2. `ETCD_ADVERTISE_CLIENT_URLS`: list of an ETCD client URLs to advertise to the rest of the cluster; 

## Dialogflow Bot

A bot to communicate with the interested stakeholders. It's purposes are to:

1. Enable CRUD of client apps to be observed by **Big Brother**; and
2. Alert on possible problems; 

## Prometheus Alertmanager

A service to host alerting configuration on top of the alerts being dispatched by the **Promster Cluster**.

Gets configured by:

1. `WEBHOOK_URL`: the bot address

## Grafana

A service to generate graphics to help to query, visualize and understand your metrics.


## BB-Promster Cluster

The service that federate's on the client's `bb-promster` cluster, hosts and evaluates alerting rules and dispatches alerts accordingly.

Gets configured by:

1. [TO BE DEPRECATED] `BB_PROMSTER_LEVEL`: integer greater than 0 that defines which level this promster sits on it's own federation cluster; 
2. `ETCD_URLS`: defines the ETCD cluster urls, separated by comma;
3. `ALERT_MANAGER_URLS`: defines the alertmanager cluster urls;


## Cortex

The service that monitors and stores metrics sent by the **BB Promster Clusters**

## BB-Manager

A front-end interface to register apps and version. 


# How to Run locally

## Using Docker
1. Talk to Telegram's Bot Father, create your own bot and get it's Telegram Token;
2. Open a Dialogflow account, create a new project and import the configs from the folder `bot/dialogflow`;
3. Train your intents;
4. Setup a Telegram integration with the Token obtained in `step 1`;
5. Expose your `port 3001` and inform a reachable HTTPS address to the Dialogflow fulfillment configuration. We recommend using [ngrok](https://ngrok.com) for that; 
6. Type the following commands in your terminal to interact with your bot directly through Telegram:

   ```bash
   TELEGRAM_TOKEN=<XXXXX:YYYYYY> docker-compose up -d --build
   ```

   This will run an example app with its own `bb-promster` cluster and the **Big Brother** app with its components.

7. Now go to the bot on Telegram, and add a new App. Inform the App name (e.g. `Example`) and the app address (e.g. `example-bb-promster:9090`). You'll be automatically subscribed to the app you've just added.

[TO BE DEPRECATED] The example client app `bb-promster` cluster will get registered to the **Big Brother's** ETCD and **Big Brother** will then start collecting metrics by federating it.

Open your browser on `http://localhost:3000` to access the provided Grafana dashboard (user `bigbrother`, password `bigbrother`).

Also, access `http://localhost:3001/test` on your browser to dispatch test alerts and see if you get them at your Telegram chat.

## Using Kubernetes
Follow [this tutorial](https://github.com/labbsr0x/big-brother/blob/master/k8s/README.MD) to run using Kubernetes.

# Trivia

The name is inspired by George Orwell's 1984 **Big Brother** character. 

In this book, **Big Brother** is an entity that is *omniconscious*, being able to watch everyone, everywhere. 

This is exactly what we aim to achieve with this project: a way for you to easily and effectively watch every project you have without any prior knowledge of observability concepts and Prometheus best practices. 

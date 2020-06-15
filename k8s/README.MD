# K8S
This tutorial uses minikube. Some changes needed to be made to work in other clusters.

## Prerequisites
A local cluster using minikube. You can find how to use Kubernetes with minikube [here](https://kubernetes.io/docs/setup/learning-environment/minikube/).

## HOW TO
1. Replace the environment variable `TELEGRAM_TOKEN` inside `bot-deployment.yaml` file with your telegram token.
2. Enable the NGINX Ingress controller:

    ```
    minikube addons enable ingress
    ```

3. Verify if NGINX ingress controller is running:
    
    ```
    kubectl get pods -n kube-system
    ```

4. Once it's running, you can deploy the services, deployments, and PVCs. Follow these steps to deploy the big-brother project: 

*Deploy ingress:* 

```
kubectl apply -f k8s/example-ingress.yaml
```

*Deploy etcd:*

```
kubectl apply -f k8s/etcd-service.yaml
```

```
kubectl apply -f k8s/etcd-deployment.yaml
```

*Deploy example service:*

```
kubectl apply -f k8s/example-service-service.yaml
```

```
kubectl apply -f k8s/example-service-deployment.yaml
```

*Deploy BB-Promster:*

```
kubectl apply -f k8s/bb-promster-service.yaml
```

```
kubectl apply -f k8s/bb-promster-deployment.yaml`
```

*Deploy BB-Promster-L2:*

```
kubectl apply -f k8s/bb-promster-l2-service.yaml
```

```
kubectl apply -f k8s/bb-promster-l2-deployment.yaml
```

*Deploy Bot:*

```
kubectl apply -f k8s/bot-service.yaml
```

```
kubectl apply -f k8s/bot-persistentvolumeclaim.yaml
```

```
kubectl apply -f k8s/bot-deployment.yaml
```

*Deploy Alertmanager:*

```
kubectl apply -f k8s/alertmanager-service.yaml
```

```
kubectl apply -f k8s/alertmanager-persistentvolumeclaim.yaml
```

```
kubectl apply -f k8s/alertmanager-deployment.yaml
```

*Deploy Grafana:* 

```
kubectl apply -f k8s/example-grafana-service.yaml
```

```
kubectl apply -f k8s/example-grafana-deployment.yaml
```

5. You can access by your browser some services, first find your ingress address running the command:

```
kubectl get ingress
```

Then, copy the address field and add the port of the service. These are the services you can access:

`Grafana` - Port: 31330

`Alertmanager` - Port: 31331

`BB-Promster` - Port: 31332

`BB-Promster-l2` Port: 31333

`Bot` - Port: 31335

`Example Service` - Port: 31334

You can modify these ports by changing the nodePort inside each service file. 
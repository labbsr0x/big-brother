Subindo os serviços no minikube local
minikube addons enable ingress


verifique se o nginx controller está rodando
kubectl get pods -n kube-system

once is running, up your services, deployment and pvcs

then
kubectl apply -f k8s/example-ingress.yaml

Alertmanager:
Talvez mudar o valor da env WEBHOOK_URL
kubectl apply -f k8s/alertmanager-service.yaml
kubectl apply -f k8s/alertmanager-persistentvolumeclaim.yaml
kubectl apply -f k8s/alertmanager-deployment.yaml

BB-Promster:
kubectl apply -f k8s/bb-promster-service.yaml
kubectl apply -f k8s/bb-promster-deployment.yaml

BB-Promster-L2:
kubectl apply -f k8s/bb-promster-l2-service.yaml
kubectl apply -f k8s/bb-promster-l2-deployment.yaml

Bot: 
kubectl apply -f k8s/bot-service.yaml
kubectl apply -f k8s/bot-persistentvolumeclaim.yaml
kubectl apply -f k8s/bot-deployment.yaml

etcd:
kubectl apply -f k8s/etcd-service.yaml
kubectl apply -f k8s/etcd-deployment.yaml

Grafana: 
kubectl apply -f k8s/example-grafana-service.yaml
kubectl apply -f k8s/example-grafana-deployment.yaml

Example-Service:
kubectl apply -f k8s/example-service-service.yaml
kubectl apply -f k8s/example-service-deployment.yaml

kubectl get ingress, acesse o servico pelo address:portadoservico. exemplo com a config atual
GRAFANA ADDRESS:31330
FROM abilioesteves/gowebbuilder:v1.0.0 as BUILDER

ENV p $GOPATH/src/github.com/labbsr0x/big-brother/bot

ADD ./ ${p}
WORKDIR ${p}
RUN go get -v ./...

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /bot main.go

FROM alpine as RUNNER

# ENVS

# SETUP
COPY --from=BUILDER /bot /

# RUN
CMD [ "/bot", "serve" ]
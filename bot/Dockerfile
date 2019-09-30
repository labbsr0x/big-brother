FROM abilioesteves/gowebbuilder:1.2.0 as BUILDER

WORKDIR /src/

ADD go.mod .
ADD go.sum .

RUN go mod download

ADD . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /bot main.go

FROM alpine as RUNNER

# ENVS

# SETUP
COPY --from=BUILDER /bot /

# RUN
CMD [ "/bot", "serve" ]
# Load Testing with k6.io

k6 is a modern HTTP load testing tool written in Go.

There is a script in this folder that will fetch `https://radixquote-edcradix-production.playground-v1-5-0.dev.radix.equinor.com/` every 3 seconds.

We tell k6 to run 10 virtual users (--vus) for an average of ~3 requests per second and stop after 60 seconds.

```sh
docker run -i loadimpact/k6 run --vus 1 --duration 60s -< k6-test-script.js
```

After the test is done k6 will output various statistics about latencies and statuses.

## Next steps

k6 is a cool tool and can be scripted to simulate real users and complex workflows including token based logins. It can also continously output statistics to InfluxDB which can be analyzed in Grafana.
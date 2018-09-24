import { check, sleep } from "k6";
import http from "k6/http";

export default function() {
    let res = http.get("https://radixquote-edcradix-production.playground-v1-5-0.dev.radix.equinor.com/");
    check(res, {
        "is status 200": (r) => r.status === 200
    });
    sleep(3);
};

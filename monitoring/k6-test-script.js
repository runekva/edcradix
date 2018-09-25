import { check, sleep } from "k6";
import http from "k6/http";

const url = 'https://radixquote-edcradix-stian-development.playground-v1-5-0.dev.radix.equinor.com/'

export default function() {
    let res = http.get(url);
    check(res, {
        "is status 200": (r) => r.status === 200
    });
    sleep(2);
};

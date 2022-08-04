import http from 'k6/http';
import {sleep, check} from 'k6';


export const options = {
  stages: [
    { duration: '15s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 300 },
    { duration: '30s', target: 600},
    { duration: '15s', target: 700 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 0 },
  ],
}


export default function() {
  const randomNum = Math.floor((Math.random() * 100000));

  const pages = [
    '/products',
    `/products/${randomNum}`,
    `/products/${randomNum}/related`,
    `/products/${randomNum}/styles`,
    '/cart/1234'
  ]

  for (const page of pages) {
    const res = http.get('http://35.172.201.253:3005' + page);
    sleep(1);
    check(res, {
      'is status 200': r => r.status === 200,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
      'transaction time > 2000ms': r => r.timings.duration > 2000,

    })
  }

}
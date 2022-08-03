import http from 'k6/http';
import {sleep, check} from 'k6';


export const options = {
  stages: [
    { duration: '15s', target: 500 },
    { duration: '30s', target: 1000 },
    { duration: '15s', target: 1500 },
    { duration: '30s', target: 2000 },
    { duration: '15s', target: 2500 },
    { duration: '30s', target: 3000 },
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
    const res = http.get('http://localhost:3005' + page);
    sleep(1);
    check(res, {
      'is status 200': r => r.status === 200,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,

    })
  }

}
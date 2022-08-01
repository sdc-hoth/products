import http from 'k6/http';
import {sleep, check} from 'k6';


export const options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
}

const api = 'http://localhost:3005'

export default function() {
  const randomNum = Math.floor((Math.random() * 100));

  http.get(`${api}/products`);
  http.get(`${api}/products/${randomNum}`);
  http.get(`${api}/products/${randomNum}/related`);
  http.get(`${api}/products/${randomNum}/styles`);
  http.get(`${api}/cart`);

  sleep(1);
}
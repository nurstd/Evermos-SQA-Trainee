import http from 'k6/http'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { expect } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// export const options = { vus: 10, duration: '3s' }  

export default function main() {
  const url = 'https://petstore.octoperf.com/actions/Account.action'
  const payload = JSON.stringify({
    username: 'anjing',
    password: '123456788'})

  let response = http.post(url,payload)
  console.log('RESPONSE RESULT: ' +response.status)
  expect(response.status, 'assertion actual').to.equal(200)
}
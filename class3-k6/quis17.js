// import modules
import http from 'k6/http'
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js'

// running setup
export const options = { vus: 10, duration: '3s' }
//POST Register==============================================================================
// export default function main() {
//   const urlSignup = 'https://api.demoblaze.com/signup'
//   const payload = JSON.stringify({
//     username: randomString(8),
//     password: randomString(8)})
//   let response = http.post(urlSignup, payload)
//   console.log('RESPONSE STATUS---------: '+response.status)
//   expect(response.status, 'assertion actual').to.equal(200)
// }
// GET=======================================================================================
export default function main() {
  let response = http.get('https://www.demoblaze.com/prod.html?idp_=4')
  console.log('RESPONSE STATUS---------: '+response.status)
  expect(response.status, 'assertion actual').to.equal(200)
}
// Report Dashboard==========================================================================
export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  };
}
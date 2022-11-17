// importing modules
import {check} from 'k6'
import http from 'k6/http'
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

// define k6 option
export const options = {
  vus: 10,
  duration: '3s'
}

// GET===============================================================

// export default function() {
//   let response = http.get('https://reqres.in/api/users')
//   const email = response.json(['data'][0]['email'])           // body data, array ke 0, diambil data email aja
//   console.log(email)
//   expect(email, 'assertion email').to.equal('evermos@mail.com')
// }

// export default function(){
//  let response = http.get('https://test.k6.io')
//  console.log('RESPONSE BODY==============: '+response.body)
//  console.log('RESPONSE STATUS============: '+response.status)
//  check(response, {
//     'expected code 200': (expected) => expected.status === 200 //expected code
//   })
//   expect(response.status, 'assertion actual').to.equal(200)
// }

// POST===============================================================
export default function() {
  const url = 'https://reqres.in/api/users'
  const payload = JSON.stringify({
      name: 'testing k6',
      job: 'tester',
  })
  const params = {
      headers: {
          'Conten-Type': 'application/json',
      }
  }
  const response = http.post(url, payload, params)
  console.log(response.body)
}

// =======================================================
// define k6 options
// export const options = {
//   vus: 10,
//   duration: '3s'
// }

// setup
const randFN = randomString(5)
const randLN = randomString(12)

// VU code
export default function() {
  const url = 'https://restful-booker.herokuapp.com/booking'
  const payload = JSON.stringify({
    firstname : randFN,
    lastname : randLN,
    totalprice : 200,
    depositpaid : true,
    bookingdates : {
      checkin : "2018-01-01",
      checkout : "2019-01-01"
    },
    additionalneeds : "Breakfast"
  })
  const params = {
    headers: {
      'Conten-Type': 'application/json',
    }
  }
  const response = http.post(url, payload, params)
  console.log('RESPONSE BODY============='+response.body)
  expect(response.status, 'assertion actual').to.equal(200)
}
/*//=============Test==========================
// var text = 'Sambel Mertua'
// var price = 100000
console.log(text + " Rp. " + price)*/

/*//=============Panggil Library===============
const prompt = require('prompt-sync')({sigint: true});

const num1 = prompt('Enter a first number: ');
const num2 = prompt('Enter a second number: ');
 
console.log('first number + second number =');
console.log(Number(num1) + Number(num2));*/

/*//=============GET without Auth==============
const request = require('supertest')('https://reqres.in/api'); //base url
const expect = require('chai').expect;

describe('GET /users', function(){
    it('returns all users', async function(){
        const response = await request.get('/users');   //endpoint

        expect(response.status).to.eql(200);            //expect status code
        expect(response.body.data.length).to.eql(6);    //expect jumlah data

        console.log(response.body);                     //print body data
    });
});*/

/*//=============GET with Auth=================
const request = require("supertest")("http://restapi.adequateshop.com/api");
const expect = require("chai").expect;

describe("GET /users", function () {
  it("returns all users", async function () {
    const response = await request
      .get("/users")
      .set({ Authorization: "Bearer 5a245cbb-1b29-4b0f-9cb6-1914c5ff94e0" });

    expect(response.status).to.eql(200);
    console.log(response.body)
  });
});*/

//==============POST without Auth==============
const request = require("supertest")("https://reqres.in/api");
const expect = require("chai").expect;

describe("POST /users", function () {
  it("create new user", async function () {
    const response = await request
      .post("/users")
      .send({
        "name": "test nama",
        "job": "qa lead"
      });

    expect(response.status).to.eql(201);
    expect(response.body.name).to.eql("test nama");
    expect(response.body.job).to.eql("qa lead");
    console.log(response.body)
  });
});

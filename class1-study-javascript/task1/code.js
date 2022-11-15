
const request = require("supertest")("http://restapi.adequateshop.com/api");
const expect = require("chai").expect;

/*//User Regristration==============================
describe('Registration...........', function (){
    it('User Registration', async function (){
        const response = await request
            .post('/authaccount/registration')
            .send({
                "name":'Bond 007',
                "email":"bond007@test.com",
                "password":'jamesbond'
            });

        console.log(response.body);
        expect(response.status).to.eql(200);
        expect(response.body.data.Name).to.eql('Bond 007');
        expect(response.body.data.Email).to.eql('bond007@test.com');
        
    })
})*/

//User Login======================================
describe('Login...............', function (){
    it('User Login', async function (){
        const response = await request
            .post('/authaccount/login')
            .send({
                "email":"bond007@test.com",
                "password":'jamesbond'
            });

        console.log(response.body);
        expect(response.status).to.eql(200);
        expect(response.body.data.Name).to.eql('Bond 007');
        expect(response.body.data.Email).to.eql('bond007@test.com');
    })
})

//Creating User===================================
describe('Creating.........', function (){
    it('Create New User', async function (){
        const response = await request
            .post('/users')
            .set({ Authorization: "bearer 137f2d35-2558-4506-9465-bcd5c9a7d34d" })
            .send({
                "name":"FBI Agent",
                "email":"fbiagent@test.com",
                "location":'Yogyakarta'
            });

        console.log(response.body);
        expect(response.status).to.eql(201);
        expect(response.body.name).to.eql('FBI Agent');
        expect(response.body.email).to.eql('fbiagent@test.com');
        expect(response.body.location).to.eql('Yogyakarta');
    })
})

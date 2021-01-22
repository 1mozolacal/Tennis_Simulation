//require('jest')
const supertest = require('supertest')
const app = require('../app.js')
const request = supertest(app)

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
  })

it('Get the game info', async done =>{
    const response = await request.get('/api/fullGameInfo')

    expect(response.status).toBe(200);
    done()
})

it('A game that is running has no winner', async done =>{
    const response = await request.get('/api/fullGameInfo')

    if( !response.body[0].won){
        expect( response.body[0].winner).toBe("NULL");
    }
    expect(response.status).toBe(200);
    done()
})

//test reseting games
it('A game that is running has no winner', async done =>{
    await request.put('/api/hardreset')
    const response = await request.get('/api/fullGameInfo')

    expect( response.body[0].winner).toBe("NULL");
    expect( response.body[0].won).toBe(false);
    expect( response.body[0].score1).toBe(0);
    expect( response.body[0].score2).toBe(0);
    expect( response.body[0].scoreName).toBe("0-0");
    expect(response.status).toBe(200);
    done()
})
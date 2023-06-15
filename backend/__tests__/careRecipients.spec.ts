import app from '../src/application'
import request from 'supertest';

describe('/care-recipients', () => {
  it('returns all care recipients', async () => {
    await request(app)
      .get('/care-recipients')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  })

  it('returns all attributes for care recipients', async () => {
    await request(app)
      .get('/care-recipients')
      .expect(200)
      .expect((res) => {
        const careRecipient = res.body.data[0]
        expect(careRecipient).toHaveProperty('id');
        expect(careRecipient).toHaveProperty('name');
      });
  })
});

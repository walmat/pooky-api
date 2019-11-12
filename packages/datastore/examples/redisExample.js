const redis = require('redis');
const RedisApi = require('../dist/api/redisApi').default;

const client = redis.createClient();
const api = new RedisApi('test', client);

api
  .browse()
  .then(payload => {
    console.log(payload);
    return api.add({ test: 'add1' });
  })
  .then(payload => {
    console.log(payload);
    return api.read(payload.id);
  })
  .then(payload => {
    console.log(payload);
    return api.edit(payload.id, { test: 'add2' });
  })
  .then(payload => {
    console.log(payload);
    return api.delete(payload.id);
  })
  .then(payload => {
    console.log(payload);
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    client.quit();
  });

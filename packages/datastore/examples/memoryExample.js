const MemoryApi = require('../dist/api/memoryApi').default;

const api = new MemoryApi('test');

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
  });

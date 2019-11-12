const { promisify } = require('util');

// The array is exported here for testing purposes
// Array is subject to change as we include more redis functionality
export const methodsToAutoConvert = ['smembers', 'get', 'set', 'del', 'sadd', 'srem', 'exists'];

export default function promisifyClient(client) {
  const updatedClient = client;
  if (!client || client.__promisified) {
    return client;
  }

  methodsToAutoConvert.forEach(name => {
    if (client[name]) {
      updatedClient[`${name}Async`] = promisify(client[name]).bind(client);
    }
  });
  // Special methods
  updatedClient.multiExecAsync = args =>
    new Promise((resolve, reject) => {
      client.multi(args).exec((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });

  updatedClient.__promisified = true;
  return updatedClient;
}

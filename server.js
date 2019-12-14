const fastify = require('fastify');
const path = require('path');

const PORT = 8080;

const server = fastify({ logger: true });

server.register(require('fastify-static'), {
  root: path.join(__dirname, '/build'),
})

server.get('/api/v1/check', (request, reply) => {
  return reply.send({ status: 'ok' });
})

server.get('/', function (req, reply) {
  return reply.sendFile('index.html');
})

server.listen(PORT, (error) => {
  if (error) throw error;
})

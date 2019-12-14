const fastify = require('fastify');

const PORT = 8080;

const server = fastify({ logger: true });

server.get('/api/v1/check', (request, reply) => {
  return reply.send({ status: 'ok' });
})

server.listen(PORT, (error) => {
  if (error) throw error;
})

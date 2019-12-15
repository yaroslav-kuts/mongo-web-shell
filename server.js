const fastify = require('fastify');
const path = require('path');

const { buildQuery } = require('./executor');

const PORT = 8080;

const server = fastify({ logger: true });

server.register(require('fastify-static'), {
  root: path.join(__dirname, '/build'),
})

server.get('/api/v1/check', (request, reply) => {
  return reply.send({ status: 'ok' });
})

server.post('/api/v1/execute', async (req, reply) => {
  const { uri, script } = JSON.parse(req.body);

  const query = await buildQuery(uri, script);
  const data = await query.execute();

  return reply.send({ data });
})

server.get('/', function (req, reply) {
  return reply.sendFile('index.html');
})

server.listen(PORT, (error) => {
  if (error) throw error;
})

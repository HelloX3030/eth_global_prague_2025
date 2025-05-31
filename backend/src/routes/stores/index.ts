import { FastifyPluginAsync } from 'fastify'

const stores: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/all', async function (request, reply) {
    return ("Stores API is working");
  })
}

export default stores;

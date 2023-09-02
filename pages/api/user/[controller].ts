import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { withUsers } from '@/middleware/withUsers'
import { withContext } from '@/middleware/withContext'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { controller } = req.query

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  
  res.status(200).json({ foo: withContext(req, controller) })
}

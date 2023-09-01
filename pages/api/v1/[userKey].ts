import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userKey } = req.query
  console.log(userKey)
  return res.send(`Post: ${userKey}`)
}
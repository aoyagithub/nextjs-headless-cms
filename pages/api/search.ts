import { client } from 'libs/client'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q: any = req.query.q
  if (!q) {
    res.status(400).json({ error: `Missing "q" query parameter` })
  }

  return client
    .get({
      endpoint: 'articles',
      queries: { q },
    })
    .then((data) => {
      res.status(200).json({ data })
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

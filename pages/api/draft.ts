import { client } from 'libs/client'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: any = req.query.id
  const draftKey = req.query.draftKey as string
  if (!id || !draftKey) {
    res.status(400).json({ error: `Missing query parameter` })
  }

  return client
    .get({
      endpoint: 'articles',
      contentId: id,
      queries: { draftKey, depth: 2 },
    })
    .then((data) => {
      res.status(200).json({ data })
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

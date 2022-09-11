import { createTransport } from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    service: process.env.MAILSERVICE,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.PASSWORD,
    },
  })
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: 'Contact',
    text: req.body,
  })

  res.status(200).json({
    success: true,
  })
}

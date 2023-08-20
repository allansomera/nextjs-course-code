import dbConnect from '@lib/utils/dbConfig'
import { getCommentsById } from '../../../../helpers/api-utils'
import Comment from '../../../../models/commentsModel'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addComment(req, res) {
  try {
    console.log('CONNECTING TO MONGO')
    await dbConnect()
    console.log('CONNECTED TO MONGO')
    console.log('CREATING DOCUMENT')
    if (req.method === 'POST') {
      const comment = await Comment.create({
        ...req.body.data,
        event_id: req.query.event_id,
      })
      console.log('CREATED DOCUMENT')

      res.status(201).json({ comment })
    }

    if (req.method === 'GET') {
      let comments = await getCommentsById(req.query.event_id)
      console.log(comments)
      res.status(200).json(comments)
    }
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

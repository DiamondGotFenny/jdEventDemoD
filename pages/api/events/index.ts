import { NextApiHandler } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { events } = require('./data.json');

const index: NextApiHandler = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(events);
  } else {
    res.setHeader('Allow', ['Get']);
    res.status(405).json({ msg: `${req.method} method is not allow` });
  }
};

export default index;

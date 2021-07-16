import { NextApiHandler } from 'next';

const { events } = require('./data.json');

const djEvent: NextApiHandler = (req, res) => {
  const evt = events.filter((evt) => evt.slug === req.query.slug);
  if (req.method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['Get']);
    res.status(405).json({ msg: `${req.method} method is not allow` });
  }
};

export default djEvent;

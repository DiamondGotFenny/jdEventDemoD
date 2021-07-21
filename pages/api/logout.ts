import cookie from 'cookie';
const logout = async (req, res) => {
  if (req.method === 'POST') {
    //destroy cookie
    //res.clearCookie('token');
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        expires: new Date(0),
        sameSite: 'strict',
      })
    );
    res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default logout;

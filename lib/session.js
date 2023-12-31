import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function setSession(res, session) {
  const token = jwt.sign(session, secret);
  const cookieValue = cookie.serialize('session', token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 , 
    sameSite: 'strict',
    path: '/',
  });
  res.setHeader('Set-Cookie', cookieValue);
}

export function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.session;
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

export function destroySession(res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );
}

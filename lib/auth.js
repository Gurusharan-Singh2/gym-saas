const { SignJWT, jwtVerify } = require('jose');
const bcrypt = require('bcryptjs');
const { cookies } = require('next/headers');

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'aura_athletics_super_secret_jwt_key_2026_luxury_brand'
);
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'aura_session_token';

async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  getSession,
  COOKIE_NAME,
};

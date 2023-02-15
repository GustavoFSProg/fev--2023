import md5 from 'md5'
import jwt from 'jsonwebtoken'


export async function generateToken(data: any) {
  const { email, password } = data
  return jwt.sign({ email, password }, String(process.env.SECRET), {
    expiresIn: '1d',
  })
}

// export async function decodeToken(token) {
//   return jwt.decode(token, process.env.GLOBAL_SAL_KEY)
// }

export function verifyToken(token: any) {
  return jwt.verify(token, String(process.env.SECRET), (error: any, decode: any) => {
    if (error) return { error }
    return { decode }
  })
}

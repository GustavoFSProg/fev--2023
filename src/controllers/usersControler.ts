import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'

const prisma = new PrismaClient()

async function getAllusers(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(201).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function RegisterUser(req: Request, res: Response) {
  try {
     
    const emailData = await prisma.users.findFirst({
      where: {email: req.body.email}
    })

    if (emailData !== null) {
      return res.status(200).send({msg: "Email ja cadastrado"})
    }

    await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
         password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
        }, 
      },
    )

    return res.status(201).json({ msg: 'Success!!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}


async function UpdateUser(req: Request, res: Response) {
  try {
    await prisma.users.update({
      where: {id: req.params.id},
      data: {
        name: req.body.name,
        email: req.body.email,
         password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),

      },
    })

    return res.status(201).json({ msg: 'Success!!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}


async function DeleteAllUser(req: Request, res: Response) {
  try {
    await prisma.users.deleteMany()

    return res.status(201).json({ msg: 'Success!!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}


async function DeleteUser(req: Request, res: Response) {
  try {
    await prisma.users.delete({
      where: {id: req.params.id},
    
    })

    return res.status(201).json({ msg: 'Success!!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function Login(req: Request, res: Response) {
  try {
    const { password, email } = req.body
    
    const data = await prisma.users.findFirst({
      where: {
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
        email: email
      }
    })

    if (!data) {
      return res.status(400).send({msg: "Email ou nome Invalidos!!"})
    }

    const Token = await generateToken({password, email})

    return res.status(200).send({data, Token})

  } catch (error) {
    return res.status(400).send({msg: "User not found!!"})
  }
}


export default { DeleteAllUser, getAllusers, Login, UpdateUser,DeleteUser, RegisterUser }

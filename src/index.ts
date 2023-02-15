import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usersControler from './controllers/usersControler'
import routes from './routes'

dotenv.config()

const { PORT } = process.env 

const api = express()

api.use(cors())
api.use(express.json())
api.use(routes)

api.listen(PORT, () => {
  console.log(` 🍷 Api running: ${PORT}`)
})

api.get('/', (req: Request, res: Response) => {
 return res.json({ msg: ` 🍆 GET Api running: ${PORT}`})
})



export default api
import { Router } from "express"
import usersControler from "./controllers/usersControler"

const routes = Router()

routes.get('/get-users', usersControler.getAllusers)
routes.post('/register-users', usersControler.RegisterUser)
routes.post('/login', usersControler.Login)
routes.put('/update-users/:id', usersControler.UpdateUser)
routes.delete('/delete-users/:id', usersControler.DeleteUser)
routes.delete('/delete-all', usersControler.DeleteUser)


export default routes




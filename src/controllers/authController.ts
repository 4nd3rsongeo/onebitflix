import {Request, Response} from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
    //POST /auth/register
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body
        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists) {
                return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
            }
            const user = await userService.create({
                firstName,
                lastName,
                birth,
                phone,
                email,
                password,
                role:'user'
            })
            return res.status(201).json(user)
        } catch (err) {
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //POST /auth/login
    login:  async (req:Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await userService.findByEmail(email)
            if(!user) return res.status(404).json({message: 'E-mail não registrado.'})

            user.checkPassword(password, (err, isSame)=> {
                if(err) return res.status(400).json({ message:  err.message })
                if(!isSame) return res.status(401).json({ message: 'Senha incorreta.'})
                
                const payload = {
                    id: String(user.id),
                    email: user.email,
                    firstName: user.firstName                    
                }
                const token = jwtService.sign(payload)
                return res.status(200).json({ authenticated: true, ...payload, token})
            })
        } catch (err) {
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}
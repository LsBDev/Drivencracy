import { Router } from "express"
import { registerChoice } from "../controllers/choice.controllers"


const choiceRouter = Router()

choiceRouter.post("/choice", registerChoice)
// choiceRouter.post("/choice/:id/vote", funcao)
// Falta os controllers
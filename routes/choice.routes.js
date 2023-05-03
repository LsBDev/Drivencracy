import { Router } from "express"
import { getChoice, registerChoice } from "../controllers/choice.controllers"


const choiceRouter = Router()

choiceRouter.post("/choice", registerChoice)
choiceRouter.get("/poll/:id/choice", getChoice)
// choiceRouter.post("/choice/:id/vote", funcao)
// Falta os controllers
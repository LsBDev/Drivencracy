import { Router } from "express"
import { getChoice, registerChoice, voteChoice } from "../controllers/choice.controllers.js"


const choiceRouter = Router()

choiceRouter.post("/choice", registerChoice)
choiceRouter.get("/poll/:id/choice", getChoice)
choiceRouter.post("/choice/:id/vote", voteChoice)

export default choiceRouter

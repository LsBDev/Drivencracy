import { Router } from "express"
import { allPolls, registerPoll, result } from "../controllers/poll.controllers.js"

const pollRoutes = Router()

pollRoutes.post("/poll", registerPoll)
pollRoutes.get("/poll", allPolls)
pollRoutes.get("/poll/:id/result", result)

export default pollRoutes
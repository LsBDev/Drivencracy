import { Router } from "express"
import { allPolls, registerPoll, result } from "../controllers/poll.controllers"

const pollRoutes = Router()

pollRoutes.post("/poll", registerPoll)
pollRoutes.get("/poll", allPolls)
pollRoutes.get("/poll/:id/result", result)
import express, { json } from "express"
import cors from "cors"
import router from "../routes/index.routes.js"

const app = express()
app.use(json())
app.use(cors())
app.use(router)


const PORT = 5000
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))
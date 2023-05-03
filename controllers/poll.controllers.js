import { db } from "../database/database.connection"
import dayjs from "dayjs"


export async function registerPoll(res, req) {
  const {title, expireAt} = req.body

  try {
    if(!title) {
      return res.sendStatus(422)
    }

    const exist = await db.collection("polls").findOne({title: title})
    if(exist) {
      return res.status(409).send("Enquete já existe!")
    }
    if(!expireAt) {
      expireAt = dayjs().format("YYYY-MM-DD hh:mm") //como acrescentar 30 dias a partir do atual?
    }
    
    const poll = {title, expireAt}
    await db.collection("polls").insertOne(poll)
    res.status(201).send("Enquete salva com sucesso!")

  } catch(err) {
    res.send(err.message)
  }
}

export async function allPolls(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray()
    res.status(200).send(polls)

  } catch(err) {
    res.send(err.message)
  }
}


// export async function getPoll(req, res) {

// }
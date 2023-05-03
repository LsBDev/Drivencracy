import { ObjectId } from "mongodb"
import { db } from "../database/database.connection"


export async function registerChoice(req, res) {
  const {title, pollId} = req.body

  if(!title) {
    res.sendStatus(422)
  }

  try {
    const findPoll = await db.collection("polls").findOne({_id: ObjectId(pollId)})
    const existChoise = await db.collection("choices").findOne({title: title})
    if(!findPoll) {
      return res.status(404).send("Enquete não encontrada!")
    }
    if(existChoise) {
      return res.status(409).send("Essa opção já existe!")
    }
    
    //prazo da enquete, ver como fazer

    await db.collection("choices").insertOne(req.body)


  } catch(err) {
    res.send(err.message)
  }

}
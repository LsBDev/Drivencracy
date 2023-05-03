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
    res.status(201).send(req.body)

  } catch(err) {
    res.send(err.message)
  }

}

export async function getChoice(req, res) {
  const {id} = req.params

  try {
    const choices = await db.collection("choices").find({pollId: id}).toArray()
    if(!choices) {
      return res.sendStatus(404)
    }
    res.status(200).send(choices)

  } catch(err) {
    res.send(res.message)
  }
}

export async function voteChoice(req, res) {
  const {id}= req.params
  
  try {
    const vote = await db.collection("choices").findOne({_id: id})
    if(!vote) {
      return res.status(404).send("Opção não existe!")
    }
    //ver tempo de expiração da enquete -> retornar 403
    const objectVote = 
    {
      _id: id
      date: dayjs().format("HH:mm:ss")
    }

    await db.collection("votes").insertOne(objectVote)
    res.sendStatus(201)

  } catch(err) {
    res.send(err.message)
  }
}
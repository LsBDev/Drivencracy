import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"
import dayjs from "dayjs"


export async function registerChoice(req, res) {
  const {title, pollId} = req.body

  if(!title) {
    res.sendStatus(422)
  }

  try {
    const findPoll = await db.collection("polls").findOne({_id: new ObjectId(pollId)})
    const existChoice = await db.collection("choices").findOne({title: title})
    if(!findPoll) {
      return res.status(404).send("Enquete não encontrada!")
    }
    if(existChoice) {
      return res.status(409).send("Essa opção já existe!")
    }
    if(findPoll.expireAt < dayjs().format("YYYY-MM-DD HH:mm")) {
      return res.status(403).send("Enquete expirada!")
    }

    await db.collection("choices").insertOne(req.body)
    res.status(201).send(req.body)

  } catch(err) {
    res.send(err.message)
  }

}


export async function getChoice(req, res) {
  const {id} = req.params

  try {
    const poll = await db.collection("polls").findOne({_id: new ObjectId(id)})
    if(!poll) {
      return res.status(404).send("Enquete não existe!")
    }
    const choices = await db.collection("choices").find({pollId: id}).toArray()
    res.status(200).send(choices)

  } catch(err) {
    res.send(res.message)
  }
}


export async function voteChoice(req, res) {
  const {id}= req.params
  
  try {
    const choice = await db.collection("choices").findOne({_id: new ObjectId(id)})
    if(!choice) {
      return res.status(404).send("Opção não existe!")
    }
    const poll = await db.collection("polls").findOne({_id: new ObjectId(choice.pollId)})
    if(poll.expireAt < dayjs().format("YYYY-MM-DD HH:mm")) {
      return res.status(403).send("Enquete expirada!")
    }

    const objectVote =
    { 
      createdAt: dayjs().format("HH:mm:ss"),
      choiceId: id
    }

    await db.collection("votes").insertOne(objectVote)
    res.sendStatus(201)

  } catch(err) {
    res.send(err.message)
  }
}

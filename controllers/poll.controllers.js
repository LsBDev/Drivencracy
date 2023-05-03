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
      expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm")
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


export async function result(req, res) {
  const {id} = req.params

  try {
    const poll = await db.collection("polls").findOne({_id: ObjectId(id)})
    if(!poll) {
      return  sendStatus(404)
    }
    const choices = await db.collection("choices").find({pollId: id}).toArray()
    const results = choices.map( async (item) => {      
      const votes = await db.collection("votes").find({choiceId: item._id }).toArray()
      return {title: item.title, votes: votes.length}
    })
    const newObject = {...poll}
    newObject.result = results

  } catch(err) {
    res.send(err.message)
  }
}

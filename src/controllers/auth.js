import db from "../config/databases.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

// collections
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");
const banksCollection = db.collection("banks");

export async function singUp(req, res) {
  const { name, email, password } = req.body;

  // check if email or name already exist
  const user = await usersCollection
    .findOne({
      $or: [{ email }, { name }],
    })
    .catch((err) => {
      console.log("Erro no findOne", err.message);
      return res.status(500).send("Internal server error");
    });
  if (user) {
    return res.status(400).send("Email or name already in use");
  }

  // password crypt
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);

  // create user in database
  await usersCollection.insertOne({
    name,
    email,
    password: passHash,
  });

  // create user bank in satabase
  await banksCollection.insertOne({
    name,
    balance: 0,
    changes: [],
  });

  // send status and token
  res.status(200).send("User created");
}

export async function singIn(req, res) {
  const { email, password } = req.body;

  // search for email
  const user = await usersCollection
    .findOne({
      email,
    })
    .catch((err) => {
      console.log("Erro no findOne", err.message);
      return res.status(500).send("Internal server error");
    });
  if (!user) {
    return res.status(400).send("Email or password is not valid");
  }

  // password validation
  const correcPassword = await bcrypt.compare(password, user.password);
  if (!correcPassword) {
    return res.status(400).send("Email or password is not valid");
  }

  // create token
  const token = uuidV4();

  const session = {
    name: user.name,
    token,
  };

  // create session
  await sessionsCollection.insertOne(session);

  // send status and token
  res.status(200).send(session);
}

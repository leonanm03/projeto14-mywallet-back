import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import {
  sessionsCollection,
  usersCollection,
  walletsCollection,
} from "../config/collections.js";

// singUp in database
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

  // create user wallet in database
  await walletsCollection.insertOne({
    name,
    balance: 0,
    changes: [],
  });

  // send status and token
  res.status(200).send("User created");
}

// create session in database
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
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
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

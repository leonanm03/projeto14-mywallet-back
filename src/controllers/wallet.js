import { walletsCollection } from "../config/collections.js";

export async function getWallet(req, res) {
  const { name } = res.locals.session;

  // get user's wallet
  const wallet = await walletsCollection.findOne({ name });

  console.log("wallet: ", wallet);

  // send user's wallet
  res.status(200).send(wallet);
}

export async function addChangeWallet(req, res) {
  // get user's name from locals session
  const { name } = res.locals.session;

  const { value, description, type } = req.body;

  // get user's wallet
  const userWallet = await walletsCollection.findOne({ name });

  const today = new Date();
  const date = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  console.log(date);

  const newChange = {
    date,
    value,
    description,
    type,
  };

  if (type === "in") {
    userWallet.balance += Number(value);
  } else {
    userWallet.balance -= Number(value);
  }
  userWallet.balance = Math.round(userWallet.balance * 100) / 100;

  userWallet.changes.push(newChange);

  await walletsCollection.updateOne(
    { name },
    { $set: { balance: userWallet.balance, changes: userWallet.changes } }
  );

  // send status
  res.status(200).send("Change added to wallet");
}

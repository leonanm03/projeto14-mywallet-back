import {
  sessionsCollection,
  walletsCollection,
} from "../config/collections.js";

export async function getWallet(req, res) {
  const { name } = res.locals.session;

  // get user's wallet
  const wallet = await walletsCollection.findOne({ name });

  // send user's wallet
  res.status(200).send(wallet);
}

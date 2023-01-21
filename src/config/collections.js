import db from "./databases.js";

export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const walletsCollection = db.collection("wallets");

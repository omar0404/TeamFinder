import { getDatabase, ref, onValue, set } from "firebase/database";
const db = getDatabase();

export const roomsRef = ref(db, "Rooms");
export const roomRef = path => ref(db, `Rooms/${path}`);
export const teamsRef = ref(db, "Teams");
export const usersRef = ref(db, "Users")

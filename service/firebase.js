import { getDatabase, ref, remove, update, set } from "firebase/database";
const db = getDatabase();

// db refs
export const roomsRef = ref(db, "Rooms");
export const roomRef = path => ref(db, `Rooms/${path}`);
export const teamsRef = ref(db, "Teams");
export const usersRef = ref(db, "Users")
export const userRef = id => ref(db, `Users/${id}`)


export default (function firebaseService() {
  let user;
  return {
    setUser: _user => user = _user,
    leaveRoom: (teamDivision, roomId) => {
      remove(roomRef(`${teamDivision}/${roomId}/awayTeam`)).then(res => {
      })
      remove(userRef(`${user.id}/joinedRoomId`)).then(res => {
      })
      update(roomRef(`${teamDivision}/${roomId}`), { status: 'empty', awayTeamReady: false }).then(res => {
      })
    },
    joinRoom: (teamDivision, roomId) => {
      update(userRef(user.id), { joinedRoomId: roomId })
      update(roomRef(`${teamDivision}/${roomId}`), {
        awayTeam: user.team,
        status: "full"
      });
    }
  }
})()
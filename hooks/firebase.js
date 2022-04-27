import { useEffect, useState } from "react"
import { onValue } from 'firebase/database';

export const useOnValue = (ref) => {
  const [data, setData] = useState()
  useEffect(() => {
    onValue(ref, snapshot => {
      setData(snapshot.val())
    })

  }, [])
  return [data, setData]
}
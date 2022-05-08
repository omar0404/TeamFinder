import { useEffect, useState } from "react"
import { onValue } from 'firebase/database';

export const useOnValue = (ref, key) => {
  const [data, setData] = useState()
  useEffect(() => {
    const unsubscribe = onValue(ref, snapshot => {
      setData(snapshot.val())
    })
    return () => {
      unsubscribe()
    }
  }, [key])
  return [data, setData]
}
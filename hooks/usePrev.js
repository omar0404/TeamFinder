import { useEffect, useRef } from "react"
export const usePrev = (value) => {
  const prevValue = useRef(value)
  useEffect(() => {
    prevValue.current = value
  }, [value])
  return prevValue.current
}


import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useLocalStorage = (storageKey) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const get = async () => {
    try {
      let data = await AsyncStorage.getItem(storageKey)
      setData(JSON.parse(data))
    } catch (error) {
      console.log("error".error)
      setData(null)
    }
    finally {
      setIsLoading(false)
    }
  }
  const setValue = async value => {
    setIsLoading(true)
    await AsyncStorage.setItem(storageKey, JSON.stringify(value))
    setData(value)
    setIsLoading(false)
  }
  useEffect(() => {
    get()
  }, [])
  return [data, isLoading, setValue]
}
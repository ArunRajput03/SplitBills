const useLocalStorage = (data, key) => {
  const locData = localStorage.getItem(key)
  if (locData === null) {
    //set Data here
  }
}

export default useLocalStorage

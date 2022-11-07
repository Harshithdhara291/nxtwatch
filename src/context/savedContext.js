import React from 'react'

const SavedContext = React.createContext({
  savedVideosList: [],
  addVideo: () => {},
  removeCartItem: () => {},
})

export default SavedContext

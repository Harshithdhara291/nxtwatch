import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SavedContext from './context/savedContext'

import './App.css'

class App extends Component {
  state = {savedVideosList: []}

  addVideo = product => {
    const {savedVideosList} = this.state
    const productObject = savedVideosList.find(each => each.id === product.id)
    if (productObject === undefined) {
      const updatedCartList = [...savedVideosList, product]
      this.setState({savedVideosList: updatedCartList})
    } else {
      const updatedCartList = savedVideosList.filter(
        each => each.id !== product.id,
      )

      this.setState({savedVideosList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {savedVideosList} = this.state
    const updatedCartList = savedVideosList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({savedVideosList: updatedCartList})
  }

  // const productObject = savedVideosList.find(
  //   each => each.id === product.id,
  // )

  // if (productObject) {
  //   this.setState(prevState => ({
  //     cartList: prevState.cartList.map(eachCartItem => {
  //       if (productObject.id === eachCartItem.id) {
  //         const updatedQuantity = eachCartItem.quantity + product.quantity

  //         return {...eachCartItem, quantity: updatedQuantity}
  //       }

  //       return eachCartItem
  //     }),
  //   }))
  // } else {
  //   const updatedCartList = [...savedVideosList, product]

  //   this.setState({savedVideosList: updatedCartList})
  // }

  render() {
    const {savedVideosList} = this.state
    return (
      <SavedContext.Provider
        value={{
          savedVideosList,
          addVideo: this.addVideo,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedContext.Provider>
    )
  }
}

export default App

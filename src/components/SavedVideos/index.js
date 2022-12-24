import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import SavedItem from '../SavedItem'

import {
  MainCont,
  Images,
  ContOne,
  ContTwo,
  ListItem,
  Navheader,
  LogoImg,
  Contact,
  SearchImage,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  IconBtn,
  Linked,
} from './styledComponents'
import SavedContext from '../../context/savedContext'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

class Home extends Component {
  state = {
    isDark: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeTheme = () => {
    const {isDark} = this.state
    this.setState({isDark: !isDark})
  }

  renderHeader() {
    const {isDark} = this.state

    return (
      <Navheader color={isDark ? '#0f0f0f' : '#f9f9f9'}>
        <div>
          <Linked to="/">
            <LogoImg
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="nxt watch logo"
            />
          </Linked>
        </div>
        <Navcontainer>
          <IconBtn type="button" onClick={this.changeTheme}>
            {isDark ? <FSun /> : <FMoon />}
          </IconBtn>
          <ProfileImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <Popup
            modal
            focus
            trigger={<button type="button">Logout</button>}
            overlayStyle={{
              background: 'grey',
              height: '200px',
              width: '300px',
              marginLeft: '500px',
              marginTop: '200px',
              borderRadius: '30px',
              padding: '20px',
            }}
          >
            {close => (
              <>
                <div>
                  <p>Are you sure, you want to logout?</p>
                </div>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button type="button" onClick={this.onClickLogout}>
                  Confirm
                </button>
              </>
            )}
          </Popup>
        </Navcontainer>
      </Navheader>
    )
  }

  renderVideosListView = () => (
    <SavedContext.Consumer>
      {value => {
        const {savedVideosList} = value
        const shouldShowList = savedVideosList.length > 0

        return shouldShowList ? (
          <div>
            <ul>
              {savedVideosList.map(video => (
                <SavedItem video={video} key={video.id} />
              ))}
            </ul>
          </div>
        ) : (
          <>
            <SearchImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </>
        )
      }}
    </SavedContext.Consumer>
  )

  // https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png alt should be no saved videos

  render() {
    const {isDark} = this.state

    return (
      <>
        <div>{this.renderHeader()}</div>
        <MainCont color={isDark ? '#0f0f0f' : '#f9f9f9'}>
          <ContOne>
            <ul>
              <Linked to="/">
                <ListItem>
                  <AiFillHome /> Home
                </ListItem>
              </Linked>
              <ListItem>
                <Linked to="/trending">
                  <AiFillFire /> Trending
                </Linked>
              </ListItem>

              <ListItem>
                <Linked to="/gaming">
                  <AiFillHeart /> Gaming
                </Linked>
              </ListItem>

              <ListItem>
                <Linked to="/saved-videos">
                  <MdPlaylistAdd /> Saved
                </Linked>
              </ListItem>
            </ul>
            <div>
              <h1>CONTACT US</h1>
              <div>
                <Images
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <Images
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <Images
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <Contact>
                <p>
                  Enjoy! Now to see your
                  <br /> channels and
                  <br /> recommendations!
                </p>
              </Contact>
            </div>
          </ContOne>
          <ContTwo>
            <div>
              <h1>
                <span>
                  <AiFillFire />
                </span>
                Saved Videos
              </h1>
            </div>
            {this.renderVideosListView()}
          </ContTwo>
        </MainCont>
      </>
    )
  }
}

export default Home

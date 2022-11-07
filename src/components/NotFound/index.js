import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import TrendingItem from '../TrendingItem'
import {
  MainCont,
  Images,
  ContOne,
  ListItem,
  UnList,
  Navheader,
  LogoImg,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  IconBtn,
} from './styledComponents'

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
          <Link to="/">
            <LogoImg
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="nxt watch logo"
            />
          </Link>
        </div>
        <Navcontainer>
          <IconBtn type="button" onClick={this.changeTheme}>
            {isDark ? <FSun /> : <FMoon />}
          </IconBtn>
          <ProfileImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </Navcontainer>
      </Navheader>
    )
  }

  render() {
    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken === undefined) {
    //   return <Redirect to="/login" />
    // }

    const {isDark} = this.state
    const image = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
    return (
      <>
        <div>{this.renderHeader()}</div>
        <MainCont color={isDark ? '#0f0f0f' : '#f9f9f9'}>
          <ContOne>
            <ul>
              <ListItem>
                <Link to="/">
                  <AiFillHome /> Home
                </Link>
              </ListItem>

              <ListItem>
                <Link to="/trending">
                  <AiFillFire /> Trending
                </Link>
              </ListItem>

              <ListItem>
                <Link to="/gaming">
                  <AiFillHeart /> Gaming
                </Link>
              </ListItem>

              <ListItem>
                <Link to="/saved-videos">
                  <MdPlaylistAdd /> Saved videos
                </Link>
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
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </ContOne>
          <div>
            <img src={image} alt="not found" />
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found</p>
          </div>
        </MainCont>
      </>
    )
  }
}

export default Home

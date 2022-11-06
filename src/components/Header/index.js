import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {
  Navheader,
  LogoImg,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  IconBtn,
} from './styledComponents'

class Header extends Component {
  state = {isDark: false}

  changeTheme = () => {
    const {isDark} = this.state
    this.setState({isDark: !isDark})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
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
}

export default withRouter(Header)

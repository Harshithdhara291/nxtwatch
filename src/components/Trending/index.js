import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Popup from 'reactjs-popup'

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
  Linked,
  Contact,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    isDark: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.videos.map(video => ({
        title: video.title,
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        channel: video.channel,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderFailureView = () => {
    const {isDark} = this.state
    const image = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <>
        <img src={image} alt="videos failure" />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button">
          <Linked to="/">Retry</Linked>
        </button>
      </>
    )
  }

  renderVideosListView = () => {
    const {videosList} = this.state
    return (
      <div>
        <UnList>
          {videosList.map(video => (
            <TrendingItem video={video} key={video.id} />
          ))}
        </UnList>
      </div>
    )
  }

  renderLoadingView = () => (
    //   data-testid="loader"
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
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

  render() {
    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken === undefined) {
    //   return <Redirect to="/login" />
    // }

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
          <div>
            <h1>
              <span>
                <AiFillFire />
              </span>
              Trending
            </h1>
            {this.renderAllVideos()}
          </div>
        </MainCont>
      </>
    )
  }
}

export default Home

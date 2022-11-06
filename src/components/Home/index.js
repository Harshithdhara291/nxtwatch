import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {Redirect, Link} from 'react-router-dom'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import {
  MainCont,
  Images,
  ContOne,
  PopupCont,
  ListItem,
  SearchImage,
  SearchCont,
  UnList,
  Navheader,
  LogoImg,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  FSearch,
  IconBtn,
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
    searchInput: '',
    isDark: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="videos failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button">
        <Link to="/">Retry</Link>
      </button>
    </div>
  )

  renderVideosListView = () => {
    const {videosList} = this.state
    const shouldShowList = videosList.length > 0

    return shouldShowList ? (
      <div>
        <UnList>
          {videosList.map(video => (
            <VideoItem video={video} key={video.id} />
          ))}
        </UnList>
      </div>
    ) : (
      <SearchCont>
        <SearchImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1>No Search results Found</h1>
        <p>Try different key words or remove search filters</p>
        <button type="button">
          <Link to="/">Retry</Link>
        </button>
      </SearchCont>
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

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSearchInput = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getVideos)
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
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {isDark} = this.state

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
            <PopupCont>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <h1>Buy Nxt Watch Premium prepaid plans with UPI</h1>
              <button type="button">GET IT NOW</button>
            </PopupCont>
            <Popup modal>
              {close => (
                <>
                  <PopupCont>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                    />
                    <h1>Buy Nxt Watch Premium prepaid plans with UPI</h1>
                    <button type="button">GET IT NOW</button>
                  </PopupCont>
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </>
              )}
            </Popup>
            <div>
              <input
                type="search"
                placeholder="search"
                onChange={this.onChangeSearch}
              />
              <button type="button" onClick={this.changeSearchInput}>
                <FSearch />
              </button>
            </div>
            {this.renderAllVideos()}
          </div>
        </MainCont>
      </>
    )
  }
}

export default Home

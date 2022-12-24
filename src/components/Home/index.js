import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import {
  Linked,
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
  Contact,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  FSearch,
  IconBtn,
  LogoutBtn,
  ContTwo,
  SearchContTwo,
  Input,
  SearchBtn,
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
        <h1>Oops! Something went Wrong</h1>
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
          <Linked to="/">Retry</Linked>
        </button>
      </SearchCont>
    )
  }

  renderLoadingView = () => (
    //   data-testid="loader"
    <div>
      <Loader type="ThreeDots" color="black" height="50" width="50" />
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
          {/* <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button> */}
          <Popup
            modal
            focus
            trigger={<LogoutBtn type="button">Logout</LogoutBtn>}
            overlayStyle={{
              background: 'white',
              border: '1px solid black',
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
                <LogoutBtn
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Cancel
                </LogoutBtn>
                <LogoutBtn type="button" onClick={this.onClickLogout}>
                  Confirm
                </LogoutBtn>
              </>
            )}
          </Popup>
        </Navcontainer>
      </Navheader>
    )
  }

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
            <SearchContTwo>
              <Input onChange={this.onChangeSearch} />
              <SearchBtn type="button" onClick={this.changeSearchInput}>
                <FSearch />
              </SearchBtn>
            </SearchContTwo>
            {this.renderAllVideos()}
          </ContTwo>
        </MainCont>
      </>
    )
  }
}

export default Home

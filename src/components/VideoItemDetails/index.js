import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiFillHome, AiFillFire, AiFillHeart} from 'react-icons/ai'
import {BiLike, BiDislike} from 'react-icons/bi'

import {MdPlaylistAdd} from 'react-icons/md'
import {
  MainCont,
  Images,
  ContOne,
  ListItem,
  Navheader,
  LogoImg,
  Contact,
  Navcontainer,
  ProfileImg,
  FMoon,
  FSun,
  IconBtn,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
    isDark: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getFormattedData = data => ({
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    description: data.video_details.description,
    id: data.video_details.id,
    channel: data.video_details.channel,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    title: data.video_details.title,
  })

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = this.getFormattedData(fetchedData)
      this.setState({
        productData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    //   data-testid="loader"
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
          <Link to="/">Retry</Link>
        </button>
      </>
    )
  }

  renderProductDetailsView = () => {
    const {productData} = this.state
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = productData
    const channelData = {
      name: channel.name,
      imageUrl: channel.profile_image_url,
      subs: channel.subscriber_count,
    }
    return (
      <>
        <div>
          <ReactPlayer url={videoUrl} />
          <div>
            <h1>{title}</h1>
            <div>
              <div>
                <p>{viewCount} views</p>
              </div>
              <div>
                <p>
                  <span>
                    <BiLike />
                  </span>
                  Like
                </p>
                <p>
                  <span>
                    <BiDislike />
                  </span>
                  Dislike
                </p>
                <p>
                  <span>
                    <MdPlaylistAdd />
                  </span>
                  Save
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div>
              <img src={channelData.imageUrl} alt="channel logo" />
              <div>
                <p>{channelData.name}</p>
                <p>{channelData.subs} subscribers</p>
              </div>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
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
              <Contact>
                <p>
                  Enjoy! Now to see your
                  <br /> channels and
                  <br /> recommendations!
                </p>
              </Contact>
            </div>
          </ContOne>
          <div>{this.renderProductDetails()}</div>
        </MainCont>
      </>
    )
  }
}

export default VideoItemDetails

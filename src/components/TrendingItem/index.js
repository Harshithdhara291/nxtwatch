import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {MainCont, Para, Thumb, MainCont1, Head} from './styledComponents'

const TrendingItem = props => {
  const {video} = props
  const {title, id, thumbnailUrl, channel, viewCount, publishedAt} = video
  const channelData = {name: channel.name, imageUrl: channel.profile_image_url}

  return (
    <Link to={`/videos/${id}`}>
      <MainCont>
        <Thumb src={thumbnailUrl} alt="video thumbnail" />
        <MainCont1>
          <Head>{title}</Head>
          <Para>{channelData.name}</Para>
          <Para>{viewCount} views</Para>
          {/* <p></p> */}
        </MainCont1>
      </MainCont>
    </Link>
  )
}
export default TrendingItem

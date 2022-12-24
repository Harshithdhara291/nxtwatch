import {formatDistanceToNow} from 'date-fns'
import {
  MainCont,
  Logo,
  Para,
  Thumb,
  MainCont1,
  Head,
  Linked,
} from './styledComponents'

const VideoItem = props => {
  const {video} = props
  const {title, id, thumbnailUrl, channel, viewCount, publishedAt} = video
  const channelData = {name: channel.name, imageUrl: channel.profile_image_url}
  //   formatDistanceToNow(new Date(2021, 8, 20))
  return (
    <MainCont>
      <Linked to={`/videos/${id}`}>
        <Thumb src={thumbnailUrl} alt="video thumbnail" />
        <MainCont1>
          <Logo src={channelData.imageUrl} alt="channel logo" />
          <div>
            <Head>{title}</Head>
            <Para>{channelData.name}</Para>
            <Para>{viewCount} views</Para>
            <Para>{formatDistanceToNow(new Date(publishedAt))}</Para>
          </div>
        </MainCont1>
      </Linked>
    </MainCont>
  )
}
export default VideoItem

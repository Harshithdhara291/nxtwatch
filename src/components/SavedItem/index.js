import {formatDistanceToNow} from 'date-fns'
import {
  MainCont,
  Para,
  Thumb,
  MainCont1,
  Head,
  Linked,
} from './styledComponents'

const SavedItem = props => {
  const {video} = props
  const {title, id, thumbnailUrl, channel, viewCount, publishedAt} = video
  const channelData = {name: channel.name, imageUrl: channel.profile_image_url}

  return (
    <Linked to={`/videos/${id}`}>
      <MainCont>
        <Thumb src={thumbnailUrl} alt="video thumbnail" />
        <MainCont1>
          <Head>{title}</Head>
          <Para>{channelData.name}</Para>
          <Para>{viewCount} views</Para>
          <Para>{formatDistanceToNow(new Date(publishedAt))}</Para>
        </MainCont1>
      </MainCont>
    </Linked>
  )
}
export default SavedItem

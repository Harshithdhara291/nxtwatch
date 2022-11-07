import {Link} from 'react-router-dom'
import {MainCont, Para, Thumb, MainCont1, Head} from './styledComponents'

const GamingItem = props => {
  const {video} = props
  const {title, id, thumbnailUrl, viewCount} = video

  return (
    <MainCont>
      <Link to={`/videos/${id}`}>
        <Thumb src={thumbnailUrl} alt="video thumbnail" />
        <MainCont1>
          <div>
            <Head>{title}</Head>
            <Para>{viewCount} Watching Worldwide</Para>
            {/* <p></p> */}
          </div>
        </MainCont1>
      </Link>
    </MainCont>
  )
}
export default GamingItem

import {
  MainCont,
  Para,
  Thumb,
  MainCont1,
  Head,
  Linked,
} from './styledComponents'

const GamingItem = props => {
  const {video} = props
  const {title, id, thumbnailUrl, viewCount} = video

  return (
    <MainCont>
      <Linked to={`/videos/${id}`}>
        <Thumb src={thumbnailUrl} alt="video thumbnail" />
        <MainCont1>
          <div>
            <Head>{title}</Head>
            <Para>{viewCount} Watching Worldwide</Para>
            {/* <p></p> */}
          </div>
        </MainCont1>
      </Linked>
    </MainCont>
  )
}
export default GamingItem

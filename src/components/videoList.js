import { toJS } from "mobx"
import { observer } from 'mobx-react'

import VideoItem from "./videoItem";
import VideoStore from "../stores/videoStore"


const VideoList = observer(() => {
 const listVideos = toJS(VideoStore.videos).map((current, id) => (
    <VideoItem key={id} video={current} id={id} />
  ));
  return <div>{listVideos}</div>;
})
export default VideoList;

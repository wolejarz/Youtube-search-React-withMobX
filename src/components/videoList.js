import VideoItem from "./videoItem";

const VideoList = () => {

  const videos =[]
  const listVideos = videos.map((current, id) => (
    <VideoItem key={id} video={current} id={id} />
  ));
  return <div>{listVideos}</div>;
};
export default VideoList;

import VideoStore from '../stores/videoStore';

const VideoItem = ({ video }) => (
  <div className="Item">
    <div className="ItemProp" onClick={() => VideoStore.handleSelectVideo(video)}>
      <div>Description: {video.description}</div>
      <div>Date: {video.publishTime.slice(0, 16)}</div>
    </div>
    <button onClick={() => VideoStore.handleHideVideo(video)}>Hide Video</button>
  </div>
);
export default VideoItem;

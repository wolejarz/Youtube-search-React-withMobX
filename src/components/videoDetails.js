import { observer } from 'mobx-react';

import VideoStore from '../stores/videoStore';

const VideoDetails = observer(() => {
  const videoPath = `https://www.youtube.com/embed/${VideoStore.selectedVideo}`;
  if (!VideoStore.selectedVideo) return <div></div>;
  return (
    <div>
      <iframe title="Video Player" width="35%" height="400px" src={videoPath} />
    </div>
  );
});
export default VideoDetails;

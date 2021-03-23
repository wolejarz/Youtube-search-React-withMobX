import { observer } from 'mobx-react';

// SVHH: Lowercase videoStore *instance*
import VideoStore from '../stores/videoStore';

// SVHH: I don't like multi-line ? : operators
// SVHH: Also better to avoid the ! operator, just switch
// SVHH: the two cases around.

// SVHH: Oops, exported class-like functional component is
// SVHH: capitalized, but filename is not

// SVHH: Better to call it VideoPlayer? Yes.

const VideoDetails = observer(() =>
  !VideoStore.selectedVideo ? (
    <div></div>
  ) : (
    <div>
      <iframe
        title="Video Player"
        width="35%"
        height="400px"
        src={`https://www.youtube.com/embed/${VideoStore.selectedVideo}`}
      />
    </div>
  )
);
export default VideoDetails;

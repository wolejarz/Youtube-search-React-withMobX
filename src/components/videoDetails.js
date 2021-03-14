import { observer } from 'mobx-react';

import VideoStore from '../stores/videoStore';

const VideoDetails = observer(() => 
 !VideoStore.selectedVideo
 ? <div></div>
 : <div>
      <iframe title="Video Player" width="35%" height="400px" 
      src={`https://www.youtube.com/embed/${VideoStore.selectedVideo}`} />
   </div>
);
export default VideoDetails;


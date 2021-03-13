import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import VideoItem from './videoItem';
import VideoStore from '../stores/videoStore';

const VideoList = observer(() => (
  VideoStore.videos.length===0
  ? <div className="Item">Search List is empty</div>
  : <div>
    {toJS(VideoStore.videos).map((current, id) => (
      <VideoItem key={id} video={current} />
    ))}
  </div>
));
export default VideoList;

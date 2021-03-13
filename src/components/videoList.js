import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import VideoItem from './videoItem';
import VideoStore from '../stores/videoStore';

const VideoList = observer(() => (
  <div>
    {toJS(VideoStore.videos).map((current, id) => (
      <VideoItem key={id} video={current} />
    ))}
  </div>
));
export default VideoList;

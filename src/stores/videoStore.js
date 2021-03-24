import { makeAutoObservable } from 'mobx';

import ChannelStore from '../stores/channelStore';
import { MAX_VIDEOS, APIKey } from '../stores/constants';

class videoStore {
  videos = [];
  selectedVideo = null;
  hiddenOrWatchedVideos = [];

  constructor() {
    makeAutoObservable(this);
  }

  setVideos = videos => (this.videos = videos);
  setSelectedVideo = video => (this.selectedVideo = video);
  setHiddenOrWatchedVideos = videos => (this.hiddenOrWatchedVideos = videos);

  videoUrl = (channelId,pageToken) =>`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}
          &maxResults=${MAX_VIDEOS}&order=date&pageToken=${pageToken}&type=video&key=${APIKey}`

  getVideosFromChannel = async (channel, howManyINeed, pageToken) => {
    let filteredVideos;
    try {
      const response = await fetch(this.videoUrl(channel.channelId, pageToken));
      const responseInJson = await response.json();
      filteredVideos = responseInJson.items.filter(current =>
        this.hiddenOrWatchedVideos.indexOf(current.id.videoId) === -1 ? true : false
      );
      if (filteredVideos.length < howManyINeed) {
        const newVideos = await this.getVideosFromChannel(channel, howManyINeed - filteredVideos.length, responseInJson.nextPageToken)
        filteredVideos.concat(newVideos);
      }
    } catch (error) {
      console.log('Probably API error');
    }
    return filteredVideos;
  };

  // SVHH: Conceptual switch from ...videos to ...results
  addNewVideos = videos => {
    const sortedAndTruncatedResults = videos
      .concat(this.videos)
      .sort((a, b) => (Date.parse(a.publishTime) > Date.parse(b.publishTime) ? -1 : 1))
      .slice(0, MAX_VIDEOS);
    this.setVideos(sortedAndTruncatedResults);
  };

  handleGetVideos = async () => {
    this.setSelectedVideo(null);
    this.setVideos([]);
    const allChannelsUnselected = !ChannelStore.channels.reduce((total, current) => total || current.selected, false);
    // SVHH: Simplify logic inside forEach statement!
    const allChannelsToSearch = ...
    allChannelsToSearch.forEach(currentChannel => maybeFetch(currentC))
      {
      if (current.selected || allChannelsUnselected)
        this.getVideosFromChannel(current, MAX_VIDEOS, '').then(result =>
          this.addNewVideos(
            result.map(current => ({
              id: current.id.videoId,
              description: current.snippet.description,
              publishTime: current.snippet.publishTime,
            }))
          )
        );
    });
  };

  handleHideVideo = video => {
    this.setVideos(this.videos.filter(current => current.id !== video.id));
    this.setHiddenOrWatchedVideos(this.hiddenOrWatchedVideos.concat([video.id]));
  };
  handleSelectVideo = video => {
    this.handleHideVideo(video);
    this.setSelectedVideo(video.id);
  };
}
const VideoStore = new videoStore();
export default VideoStore;

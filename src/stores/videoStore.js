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

  getVideosFromChannel = async (channel, howManyINeed, pageToken) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}
          &maxResults=${MAX_VIDEOS}&order=date&pageToken=${pageToken}&type=video&key=${APIKey}`
      );
      const responseInJson = await response.json();
      const filteredVideos = responseInJson.items.filter(current =>
        this.hiddenOrWatchedVideos.indexOf(current.id.videoId) === -1 ? true : false
      );
      return filteredVideos.length < howManyINeed
        ? filteredVideos.concat(
            await this.getVideosFromChannel(channel, howManyINeed - filteredVideos.length, responseInJson.nextPageToken)
          )
        : filteredVideos;
    } catch (error) {
      console.log('Probably API error');
    }
  };

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
    ChannelStore.channels.forEach(current => {
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

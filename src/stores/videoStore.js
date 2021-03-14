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

  setVideos = videos => this.videos = videos;
  setSelectedVideo = video => this.selectedVideo = video;
  setHiddenOrWatchedVideos = videos => this.hiddenOrWatchedVideos = videos;

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

  handleGetVideos = async () => {
    const allChannelsUnselected = !ChannelStore.channels.reduce((total, current) => total || current.selected, false);
    const arrayOfPromises = ChannelStore.channels
      .filter(current => current.selected || allChannelsUnselected) 
      .map(current => this.getVideosFromChannel(current, MAX_VIDEOS, ''));
    const results = await Promise.all(arrayOfPromises);
    const resultsAsOneArray = results
      .reduce((flat, toFlatten) => flat.concat(toFlatten), [])
      .map(current => ({
        id: current.id.videoId,
        description: current.snippet.description,
        publishTime: current.snippet.publishTime,
      }));
    const sortedAndTruncatedResults = resultsAsOneArray
      .sort((a, b) => Date.parse(a.publishTime) > Date.parse(b.publishTime) ? -1 : 1)
      .slice(0, MAX_VIDEOS);
    this.setVideos(sortedAndTruncatedResults);
    this.setSelectedVideo(null);
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

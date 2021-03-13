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

  setVideos = videos => {
    this.videos = videos;
  };
  setSelectedVideo = video => {
    this.selectedVideo = video;
  };
  setHiddenOrWatchedVideos = videos => {
    this.hiddenOrWatchedVideos = videos;
  };

  //gets  N (MAX_VIDEOS) videos from given channel - only non-watched or non-hidden videos
  getVideosFromChannel = async function (channel) {
    let videosFromChannel = null;
    let pageToken = '';
    try {
      while (videosFromChannel === null || videosFromChannel.length < MAX_VIDEOS) {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}
          &maxResults=${MAX_VIDEOS}&order=date&pageToken=${pageToken}&type=video&key=${APIKey}`
        );
        const responseInJson = await response.json();
        pageToken = responseInJson.nextPageToken;
        const filteredVideosFromResponse = responseInJson.items.filter(current =>
          this.hiddenOrWatchedVideos.indexOf(current.id.videoId) === -1 ? true : false
        );
        videosFromChannel =
          videosFromChannel === null
            ? filteredVideosFromResponse
            : videosFromChannel.concat(filteredVideosFromResponse);
      }
      return videosFromChannel.map(current => ({
        id: current.id.videoId,
        ...current.snippet,
      }));
    } catch (error) {
      console.log('API Error');
    }
  }.bind(this);

  handleGetVideos = async function () {
    const allChannelsUnselected = !ChannelStore.channels.reduce((total, current) => total || current.selected, false);
    const arrayOfPromises = [];
    ChannelStore.channels.forEach(current => {
      if (current.selected || allChannelsUnselected) arrayOfPromises.push(this.getVideosFromChannel(current));
    });
    const results = await Promise.all(arrayOfPromises);
    const resultsAsOneArray = results.reduce(function (flat, toFlatten) {
      return flat.concat(toFlatten);
    }, []);
    const sortedAndTruncatedResults = resultsAsOneArray
      .sort((a, b) => (Date.parse(a.publishTime) > Date.parse(b.publishTime) ? -1 : 1))
      .slice(0, MAX_VIDEOS);
    this.setVideos(sortedAndTruncatedResults);
    this.setSelectedVideo(null);
  }.bind(this);

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

import { makeAutoObservable, toJS } from "mobx";
import ChannelStore from '../stores/channelStore';
import {MAX_VIDEOS,APIKey} from '../stores/constants';

class videoStore {
  videos = [];
  selectedVideo = null;
  hiddenOrWatchedVideos = [];

 

//gets  N (MAX_VIDEOS) videos from channel - only non-watched or non-hidden videos

getVideosFromChannel = async function (channel) {
  let videosFromChannel = null
  let takeVideosBefore = new Date(Date.now()).toISOString()
  try {
    while (videosFromChannel === null || videosFromChannel.length < MAX_VIDEOS) {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}&maxResults=${MAX_VIDEOS}&order=date&publishedBefore=${takeVideosBefore}&type=video&key=${APIKey}`
      )
      const responseInJson = await response.json()
      //gets publish time of the last video in the current fetch to get only older videos in the next fetch
      takeVideosBefore = responseInJson.items[responseInJson.items.length - 1].snippet.publishTime

      const filteredVideosFromResponse = responseInJson.items.filter(current =>
        this.hiddenOrWatchedVideos.indexOf(current.id.videoId) === -1 ? true : false
      )
      videosFromChannel = videosFromChannel === null
          ? filteredVideosFromResponse
          : videosFromChannel.concat(filteredVideosFromResponse.slice(1, filteredVideosFromResponse.length))  }
    return videosFromChannel.map(current => ({
      id: current.id.videoId,
      ...current.snippet,
    }))
  } catch (error) {console.log('API Error')}
 }.bind(this)

  
  handleGetVideos = async function () {
    const allChannelsUnselected = !ChannelStore.channels.reduce((total, current) => total || current.selected, false);
   // if (!this.videos) this.videos.clear();
    const arrayOfPromises = []
    ChannelStore.channels.forEach(current => {
      if (current.selected || allChannelsUnselected) arrayOfPromises.push(this.getVideosFromChannel(current))
    })
    const results = await Promise.all(arrayOfPromises)
    const resultsAsOneArray = results.reduce(function (flat, toFlatten) {
      return flat.concat(toFlatten)
    }, [])
    const sortedAndTruncatedResults = resultsAsOneArray
      .sort((a, b) => (Date.parse(a.publishTime) > Date.parse(b.publishTime) ? -1 : 1))
      .slice(0, MAX_VIDEOS)
   this.videos.replace(sortedAndTruncatedResults)
   console.log(toJS(this.videos));

  }.bind(this)

  

  constructor() {
   makeAutoObservable(this)
  }
}
const VideoStore = new videoStore();
export default VideoStore;

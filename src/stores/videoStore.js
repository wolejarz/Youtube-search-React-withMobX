import { makeAutoObservable } from "mobx";
import ChannelStore from '../stores/channelStore'

class videoStore {
  videos = [];
  selectedVideo = null;
  hiddenOrWatchedVideos = [];

  handleGetVideos = () => {

  }
  constructor() {
   makeAutoObservable(this)
  }
}
const VideoStore = new videoStore();
export default VideoStore;

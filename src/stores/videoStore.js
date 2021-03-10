import { makeAutoObservable, observable } from "mobx";

//
class videoStore {
  videos = [];
  selectedVideo = null;
  hiddenOrWatchedVideos = [];

  timer = 0;

  //   incrementCounter = () => (this.timer += 1);

  //   reset = () => {
  //     this.timer = 0;
  //   };

  constructor() {
    observable.array(this.videos);
  }
}
const VideoStore = new videoStore();
export default VideoStore;

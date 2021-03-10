import { makeAutoObservable } from "mobx";

//
class VideoStore {
  videos = [];
  selectedVideo = null;
  hiddenOrWatchedVideos = [];

  timer = 0;

  //   incrementCounter = () => (this.timer += 1);

  //   reset = () => {
  //     this.timer = 0;
  //   };

  constructor() {
    makeAutoObservable(this);
  }
}
export default VideoStore;

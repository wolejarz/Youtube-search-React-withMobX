import React, { useContext } from "react";
import AppContext from "../context/appContext";
import VideoItem from "./videoItem";

const VideoList = () => {
  const appContext = useContext(AppContext);
  const { videos } = appContext;
  const listVideos = videos.map((current, id) => (
    <VideoItem key={id} video={current} id={id} />
  ));
  return <div>{listVideos}</div>;
};
export default VideoList;

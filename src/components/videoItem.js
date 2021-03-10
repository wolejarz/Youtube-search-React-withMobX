import React, { useContext } from "react";
import AppContext from "../context/appContext";

let VideoItem = ({ video, id }) => {
  const appContext = useContext(AppContext);
  const { handleSelectVideo, handleHideVideo } = appContext;
  return (
    <div className="Item">
      <div className="ItemProp" onClick={() => handleSelectVideo(video)}>
        <div>Description: {video.description}</div>
        <div>Date: {video.publishTime.slice(0, 16)}</div>
      </div>
      <button onClick={() => handleHideVideo(video)}>Hide Video</button>
    </div>
  );
};
export default VideoItem;

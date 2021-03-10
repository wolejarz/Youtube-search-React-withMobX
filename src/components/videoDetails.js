import React, { useContext } from "react";
import AppContext from "../context/appContext";

const VideoDetails = () => {
  const appContext = useContext(AppContext);
  const { selectedVideo } = appContext;
  const videoPath = `https://www.youtube.com/embed/${selectedVideo}`;
  if (!selectedVideo) return <div></div>;
  return (
    <div>
      <iframe title="Video Player" width="35%" height="400px" src={videoPath} />
    </div>
  );
};
export default VideoDetails;

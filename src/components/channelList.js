/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import AppContext from "../context/appContext";
import ChannelItem from "./channelItem";

const ChannelList = () => {
  // loading list of channels when application loads
  useEffect(() => {
    handleGetChannels();
  }, []);
  const appContext = useContext(AppContext);
  const { channels, handleGetChannels } = appContext;

  // loading list of channels when application loads
  useEffect(() => {
    handleGetChannels();
  }, []);

  const listChannels = channels.map((current, id) => (
    <ChannelItem key={id} channel={current} id={id} />
  ));

  return <div>{listChannels} </div>;
};
export default ChannelList;

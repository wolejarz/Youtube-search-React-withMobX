import React, { useContext } from "react";

const ChannelItem = ({ channel, id }) => {
  return (
    <div className="Item">
      <div className="ItemProp">
        <img
          style={{ marginRight: "5px", height: "4rem" }}
          alt="thumbnail"
          src={channel.thumbnailUrl}
        />
        {channel.description}
      </div>
      {/* <input
        className="checkbox"
        type="checkbox"
        id="check1"
        onChange={() => handleSelectChannel(id)}
        checked={channel.selected}
      />
      <label htmlFor="check1">Select</label> */}
    </div>
  );
};
export default ChannelItem;

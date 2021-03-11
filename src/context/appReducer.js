import {
  GET_CHANNELS,
  SELECT_CHANNEL,
  GET_VIDEOS,
  SELECT_VIDEO,
  HIDE_VIDEO,
  CLEAR_VIDEOS,
} from "../stores/constants";

const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_CHANNELS: {
      return {
        ...state,
        channels: action.payload,
      };
    }
    //toggles selection of N-th channel
    case SELECT_CHANNEL: {
      const channelWithNewState = {
        ...state.channels[action.payload],
        selected: !state.channels[action.payload].selected,
      };
      return {
        ...state,
        channels: state.channels.map((channel, id) =>
          id === action.payload ? channelWithNewState : channel
        ),
      };
    }
    //filter (watched or hidden) videos and add result to list of videos, limit size to 10
    case GET_VIDEOS: {
      return {
        ...state,
        videos: action.payload,
      };
    }

    case CLEAR_VIDEOS:
      return {
        ...state,
        videos: [],
        selectedVideo: "",
      };
    case SELECT_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload.id,
      };

    case HIDE_VIDEO: {
      return {
        ...state,
        videos: state.videos.filter(
          (current) => current.id !== action.payload.id
        ),
        hiddenOrWatchedVideos: state.hiddenOrWatchedVideos.concat([
          action.payload.id,
        ]),
      };
    }
    default:
      return state;
  }
};
export default AppReducer;

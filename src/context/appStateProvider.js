import React, { useReducer } from 'react'

import AppContext from './appContext'
import AppReducer from './appReducer'
import {
  GET_CHANNELS,
  GET_VIDEOS,
  APIKey,
  SELECT_CHANNEL,
  SELECT_VIDEO,
  CLEAR_VIDEOS,
  HIDE_VIDEO,
  MAX_VIDEOS,
} from './types'

const AppStateProvider = props => {
  const initialState = {
    channels: [],
    videos: [],
    selectedVideo: null,
    hiddenOrWatchedVideos: [],
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  //Select/Unselect channel from list
  const handleSelectChannel = id => {
    dispatch({ type: SELECT_CHANNEL, payload: id })
  }

  //something extra
  //Load hardcoded channels descriptions from Youtube API - waits until all parallel async requests are completed
  const handleGetChannels = async function () {
    const channels_ids = ['UCVTyTA7-g9nopHeHbeuvpRA', 'UCwWhs_6x42TyRM4Wstoq8HA', 'UCMtFAi84ehTSYSE9XoHefig']
    const requests = channels_ids.map(id =>
      fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&maxResults=1&key=${APIKey}`)
    )
    try {
      const resultChannels = []
      const responses = await Promise.all(requests)
      const responsesInJSON = await Promise.all(responses.map(r => r.json()))
      responsesInJSON.forEach(channel =>
        resultChannels.push({
          channelId: channel.items[0].id,
          selected: false,
          ...channel.items[0].snippet,
        })
      )
      dispatch({ type: GET_CHANNELS, payload: resultChannels })
    } catch (error) {
      console.log('API Error')
    }
  }

  //gets  N (MAX_VIDEOS) videos from channel - only non-watched or non-hidden videos
  const getVideosFromChannel = async function (channel) {
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
          state.hiddenOrWatchedVideos.indexOf(current.id.videoId) === -1 ? true : false
        )
        videosFromChannel =
          videosFromChannel === null
            ? filteredVideosFromResponse
            : videosFromChannel.concat(filteredVideosFromResponse.slice(1, filteredVideosFromResponse.length))
      }
      return videosFromChannel.map(current => ({
        id: current.id.videoId,
        ...current.snippet,
      }))
    } catch (error) {console.log('API Error')}
  }

  //Loads, removes hidden or watch videos and sorts videos - from selected channels - each selected channel async in parallel
  const handleGetVideos = async function () {
    const allChannelsUnselected = !state.channels.reduce((total, current) => total || current.selected, false)
    dispatch({ type: CLEAR_VIDEOS })
    const arrayOfPromises = []
    state.channels.forEach(current => {
      if (current.selected || allChannelsUnselected) arrayOfPromises.push(getVideosFromChannel(current))
    })
    const results = await Promise.all(arrayOfPromises)
    const resultsAsOneArray = results.reduce(function (flat, toFlatten) {
      return flat.concat(toFlatten)
    }, [])
    const sortedAndTruncatedResults = resultsAsOneArray
      .sort((a, b) => (Date.parse(a.publishTime) > Date.parse(b.publishTime) ? -1 : 1))
      .slice(0, MAX_VIDEOS)
    dispatch({ type: GET_VIDEOS, payload: sortedAndTruncatedResults })
  }

  //Slect and show video
  const handleSelectVideo = video => {
    dispatch({ type: HIDE_VIDEO, payload: video })
    dispatch({ type: SELECT_VIDEO, payload: video })
  }

  //Hide video
  const handleHideVideo = video => {
    dispatch({ type: HIDE_VIDEO, payload: video })
  }

  return (
    <AppContext.Provider
      value={{
        channels: state.channels,
        videos: state.videos,
        selectedVideo: state.selectedVideo,
        hiddenOrWatchedVideos: state.hiddenOrWatchedVideos,
        handleSelectChannel,
        handleGetVideos,
        handleSelectVideo,
        handleHideVideo,
        handleGetChannels,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
export default AppStateProvider

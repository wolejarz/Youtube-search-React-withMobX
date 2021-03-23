import VideoStore from '../stores/videoStore';

// SVHH: Nice, using store.handleGetVideos without () => ... b/c no closure is needed :)
const SearchBar = () => (
  <div style={{ fontSize: '20px', textAlign: 'center' }}>
    <button style={{ fontSize: '20px' }} onClick={VideoStore.handleGetVideos}>
      Search Videos
    </button>
  </div>
);

export default SearchBar;

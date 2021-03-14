import VideoStore from '../stores/videoStore';

const SearchBar = () => 
  <div style={{ fontSize: '20px', textAlign: 'center' }}>
    <button style={{ fontSize: '20px' }} onClick={VideoStore.handleGetVideos}>
      Search Videos
    </button>
  </div>

export default SearchBar;

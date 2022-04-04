import { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

class ReactPlayerView extends Component {
  constructor(props) {
    super(props);
    this.xhrSetup = this.xhrSetup.bind(this);
  }

  async xhrSetup(xhr, oldurl) {
    const { suffix, head } = this.props;
    let url = oldurl;
    if (url.includes('sentry')) {
      // url = "https://api.hub31.com/v1/videos/echo"
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'image/png');
      // xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.setRequestHeader('Authorization', `Bearer ${head}`);
    } else {
      url += `${suffix}`; // this suffix is updated every [x] seconds by polling the server
      xhr.open('GET', url, true);
    }
  }
  render() {
    return (
      <div className='player-wrapper' style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          className='react-player'
          url={this.props.link}
          width='100%'
          height='100%'
          style={{ position: "absolute", top: 0, left: 0 }}
          config={{
            file: {
              forceHLS: true,
              hlsOptions: {
                xhrSetup: this.xhrSetup,
              }
            }
          }}
        />
      </div>
    );
  }
}

export default ReactPlayerView;

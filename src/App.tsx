import * as React from 'react';
import posed from 'react-pose';

interface IState {
  overlayScale: {
    heightPercent: number,
    widthPercent: number
  }
};

class App extends React.Component<{}, IState> {
  public state = {
    overlayScale: {
      heightPercent: 0,
      widthPercent: 0
    },
  };

  public componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case 'OVERLAY_SIZE_CHANGE':
          const newState = {
            overlayScale: message.overlayScale
          };
          this.setState(newState);
          break;
        default:
          break;
      }
    });
  }

  public render() {
    const {
      overlayScale
    } = this.state;

    const Overlay = posed.div({
      scale: {
        backgroundColor: 'blue',
        height: overlayScale.heightPercent * document.documentElement.clientHeight,
        width: overlayScale.widthPercent * document.documentElement.clientWidth
      }
    });
    return (
      <div className='app'>
        <Overlay pose='scale' />
      </div>
    );
  }
}

export default App;

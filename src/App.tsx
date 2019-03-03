import * as React from 'react';
import posed from 'react-pose';

interface IState {
  overlay: {
    color: number,
    position: {
      x: number,
      y: number
    },
    size: {
      x: number,
      y: number
    }
  }
};

class App extends React.Component<{}, IState> {
  public state = {
    overlay: {
      color: 0,
      position: {
        x: 0,
        y: 0
      },
      size: {
        x: 0,
        y: 0
      }
    },
  };

  public componentDidMount() {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case 'OVERLAY_SIZE_CHANGE':
          const newState = {
            overlay: message.overlay
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
      overlay
    } = this.state;

    const scaleVector = ({ x, y }: { x: number, y: number }) => ({
      x: x / 100 * document.documentElement.clientWidth,
      y: y / 100 * document.documentElement.clientHeight
    });

    const hexColor = `#${overlay.color.toString(16).padStart(6, '0')}`;
    console.log(hexColor); // tslint:disable-line no-console
    // tslint:disable object-literal-sort-keys
    const Overlay = posed.div({
      scale: {
        backgroundColor: hexColor,

        position: 'fixed',
        top: scaleVector(overlay.position).y,
        left: scaleVector(overlay.position).x,
        zIndex: 10000000,

        height: scaleVector(overlay.size).y,
        width: scaleVector(overlay.size).x
      }
    });
    // tslint:enable object-literal-sort-keys
    return (
      <div className='app'>
        <Overlay pose='scale' />
      </div>
    );
  }
}

export default App;

import { h, Component } from 'preact';
import '@material/button/dist/mdc.button.min.css';
import { icons } from '../../../../../suggestion_utils';
import { colorMap, fadedColorMap } from '../../../../../lib/colors';
import './style.css';

// 1. Reload
// 2. Search
// 3. History
// 4. Calculate
// 5. Activate
// 6. Go
// 7. Command

// function icon (searchText, searchValue, tabURL, modifiers) {
//   return searchText === tabURL
//     ? 'refresh'
//     : iconForType[isURL(searchValue) ? 'url' : 'search'];
// }

// function icon (suggestion) {
//   if (suggestion) {
//     switch (suggestion.type) {
//       case 'tab':
//         return 'tab';
//       case 'closedTab':
//         return 'restore';
//     }
//   }
//   return 'error';
// }

export default class extends Component {
  state = {
    hovered: false
  }
  render () {
    const { mode, onClick } = this.props;
    const { hovered } = this.state;
    const { handleMouseEnter, handleMouseLeave } = this;
    return (
      <div
        role='button'
        id='action-button'
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i
          class='material-icons'
          aria-hidden='true'
          style={{
            color: hovered ? colorMap.mode : fadedColorMap[mode]
          }}
        >
          {hovered ? icons.mode : icons[mode]
          }
        </i>
      </div>
    );
  }
  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }
}

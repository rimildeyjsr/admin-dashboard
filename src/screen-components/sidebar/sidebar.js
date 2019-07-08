import React, {Component} from 'react';
import './sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: 'gallery',
    }
  }

  changeSelection(event, id) {
    this.setState({
      selectedID: id
    });
    this.props.changeSelection(id);
  }

  applyActiveOrInactiveColourClass(id) {
    return this.state.selectedID === id ? 'active-colour' : 'inactive-colour';
  }

  showOrHideActiveLineDiv(id) {
    return this.state.selectedID === id ? 'show-active-line' : 'hide-active-line';
  }

  applyActiveOrInactiveTextColour(id) {
    return this.state.selectedID === id ? 'active-text-colour' : 'inactive-text-colour';
  }

  render() {
    return (
      <div className='sidebar-wrapper'>
        <div
          className='svg-button'
          id='gallery'
          onClick={(e) => this.changeSelection(e, 'gallery')}
        >
          <div className='svg-line-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className='svg-item'>
              <path fill="none" d="M0 0h24v24H0V0z"/>
              <path
                className={this.applyActiveOrInactiveColourClass('gallery')}
                d="M15.56 10.81l-2.35 3.02-1.56-1.88c-.2-.25-.58-.24-.78.01l-1.74 2.23c-.26.33-.02.81.39.81h8.98c.41 0 .65-.47.4-.8l-2.55-3.39c-.19-.26-.59-.26-.79 0zM2 5c-.55 0-1 .45-1 1v15c0 1.1.9 2 2 2h15c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1-.45-1-1V6c0-.55-.45-1-1-1zm19-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-1 16H8c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
              />
            </svg>
            <div className={"active-line " + this.showOrHideActiveLineDiv('gallery')} />
          </div>
          <div className={'button-text ' + this.applyActiveOrInactiveTextColour('gallery')}>Gallery</div>
        </div>

        <div
          className='svg-button'
          id='news'
          onClick={(e) => this.changeSelection(e, 'news')}
        >
          <div className='svg-line-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className='svg-item'>
              <path
                className={this.applyActiveOrInactiveColourClass('news')}
                d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm8.29-4.71L19 17v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-1.29 1.29c-.63.63-.19 1.71.7 1.71h15.17c.9 0 1.34-1.08.71-1.71zM13 16h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v2z"
              />
            </svg>
            <div className={"active-line " + this.showOrHideActiveLineDiv('news')} />
          </div>
          <div className={'button-text ' + this.applyActiveOrInactiveTextColour('news')}>News</div>
        </div>

        <div
          className='svg-button'
          id='site-text'
          onClick={(e) => this.changeSelection(e, 'site-text')}
        >
          <div className='svg-line-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className='svg-item'>
              <path fill="none" d="M0 0h24v24H0V0z"/>
              <path
                className={this.applyActiveOrInactiveColourClass('site-text')}
                d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"
              />
            </svg>
            <div className={"active-line " + this.showOrHideActiveLineDiv('site-text')} />
          </div>
          <div className={'button-text ' + this.applyActiveOrInactiveTextColour('site-text')}>Text</div>
        </div>

        <div
          className='svg-button'
          id='news'
          onClick={(e) => this.changeSelection(e, 'logout')}
        >
          <div className='svg-line-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className='svg-item'>
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                className={this.applyActiveOrInactiveColourClass('logout')}
                d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
              />
            </svg>
            <div className={"active-line " + this.showOrHideActiveLineDiv('logout')} />
          </div>
          <div className={'button-text ' + this.applyActiveOrInactiveTextColour('logout')}>Logout</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

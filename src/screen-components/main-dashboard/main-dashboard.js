import React, {Component} from 'react';
import './main-dashboard.css';
import Sidebar from "../sidebar/sidebar";
import Gallery from "../gallery/gallery";
import News from "../news/news";
import SiteText from "../site-text/site-text";
import LoginPage from "../login-page/loginPage";


class MainDashboard extends Component{

  constructor(props) {
    super(props);

    this.state = {
      selectedSectionID: 'gallery',
    }
  }

  changeSection(id) {
    this.setState({
      selectedSectionID: id
    });
  }

  showRequiredSection(id){
    switch (id) {
      case 'gallery':
        return (
          <Gallery/>
        );
      case 'news':
        return (
          <News/>
        );
      case 'site-text':
        return (
          <SiteText/>
        );
      case 'logout':
        return (
          <LoginPage/>
        );
    }
  }

  render() {
    return (
      <div className='main-dashboard-wrapper'>
        {this.state.selectedSectionID !== 'logout' ?
          <Sidebar
            changeSelection={this.changeSection.bind(this)}
          />
          :
          null
        }

        {
          this.showRequiredSection(this.state.selectedSectionID)
        }
      </div>
    )
  }
}

export default MainDashboard;

import React from 'react';

import { Link, hashHistory, withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import GreetingContainer from '../greeting/greeting_container';
import SessionFormContainer from '../session_form/session_form_container';
import SearchIcon from '../search/search_icon';


const customStyles = {
  content : {
    minWidth              : '278px',
    position              : 'fixed',
    width                 : '278px',
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    margin                : 'auto',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#F5F5F5',
    borderRadius          : '0px',
    border                : '1px',
    fontFamily            : "'Libre Franklin', 'sans-serif'",
    fontSize              : '14px',
    fontWeight            : '300',
    padding               : '50px 10px',
    zIndex                : '1050',
    textAlign             : 'center',
    color                 : '#6A6A6A',
    justifyContent        : 'center',
  },

  overlay: {
    backgroundColor       : 'rgba(39, 36, 36, 0.75)',
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      formType: '',
      query: '',
    }

    this.handleLogin= this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.redirect = this.redirect.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleLogin() {
    this.setState({ isOpen: true, formType: 'login' });
    this.props.clearErrors();
  }

  handleSignup() {
    this.setState({ isOpen: true, formType: 'signup' });
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ query: '' });

    this.props.history.push(`/search?q=${this.state.query}`);
  }

  changeForm(e) {
    e.preventDefault();
    this.props.clearErrors();
    if(this.state.formType === 'login') {
      this.setState({ formType: 'signup' });
    } else {
      this.setState({ formType: 'login' });
    }
  }

  redirect() {
    if (!this.props.currentUser.currentUser) {
      this.handleLogin();
    } else {
      this.props.history.push("/start-a-campaign");
    }
  }

  render() {
    return (
      <div className="indienomo-header">
        <nav className="nav-bar">
          <div className="left">
            <Link to="/"><h1>IndieNoMo</h1></Link>
            <a className="nav-btn" target="_blank" href="http://github.com/usasnouski">Github Repo</a>
            <a className="nav-btn" target="_blank" href="http://vsasnouski.me">My Portfolio</a>
            <div className="search-form">
              <form  onSubmit={this.handleSearch}>
                <input className="nav-search-bar nav-search-input" onChange={this.update("query")} value={this.state.query}/>
              </form>
              <SearchIcon svgClass="search-icon" />
            </div>
          </div>
          <div className="right">
            <button className="nav-right-btn" onClick={this.redirect}>Start a campaign</button>
            <GreetingContainer
              onClick={this.handleOpen}
              handleLogin={this.handleLogin}
              handleSignup={this.handleSignup}
            />
            <Modal
              isOpen={this.state.isOpen}
              onRequestClose={this.handleClose}
              style={customStyles}
              contentLabel="">
              <SessionFormContainer
                formType={this.state.formType}
                changeForm={this.changeForm}
                handleClose={this.handleClose} />
            </Modal>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);

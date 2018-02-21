import React from 'react';
import  { Link }  from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar has-text-weight-bold">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <section className = 'has-text-black'> NorthCoders News </section>
          </a>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/">
                                Topics
              </a>
              <div className="navbar-dropdown is-boxed">
                {this.props.topics.map(topic => <Link to={`/${topic.slug}/articles`} > <a  className="navbar-item has-text-weight-bold" href="/">
                  {topic.title}
                </a> </Link>)}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
import React from 'react'
import  { Link }  from 'react-router-dom'

class Nav extends React.Component {
    render() {
        return (
            <nav class="navbar has-text-weight-bold">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                   <section className = 'has-text-black'> NorthCoders News </section>
                    </a>
                    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" class="navbar-menu">
                    <div class="navbar-start">

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link" href="/documentation/overview/start/">
                                Topics
        </a>
                            <div class="navbar-dropdown is-boxed">
                                {this.props.topics.map(topic => <Link to={`/${topic.slug}/articles`} > <a  class="navbar-item has-text-weight-bold" href="/documentation/overview/start/">
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
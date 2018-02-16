import React from 'react'
import {Link} from 'react-router-dom';

class Home extends React.Component{
    render(){
        const colours = ["danger", "warning", "info"]
        return (
            <section className= 'section'>{this.props.topics.map((topic, index) => {
                return <section className= {`box title notification is-${colours[index]} has-text-dark`}> <Link to={`/${topic.slug}/articles`} > <h2 > {topic.title} </h2> </Link></section>
                })} 
            </section>
        )
    }
}

export default Home;
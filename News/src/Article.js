import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

class Article extends Component {
    state = {
        title: "",
        body: "",
        created_by: "",
        belongs_to: "",
        votes: 0
    }

    componentDidMount(event) {
        this.fetchArticle(this.props.match.params.id)
    }

    fetchArticle(id) {
       return fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${id}`)
            .then(resbuffer => resbuffer.json())
            .then((res) => {
                console.log(res)
                this.setState({
                    title: res.title,
                    body: res.body,
                    created_by: res.created_by,
                    belongs_to: res.belongs_to,
                    votes: res.votes
                })
            })
            .catch(console.log)
    }

    render(){
        return (
            <div>
                <p><b>{this.state.title} </b></p>
                <p>{this.state.body} </p>
                <p>Created by: <NavLink to={`/users/${this.state.created_by}`}>{this.state.created_by} </NavLink></p>
                <p>Topic: <NavLink to={`/topics/${this.state.belongs_to}`}> {this.state.belongs_to}</NavLink></p>
                <p>Votes: {this.state.votes} </p>
            </div>
        )
    }
}
export default Article;
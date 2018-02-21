import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

class Article extends Component {
    state = {
      title: '',
      body: '',
      created_by: '',
      belongs_to: '',
      comments: 0,
      votes: 0
    }

    componentDidMount(event) {
      this.fetchArticle(this.props.match.params.id);
      this.fetchComments(this.props.match.params.id);
    }

    fetchArticle(id) {
      return fetch(`https://be-nc-news.herokuapp.com/api/articles/${id}`)
        .then(resbuffer => resbuffer.json())
        .then((res) => {
          this.setState({
            title: res.article.title,
            body: res.article.body,
            created_by: res.article.created_by,
            belongs_to: res.article.belongs_to,
            votes: res.article.votes
          });
        })
        .catch(console.log);
    }

    fetchComments(id) {
      return fetch(`https://be-nc-news.herokuapp.com/api/articles/${id}/comments`)
        .then(resbuffer => resbuffer.json())
        .then((res) => {
          this.setState({
            comments: res.comments
          });
        })
        .catch(console.log);
    }

    render(){
      return (
        <div>
          <p><b>{this.state.title} </b></p>
          <p className="box" >{this.state.body} </p>
          <p>Created by: <NavLink to={`/users/${this.state.created_by}`}>{this.state.created_by} </NavLink></p>
          <p>Topic: <NavLink to={`/${this.state.belongs_to}/articles`}> {this.state.belongs_to}</NavLink></p>
          <p>Votes: {this.state.votes} </p>
          <p> comments: <NavLink to={`${this.props.match.params.id}/comments`} >  {this.state.comments.length} </NavLink> </p> 
        </div>
      );
    }
}

export default Article;
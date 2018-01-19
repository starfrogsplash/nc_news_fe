import React, { Component } from 'react';
import { BrowserRouter, Link, Route, NavLink } from 'react-router-dom'
import './App.css';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.fetchAllArticles()
  }
  componentWillReceiveProps() {
    this.fetchAllArticles()
  }

  fetchAllArticles = () => {
    fetch('http://northcoders-news-api.herokuapp.com/api/articles')
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        this.setState({
          articles: res.articles
        })
      })
      .catch(console.log)
  }


  changeVotes = (article_id, vote) => {
    fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${article_id}?vote=${vote}`, { method: 'PUT' })
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        const newArticleArray = this.state.articles.map((article) => {
          if (article._id === res._id) {
            return res
          } else {
            return article
          }
        })
        this.setState({
          articles: newArticleArray
        })
      })
      .catch(console.log)
  }

  render() {
    const ArticlesArray = this.state.articles
    return (
      <div>
        <header className="Article-header">
          <h1 className="Articles-title">Topics</h1>
          <Link to='/articles' > <h2 className="Article">Articles</h2> </Link>
        </header>
        {ArticlesArray.map((article) => {
          console.log(article);
          return (
            <div>
              <p className="box">
                <h1> <b>{article.title} </b></h1>
                <h2> <NavLink to={`/articles/${article._id}`} >{article.body} </NavLink> </h2>
                <p> <NavLink to={`/users/${article.created_by}`} > {article.created_by} </NavLink> </p>
                <p>  <NavLink to={`/${article._id}/comments`} > comments: {article.comments} </NavLink> </p>
                <p>
                  <button onClick={() => this.changeVotes(article._id, 'up')}> Up </button>
                  Votes: {article.votes}
                  <button onClick={() => this.changeVotes(article._id, 'down')}> Down </button>
                </p>
              </p>
            </div>)
        })}
      </div>
    );
  }
}

export default Articles;
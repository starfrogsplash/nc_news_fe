import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './App.css';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.fetchAllArticles();
  }
  componentWillReceiveProps() {
    this.fetchAllArticles();
  }

  fetchAllArticles = () => {
    fetch('https://be-nc-news.herokuapp.com/api/articles')
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        this.setState({
          articles: res.articles
        });
      })
      .catch(console.log);
  }

  changeVotes = (article_id, vote) => {
    fetch(`https://be-nc-news.herokuapp.com/api/articles/${article_id}?vote=${vote}`, { method: 'PUT' })
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        const newArticleArray = this.state.articles.map((article) => {
          if (article._id === res.article._id) {
            return res.article;
          } else {
            return article;
          }
        });
        this.setState({
          articles: newArticleArray
        });
      })
      .catch(console.log);
  }

  render() {
    const ArticlesArray = this.state.articles;
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
              <section class="column is-11 is-offset-1">
              <p className="box">
                <h1> <NavLink to={`/articles/${article._id}`} >{article.title} </NavLink> </h1>
                <h2> <NavLink to={`/articles/${article._id}`} >{article.body} </NavLink> </h2>
                <br/> 
                <p> <NavLink to={`/users/${article.created_by}`} > {article.created_by} </NavLink> </p>
                <p> <NavLink to={`${article._id}/comments`} > comments: {article.comments} </NavLink> </p>
                <p>
                <i class="fa fa-arrow-circle-up" onClick={() => this.changeVotes(article._id, 'up')}>  </i>
                Votes: {article.votes}
                <button onClick={() => this.changeVotes(article._id, 'down')}> Down </button>
                </p>
              </p>
              </section>
            </div>);
        })}
      </div>
    );
  }
}

export default Articles;
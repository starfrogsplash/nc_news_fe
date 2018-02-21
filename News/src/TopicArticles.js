import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

class TopicArticles extends Component {
    state = {
      articles: []
    }

    componentDidMount() {
      this.fetchArticlesByTopic(this.props.match.params.topic_name);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchArticlesByTopic(nextProps.match.params.topic_name);
    }

      fetchArticlesByTopic = (topic) => {
        fetch(`https://be-nc-news.herokuapp.com/api/topics/${topic}/articles`)
          .then(resbuffer => resbuffer.json())
          .then((res) => {
            console.log(res);
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
        console.log(res);
        const newArticleArray = this.state.articles.map((article) => {
          if (article._id === res._id) {
            return res;
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
        {ArticlesArray.map((article)=>{
          return (
            <div>
              <h1> <b>{article.title} </b></h1>
              <p className="box">  <NavLink to= {`articles/${article._id}`}> {article.body}</NavLink></p>
              <p> CreatedBy: <NavLink to= {`/users/${article.created_by}`}> {article.created_by} </NavLink></p>
              <button onClick={() => this.changeVotes(article._id, 'up')}> Up </button>
              <p> Votes: {article.votes} </p>
              <button onClick={() => this.changeVotes(article._id, 'down')}> Down </button>
              <p> Comments: <NavLink to= {`/${article._id}/comments`}> {article.comments} </NavLink></p>
            </div>);
        })}  
      </div>
    );
  }
}

export default TopicArticles;
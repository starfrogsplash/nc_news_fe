import React, { Component } from 'react';
import {BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import TopicArticles from './TopicArticles'
import Articles from './Articles'
import Article from './Article'
import ArticleComments from './comments'
import Nav from './Nav';
import User from './user';


class HomePage extends Component {
  state = {
    topics: []
  }

  componentDidMount() {
   this.fetchAllTopics()
  }

  fetchAllTopics = () => {
      fetch('http://northcoders-news-api.herokuapp.com/api/topics')
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        this.setState({
          topics: res.topics
        });
      })
      .catch(console.log);
    }


 
  render() {
    const topicsArray = this.state.topics
    return (
      <BrowserRouter>
      <div className="App">
      <Nav />
        <header className="App-header">
          <h1 className="App-title">Topics</h1>
         <Link to ='/articles' > <h2 className = "Article">Articles</h2> </Link>
        </header>
        {topicsArray.map((topic)=>{
          return <Link to = {`/${topic.slug}/articles`} > <h2 > {topic.title} </h2> </Link>
        })}
        <div>
           <Route exact path ='/:topic_name/articles' component = {TopicArticles} />
           <Route exact path ='/articles/:id' component = {Article} />
           <Route exact path ='/articles' component = {Articles} />
           <Route exact path ='/users/:username' component = {User} />
           <Route exact path = '/:article_id/comments' component= {ArticleComments} />
           
        </div>  
      </div>
      </BrowserRouter>
    );
  }
}


export default HomePage;

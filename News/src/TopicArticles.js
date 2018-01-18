import React, { Component } from 'react';
import {BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

class TopicArticles extends Component {
    state = {
      articles: []
    }

    componentDidMount() {
      this.fetchArticlesByTopic(this.props.match.params.topic_name)
    }

    componentWillReceiveProps(nextProps) {
      this.fetchArticlesByTopic(nextProps.match.params.topic_name)
    }

      fetchArticlesByTopic = (topic) => {
          fetch(`http://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`)
            .then(resbuffer => resbuffer.json())
            .then((res) => {
              console.log(res)
              this.setState({
                articles: res.articles
              })
            })
            .catch(console.log)
        }

    render() {
        const ArticlesArray = this.state.articles
        const topic = this.props.match.params.topic_name
       // console.log(ArticlesArray)
        return (
          <div>
                {ArticlesArray.map((article)=>{
                  return <p className="box">{article.body}</p>
                })}
            </div>
        );
      }
    }



export default TopicArticles;
import React, { Component } from 'react';
import {BrowserRouter, Link, Route } from 'react-router-dom'
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

      render() {
        const ArticlesArray = this.state.articles
        return (
          <div>
                {ArticlesArray.map((article)=>{
                  return <p className="box">{article.body}</p>
                })}
            </div>
        );
      }
    }


export default Articles;
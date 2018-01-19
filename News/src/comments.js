import React, { Component } from 'react';
import {BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';


class ArticleComments extends Component {
    state = {
        comments: [],
        article: {}
    }

    componentDidMount() {
        this.fetchCommentsByArticleID(this.props.match.params.article_id)
        this.fetchArticleByArticleID(this.props.match.params.article_id)
      }
  
      componentWillReceiveProps(nextProps) {
        this.fetchCommentsByArticleID(nextProps.match.params.article_id)
        this.fetchArticleByArticleID(this.props.match.params.article_id)
      }

    fetchCommentsByArticleID = (article) => {
        fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${article}/comments`)
            .then(resBuffer => resBuffer.json())
                .then((res) =>{
                    this.setState({
                        comments:res.comments
                    })
                })
                .catch(console.log)
    }

    fetchArticleByArticleID = (ID) => {
        fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${ID}`)
        .then(resBuffer => resBuffer.json())
        .then((res) =>{
            console.log(res)
            this.setState({
                article: res
            })
        })
        .catch(console.log('error'))
    }




    render(){
           const commentsArray = this.state.comments 
           const article = this.state.article
            return (
                <div>
                <p className="box" >{article.body}</p>
                    {commentsArray.map((Articlecomments)=>{
                        return <p className="comments-box" >{Articlecomments.body}</p>
                    })}
                </div>   
            )
        }
}

export default ArticleComments;
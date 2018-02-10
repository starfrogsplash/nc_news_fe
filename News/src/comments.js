import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';


class ArticleComments extends Component {
    state = {
        comments: [],
        newComment: {},
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

    postComment = () => {
        fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${this.props.match.params.article_id}/comments`, { method: 'POST', 
        body: JSON.stringify({
            comment: document.getElementById("Post-Comment").value
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
          return response.json()
        })
        .then(function(body){
          console.log(body);
        });
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


    changeVotes = (comment_id, vote) => {
        fetch(`http://northcoders-news-api.herokuapp.com/api/comments/${comment_id}?vote=${vote}`, { method: 'PUT' })
          .then(resbuffer => resbuffer.json())
           .then((res) => {
            const newCommentsArray = this.state.comments.map((comment) => {
              if (comment._id === res._id) {
                return res
          } else {
            return comment
          }
        })
            this.setState({
              comments: newCommentsArray
            })
          })
          .catch(console.log)
        }


    render(){
           const commentsArray = this.state.comments 
           const article = this.state.article
            return (
                <div>
                <p className="box" >{article.body}</p>
                <form >
                    Add a comment:<br/>
                    <input type="text" className="Post-Comment" id= 'Post-Comment'/>
                    <button onClick={this.postComment} type="submit" form="nameform" value="Submit">Submit</button>
                 </form>
                    {commentsArray.map((Articlecomments)=>{
                        return (
                        <div>
                        <p className="comments-box" >{Articlecomments.body}</p>
                        <button onClick={() => this.changeVotes(Articlecomments._id, 'up')}> Up </button>
                        <p> Votes: {article.votes} </p>
                        <button onClick={() => this.changeVotes(Articlecomments._id, 'down')}> Down </button>
                        </div>)
                    })}
                </div>   
            )
        }
}

export default ArticleComments;
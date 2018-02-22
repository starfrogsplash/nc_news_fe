import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { Message } from 'bulma'
// import 'bulma/css/bulma.css'
import './App.css';



class ArticleComments extends Component {
  state = {
    comments: [],
    newComment: {},
    article: {},
    value: ''
  }

  componentDidMount() {
    this.fetchCommentsByArticleID(this.props.match.params.article_id);
    this.fetchArticleByArticleID(this.props.match.params.article_id);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCommentsByArticleID(nextProps.match.params.article_id);
    this.fetchArticleByArticleID(this.props.match.params.article_id);
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const newComment = this.state.value;
    this.postComment(newComment);
  }

  postComment = (newComment) => {
    fetch(`https://be-nc-news.herokuapp.com/api/articles/${this.props.match.params.article_id}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment: newComment
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then( body => {
        this.setState({value: ''})
        this.fetchCommentsByArticleID(this.props.match.params.article_id);
      });
  }

  deleteComment = (comment_id, author) => {
    if (author === 'northcoder') {
      fetch(`https://be-nc-news.herokuapp.com/api/comments/${comment_id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            this.fetchCommentsByArticleID(this.props.match.params.article_id);
          }
        })
        .catch(console.log);
    } else {
      alert('You cannot delete this comment!!');
    }
  }

  fetchCommentsByArticleID = (article) => {
    fetch(`https://be-nc-news.herokuapp.com/api/articles/${article}/comments`)
      .then(resBuffer => resBuffer.json())
      .then((res) => {
        const comm = res.comments.reverse();
        this.setState({
          comments: comm
        });
      })
      .catch(console.log);
  }

  fetchArticleByArticleID = (ID) => {
    fetch(`https://be-nc-news.herokuapp.com/api/articles/${ID}`)
      .then(resBuffer => resBuffer.json())
      .then((res) => {
        this.setState({
          article: res.article
        });
      })
      .catch(console.log('error'));
  }

  changeVotes = (comment_id, vote) => {
    fetch(`https://be-nc-news.herokuapp.com/api/comments/${comment_id}?vote=${vote}`, { method: 'PUT' })
      .then(resbuffer => resbuffer.json())
      .then((res) => {
        const newCommentsArray = this.state.comments.map((comment) => {
          if (comment._id === res._id) {
            return res;
          } else {
            return comment;
          }
        });
        this.setState({
          comments: newCommentsArray
        });
      })
      .catch(console.log);
  }

  render() {
    const commentsArray = this.state.comments;
    const article = this.state.article;
    return (
      <div>
        <p className="box" > {article.body}</p>
        <form onSubmit={this.handleSubmit}>
          <section className='columns'>
            <section className='column is-one-third'></section>
            <section className='column'>
              <div class="field">
                <label for='Post-Comment' class="label">Add a comment</label>
                <div class="control">
                  <textarea id='Post-Comment' value={this.state.value} onChange={this.handleChange} class="textarea Post-Comment" placeholder="Enter Comment"></textarea>
                </div>
              </div>
            </section>
            <section className='column'></section>
          </section>
          <button id='commentInput' type="submit">Submit</button>
        </form>
        {commentsArray.map((Articlecomments) => {
          return (
            <section className='column is-three-fifths is-offset-one-fifth'>
              <article class="message is-info">
               <div class="message-body">
                      {Articlecomments.body}
                      <p><i class="fa fa-arrow-circle-up" onClick={() => this.changeVotes(Articlecomments._id, 'up')}> </i> </p>
                      <p> Votes: {Articlecomments.votes} </p>
                      <i class="fa fa-arrow-circle-down" onClick={() => this.changeVotes(Articlecomments._id, 'down')}> </i>
                      <p> Created_by:<NavLink to={`/users/${Articlecomments.created_by}`} > {Articlecomments.created_by} </NavLink></p>
                      <p> <button onClick={this.deleteComment.bind(null, Articlecomments._id, Articlecomments.created_by)}>Delete</button></p>
                </div> 
              </article>
            </section> );
        })}
      </div>
    );
  }
}

export default ArticleComments;
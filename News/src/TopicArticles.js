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
            <div class="column is-narrow" >
              <h1 style={{'margin-top': '2em 0'}}class = "Title_Article"> <NavLink to= {`articles/${article._id}`}> <b>{article.title} </b> </NavLink> </h1>
                <p class= "Display_Articles" className="box"> {article.body} 
                  <div>
                  <br/> 
                  <p> <b>CreatedBy: </b> <NavLink to= {`/users/${article.created_by}`}> {article.created_by} </NavLink></p>
                  </div>
                  <i class="fa fa-arrow-circle-up" onClick={() => this.changeVotes(article._id, 'up')}> </i>
                  <p> <b>Votes: </b> {article.votes} </p>
                  <i class="fa fa-arrow-circle-down"  onClick={() => this.changeVotes(article._id, 'down')}> </i>
                  <p> <b>Comments: </b> <NavLink to= {`${article._id}/comments`}> {article.comments} </NavLink></p>
              </p>  
            </div>);
        })}  
      </div>
    );
  }
}

export default TopicArticles;
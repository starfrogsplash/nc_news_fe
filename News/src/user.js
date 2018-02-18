import React, { Component } from 'react';
import './App.css';

class User extends Component {
    state = {
        username: "",
        name: "",
        avatar_url: ""
    }

    componentDidMount(event) {
        this.fetchUser(this.props.match.params.username)
      }

    fetchUser = username => {
        return fetch(`https://be-nc-news.herokuapp.com/api/users/${username}`)
          .then(resbuffer => resbuffer.json())
          .then((res) => {
              console.log('********' + res)
            this.setState({
              username: res.users.username,
                name: res.users.name,
                avatar_url: res.users.avatar_url,
            })
          })
          .catch(console.log)
        }

        render(){
            const username = this.state.username
            const name = this.state.name 
            const avatar_url = this.state.avatar_url   

             return (
                 <div>
                 <p> Username: {username} </p>
                 <p> name: {name} </p>  
                 <img src = {avatar_url} />         
                 </div>   
             )
         }



}
export default User;
import React, { Component } from "react";
// Packages
import axios from "axios";
// Components
import Joke from "./Joke";
// Style
import "../Css/JokeList.css"

class JokeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            jokes: [],
            isLoading: false
        }
        this.seenJoke = new Set(this.state.jokes.map(joke => joke.text))
    }

    async getJokes() {
        let jokes = []
        while (jokes.length < 10) {
            const res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
            const joke = {...res.data, vote: 0}
            
            if(!this.seenJoke.has(res.data.joke)){
                jokes.push(joke)
            }
            
        }
        this.setState(st => ({jokes: [...st.jokes, ...jokes], isLoading: false}),
         () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
        
    }

    getJokesFromLS(){
        const jokes = JSON.parse(localStorage.getItem("jokes"))
        return jokes === null ? [] : jokes
    }

    componentDidMount() {
        const jokesLS = this.getJokesFromLS()

        this.setState({jokes: jokesLS})
    }   
    
    handleVoting(id, delta){
        this.setState(st => ({jokes: st.jokes.map(j => j.id === id ? {...j, vote: j.vote + delta} : j)}), 
        () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }

    handleClick = () => {
        this.setState({isLoading: true}, this.getJokes)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="joke-list-spinner">
                    <i className="fa-solid fa-8x fa-spinner fa-spin"></i>
                    <h1 className="loading">LOADİNG....</h1>
                </div>
                
            )
        } else {
            let sortedJokes = this.state.jokes.sort((a, b) => b.vote - a.vote);
            return (
                <div className="joke-list">
                    <div className="joke-list-side-bar">
                        <h1 className="joke-list-title">Dad Jokes</h1>
                        <i className="em em-sweat_smile"></i>
                        <button className="get-jokes-btn" onClick={this.handleClick}>Get Awful Dad Jokes</button>
                    </div>
                    <div className="joke-list-jokes">
                        {sortedJokes.map(joke => (
                        <Joke 
                            key={joke.id} 
                            id={joke.id} 
                            joke={joke.joke} 
                            vote={joke.vote} 
                            upvote={() => this.handleVoting(joke.id, 1)} 
                            downvote={() => this.handleVoting(joke.id, -1)}
                        />))}
                    </div>
                </div>
            )
        }
    }
}

export default JokeList;
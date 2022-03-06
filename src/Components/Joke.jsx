import React, { Component } from "react";
import "../Css/Joke.css";

class Joke extends Component {
    static defaultProps = {
        maxVote: 10,
        minvote: -5
    }

    render() {
        const { vote, joke } = this.props;
        return (
            <div className="joke">
                <div className="joke-vote">
                    <button onClick={this.props.upvote}><i className="fa-solid fa-angle-up"></i></button>
                    <div className="vote">{vote}</div>
                    <button onClick={this.props.downvote}><i className="fa-solid fa-angle-down"></i></button>
                </div>
                <div className="single-joke">{joke}</div>
                <div className="joke-emo"><i className={`fa-solid fa-face-${vote < 0 
                    ? "frown red" 
                    : vote > 5 
                    ? "grin-beam yellow"
                    : "meh ice"}`}></i>
                </div> 
            </div>
        )
    }
}

export default Joke;
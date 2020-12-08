import React, { Component } from 'react';
import {HashRouter , Link} from 'react-router-dom';
import { connect } from "react-redux";


//styling
import Button from '@material-ui/core/Button'
import './MovieDetails.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


class MoviesDetails extends Component {
            componentDidUpdate = () =>{
                console.log('COMPONENTDIDUPDATE', this.props.details);
                this.props.dispatch({
                            type: "SELECTED_MOVIE",
                            payload: this.props.details
                })
}

    render(){
        return (
        <HashRouter>
            <>
            <div>
                    <h1>{this.props.details.title}</h1>
                    <img src={this.props.details.poster} alt={this.props.details.title} id="imgPoster"/>
                
                    <div id="detailsPara">
                            <h4>Genre(s): {this.props.details.genre}</h4>
                            <p>{this.props.details.description}</p>
                    </div>
           </div>

            <Link to="/" exact>
                    <Button id="backBtn" startIcon={<KeyboardBackspaceIcon/>}>BACK</Button>
            </Link>
            </>
        </HashRouter>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    details: reduxState.detailsReducer
});
export default connect(mapReduxStateToProps)(MoviesDetails);
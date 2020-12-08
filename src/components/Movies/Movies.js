import React, { Component } from 'react';
import { connect } from "react-redux";

//component
import MoviesItem from '../MoviesItems/MoviesItems';

//styling
import Grid from '@material-ui/core/Grid';

class Movies extends Component {
  componentDidMount =() =>
      this.props.dispatch({
        type: "REFRESH_MOVIES"
      })

  render() {
    return (
      <Grid
            container
            direction = "row"
            justify = "space-evenly"
            alignItems = "center" >
        
      <div className="Movies">
                {this.props.movies.map(item =>
                <MoviesItem key = {item.id} item = {item}/>)}
      </div>


      </Grid>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
  movies: reduxState.moviesReducer
});
export default connect(mapReduxStateToProps)(Movies);

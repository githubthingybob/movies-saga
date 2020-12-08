import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

 

class MoviesItems extends Component {

      onClickDetails =() =>{
            console.log('onClickDetails in MoviesItem', this.props.item);
            this.props.dispatch({
              type: "DETAILS",
              payload: this.props.item
            })
            this.props.history.push(`/details/${this.props.item.id}`);

      }

  render() {
    return (
      <>
          <img src={this.props.item.poster} onClick={this.onClickDetails} alt={this.props.item.title}/>
      </>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default withRouter(connect(mapReduxStateToProps)(MoviesItems));

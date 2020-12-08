import React, { Component } from 'react';
import {HashRouter, Link} from 'react-router-dom';
import { connect } from "react-redux";


//styling & materiualUI
import { TextField, Select, Button}from '@material-ui/core/';
import './MovieForm.css'
import FormControl from '@material-ui/core/FormControl';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CancelIcon from '@material-ui/icons/Cancel';



class MovieForm extends Component {

        componentDidMount =() =>{
                this.props.dispatch({
                  type: "FETCH_GENRES" //must match rootSaga
                })

          this.props.dispatch({
            type: "REFRESH_MOVIES" //must match rootSaga
          })
        } //end componentDidMount

            state ={
                  newMovie: {
                        title: '',
                        description: '',
                        poster: '', 
                        genreID:''
                  },
            }//end state
        
        //capture onChanges
        onChange = (propertyName, event) => {
                this.setState({
                      newMovie: {
                        ...this.state.newMovie,
                        [propertyName]: event.target.value
                      }
                })
          }//end onChange

        onSubmit = () =>{
          console.log('NEWMOVIE', this.state.newMovie);
          this.props.dispatch({
                type: "ADD_MOVIE", //must match ROOTsaga
                url: '/api/movie',
                payload: {
                  title:this.state.newMovie.title,
                  description: this.state.newMovie.description,
                  poster: this.state.newMovie.poster,
                  genreID: this.state.newMovie.genreID
                }
              })
              //emptyfields
          this.setState({
                newMovie:{
                  title:'',
                  description: '',
                  poster:''
                }
          })
        } //end onSubmit

  render() {
    return (
      <HashRouter>
      <div className="MovieForm">
              <span className="divider">
                <TextField required id="titleField" label="Title" variant="outlined"  size="small"
                    onChange={(event) => this.onChange('title', event)}
                    value={this.state.newMovie.title}/> 
              </span>

              <span className="divider">
                <TextField required id ="summaryField" label="Description" variant="outlined"size="small"
                    onChange={(event) =>this.onChange('description', event)}
                    value={this.state.newMovie.description}/>
              </span>

              <span className="divider">
                <TextField required id="urlField" label="Poster URL" variant="outlined" size="small" 
                    onChange={(event) => this.onChange('poster', event)}
                    value={this.state.newMovie.poster}/> 
              </span>
  
              <span className="divider"><FormControl required variant="outlined" size="small" >
                  <Select 
                    native
                    labelId="genre-label" id="selectGenre"
                    onChange={(event) => this.onChange('genreID', event)}
                    >
                              {this.props.genresProp.map((genre, i) =>
                                <option key={i} value={genre.id}>{genre.genre}</option>)}
                              
                  </Select>
              </FormControl> 
              </span>

              <span className="divider">
                 <Link to="/" exact><Button id="btnAddMovie" startIcon={<AddCircleOutlineRoundedIcon/>}
                      onClick = {this.onSubmit}
                        >Add Movie
                      </Button></Link>
              </span>


              <span className="divider">
                  <Link to="/" exact>
                        <Button id="btnCancel" startIcon ={<CancelIcon/>}>Cancel</Button> 
                  </Link>
              </span>

      </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    genresProp: reduxState.genresReducer
  }
}
export default connect(mapStateToProps)(MovieForm);

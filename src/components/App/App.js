import React, { Component } from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';
import { connect } from "react-redux";

//components
import Movies from "../Movies/Movies";
import MovieForm from "../MovieForm/MovieForm";
import MovieDetails from "../MovieDetails/MovieDetails";



//materialUI & styling
import './App.css';
import {ThemeProvider,createMuiTheme,} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import MovieIcon from '@material-ui/icons/Movie';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
    type: 'dark'
  }
})
//materialUI ends


class App extends Component {

      render() {
        return (
          <ThemeProvider theme={customTheme}>
              <HashRouter>
                      <header>
                              <h1 id="header"><MovieIcon/> Movie Database <MovieIcon/></h1>
                      </header>


                    {/* buttons for nav */}
                      <div id="buttons">
                              <span className="divider">
                                <Button id="btnAddMovie" startIcon={<HomeIcon/>}><Link to="/" exact>Home</Link></Button>
                              </span>

                              <span className="divider">
                                <Button id="btnAddMovie" startIcon={<AddCircleOutlineRoundedIcon/>}><Link to="/add-movie" exact>Add A Movie</Link></Button> 
                              </span>
                      </div>

                      <div id="main">
                              <Route path="/" exact>
                                    <Movies/>
                              </Route>

                              <Route path="/add-movie">
                                    <MovieForm/>
                              </Route>

                              <Route path="/details/:id">
                                    <MovieDetails/>
                              </Route>
                      </div>
              </HashRouter>
        </ThemeProvider>
        );
      }
    }




export default connect()(App);


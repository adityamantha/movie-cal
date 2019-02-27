import React, { Component } from 'react';
import Modal from "./Modal";
import axios from "axios";

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentMovie: {},
            genres: []
        };
    }

    handleClick = () => {
        this.setState(state => ({
            show: !state.show
        }));
    }

    showDetails = (e) => {
        // console.log('Clicked Movie:', this.props.movie.title);
        this.GetMovieInfo(this.props.movie.id);
        this.handleClick();
    }

    GetMovieInfo = (movieId) => {
        const dataURL = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=65e6bc1538850728c0b4e346679410ef&language=en-U";
        return axios.get(dataURL).then(res => {
            const movieInfo = res.data;
            this.setState({ currentMovie: movieInfo, genres: movieInfo.genres });
            // console.log(this.state.currentMovie);
        })
    }
    render() {
        const photoURL = "https://image.tmdb.org/t/p/w500/";
        return (

            <div className="card col-md-4" id={this.props.id} onClick={this.showDetails} >
                <div className="card-body">
                    <img src={photoURL + this.props.movie.poster_path} className="Poster"></img>
                    <p className="card-text">{this.props.movie.title}</p>
                </div>
                <Modal show={this.state.show}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{this.props.movie.title}</h5>
                            <button type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="no-style">
                                <li><strong>Description :</strong> {this.props.movie.overview}</li>
                                <li><strong>Genre :</strong> {
                                    this.state.genres.map((genre =>
                                        <span key={genre.id}>{genre.name} </span>
                                    ))
                                }</li>
                                <li><strong>Tag Line :</strong> {this.state.currentMovie.tagline}</li>
                                <li><strong>Runtime :</strong> {this.state.currentMovie.runtime} minutes</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">Close</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Movie;
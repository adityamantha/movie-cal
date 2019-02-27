import React, { Component } from 'react';
import axios from 'axios';
import Movie from "./Movie";
import Pagination from "react-js-pagination";
import _ from 'lodash';

class Body extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            pageCount: "",
            items: [],
            activePage: 1,
            totalMovieCount: ""
        };

    }

    componentDidMount() {
        this.GetMovieList(1);
    }

    GetMovieList(page) {
        const dataURL = "https://api.themoviedb.org/3/discover/movie?api_key=65e6bc1538850728c0b4e346679410ef&language=en-US&primary_release_year=2019&sort_by=primary_release_date.asc&with_original_language=en&page=" + page;
        return axios.get(dataURL).then(res => {
            const movieList = res.data;
            let popular = _.filter(movieList.results, ({ popularity }) => popularity >= 10);
            // console.log(popular);
            this.setState({ movieList: movieList.results, pageCount: movieList.total_pages, totalMovieCount: movieList.total_results });
            // console.log(this.state.movieList, this.state.pageCount, this.state);
        })
    }

    handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.GetMovieList(pageNumber);
        this.setState({ activePage: pageNumber });
    }

    render() {
        return (
            <div>
                <div className="center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.state.totalMovieCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
                <div className="row">
                    {

                        this.state.movieList.map((mo =>
                            <Movie movie={mo} key={mo.id} id={mo.id} />
                        ))
                    }

                </div>
                <div className="center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.state.totalMovieCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}
export default Body;
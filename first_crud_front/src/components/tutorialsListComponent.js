import React, { Component } from 'react';
import TutorialDataService from '../services/tutorialServices';
import { Link } from 'react-router-dom';

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    // mount가 된 후에 retrieveTurorials를 동작한다.
    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    // 모든 요소들을 가져온다.
    retrieveTutorials() {
        TutorialDataService.getAll()
        .then(response => {
            // 정상 동작 한다면 state의 tutorials에 저장
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    // list를 새로 고침한다.
    // 모든 요소를 가져오고 인덱스와 현재 요소를 초기화
    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }
    // 현재 요소를 지정
    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }
    // 모든 요소 삭제
    removeAllTutorials() {
        TutorialDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }
    // state의 title을 기준으로 탐색
    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            // 탐색하면 tutorials에 저장
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchTitle}
                            >
                            Search
                            </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>
                <ul className="list-group">
                    {tutorials &&
                    tutorials.map((tutorial, index) => (
                        <li
                        className={
                            "list-group-item" +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTutorial(tutorial, index)}
                        key={index}
                        >
                            {tutorial.title}
                        </li>
                    ))}
                </ul>
                <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllTutorials}
                >
                    Remove All
                </button>
            </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>
                                        Title:
                                    </strong>
                                </label>{" "}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>
                                        Description:
                                    </strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>
                                        Status:
                                    </strong>
                                </label>{" "}
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                            <Link
                            to={'/tutorials/' + currentTutorial.id}
                            className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
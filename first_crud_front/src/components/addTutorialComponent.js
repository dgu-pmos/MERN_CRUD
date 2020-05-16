import React, { Component } from 'react';
import TutorialDataService from '../services/tutorialServices';

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        // callback 함수에서 this가 작동하려면 아래와 같이 바인딩 해야한다.
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        };
    }
    // title input event handler
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    // description input event handler
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    // save button event handler
    saveTutorial() {
        // data 변수를 생성해서 input의 정보를 저장
        var data = {
            title: this.state.title,
            description: this.state.description
        };
        // POST request에 data를 담아서 전송
        TutorialDataService.create(data)
        // 정상 동작했다면 setState
        .then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published,
                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    // init state 
    newTutorial() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        });
    }

    render() {
        return (
            /* submitted 가 true 라면 성공 화면 렌더링 */
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button>
                    </div>
                ) : (
                    /* false라면 입력하도록 form 제공 */
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            name="title"
                            >
                            </input>
                        </div>
                        <div className="from-group">
                            <label htmlFor="description">description</label>
                            <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.state.onChangeDescription}
                            name="description"
                            >
                            </input>
                        </div>
                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
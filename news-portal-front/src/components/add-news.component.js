import React, { Component } from "react";
import NewsDataService from "../services/news.service";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import { withTranslation } from 'react-i18next';

class AddNews extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeNewsDate = this.onChangeNewsDate.bind(this);
        this.onChangeBrief = this.onChangeBrief.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.saveNews = this.saveNews.bind(this);
        this.newNews = this.newNews.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: null,
            title: "",
            newsDate: "",
            brief: "",
            Content: "",

            message: "",
            submitted: false
        };
    }

    componentDidMount() {
        if(!this.state.currentUser.permission.includes("NEWS_WRITE"))
            this.props.history.push('/unauthorized');
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeNewsDate(e) {
        this.setState({
            newsDate: e.target.value
        })
    }

    onChangeBrief(e) {
        this.setState({
            brief: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    saveNews() {
        var data = {
            title: this.state.title,
            newsDate: this.state.newsDate,
            brief: this.state.brief,
            content: this.state.content
        };

        NewsDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    newsDate: response.data.newsDate,
                    brief: response.data.brief,
                    content: response.data.content,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                const resMessage = error.response.data || error.toString();

                this.setState({
                    message: resMessage
                });
            });
    }

    newNews() {
        this.setState({
            id: null,
            title: "",
            newsDate: "",
            brief: "",
            content: "",

            submitted: false
        });
    }

    render() {
        const { t } = this.props;

        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>{t("You submitted successfully!")}</h4>
                        <button className="btn btn-success" onClick={this.newNews}>
                            {t("Add News")}
                        </button>
                    </div>
                ) : (
                    <div>
                        <h6>{t("News")} >> {t("Add News")}</h6>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="title">{t("News Title")}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="newsDate">{t("News Date")}</label>
                            <input
                                type="date"
                                className="form-control"
                                id="newsDate"
                                required
                                value={this.state.newsDate}
                                onChange={this.onChangeNewsDate}
                                name="newsDate"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brief">{t("Brief")}</label>
                            <textarea
                                className="form-control"
                                id="brief"
                                required
                                value={this.state.brief}
                                onChange={this.onChangeBrief}
                                name="brief"
                                rows="2"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">{t("Content")}</label>
                            <textarea
                                className="form-control"
                                id="content"
                                required
                                value={this.state.content}
                                onChange={this.onChangeContent}
                                name="content"
                                rows="6"
                            />
                        </div>

                        <button onClick={this.saveNews} className="btn btn-success">
                            {t("Save")}
                        </button>

                        <Link to={"/news"}>
                            <button onClick={this.saveNews} className="btn btn-warning">
                                {t("Cancel")}
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

export default withTranslation()(AddNews);

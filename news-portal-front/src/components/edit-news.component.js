import React, { Component } from "react";
import NewsDataService from "../services/news.service";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import { withTranslation } from 'react-i18next';

class EditNews extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeNewsDate = this.onChangeNewsDate.bind(this);
        this.onChangeBrief = this.onChangeBrief.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getNews = this.getNews.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.deleteNews = this.deleteNews.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentNews: {
                id: null,
                title: "",
                newsDate: "",
                brief: "",
                content: ""
            },
            message: ""
        };
    }
    componentDidMount() {
        if(!this.state.currentUser.permission.includes("NEWS_WRITE"))
            this.props.history.push('/unauthorized');
        this.getNews(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentNews: {
                    ...prevState.currentNews,
                    title: title
                }
            };
        });
    }

    onChangeNewsDate(e) {
        const newsDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentNews: {
                    ...prevState.currentNews,
                    newsDate: newsDate
                }
            };
        });
    }

    onChangeBrief(e) {
        const brief = e.target.value;

        this.setState(prevState => ({
            currentNews: {
                ...prevState.currentNews,
                brief: brief
            }
        }));
    }

    onChangeContent(e) {
        const content = e.target.value;

        this.setState(prevState => ({
            currentNews: {
                ...prevState.currentNews,
                content: content
            }
        }));
    }

    getNews(id) {
        NewsDataService.get(id)
            .then(response => {
                this.setState({
                    currentNews: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateNews() {
        NewsDataService.update(
            this.state.currentNews.id,
            this.state.currentNews
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The news was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteNews() {
        NewsDataService.delete(this.state.currentNews.id)
            .then(response => {
                this.props.history.push("/news")
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentNews } = this.state;
        const { t } = this.props;

        return (
            <div>
                {currentNews ? (
                    <div className="edit-form">
                        <h6>{t("News")} >> {t("Edit News")}</h6>
                        <br/>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">{t("News Title")}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentNews.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newsDate">{t("News Date")}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newsDate"
                                    value={currentNews.newsDate}
                                    onChange={this.onChangeNewsDate}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brief">{t("Brief")}</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="brief"
                                    value={currentNews.brief}
                                    onChange={this.onChangeBrief}
                                    rows="2"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">{t("Content")}</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="content"
                                    value={currentNews.content}
                                    onChange={this.onChangeContent}
                                    rows="6"
                                />
                            </div>
                        </form>


                        <button
                            className="btn btn-danger"
                            onClick={this.deleteNews}
                        >
                            {t("Delete")}
                        </button>

                        <button onClick={this.updateNews} className="btn btn-success">
                            {t("Save")}
                        </button>

                        <Link to={"/news"}>
                            <button onClick={this.saveNews} className="btn btn-warning">
                                {t("Cancel")}
                            </button>
                        </Link>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a News...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withTranslation()(EditNews);

import React, { Component } from "react";
import NewsDataService from "../services/news.service";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import { withTranslation } from 'react-i18next';

class ViewNews extends Component {
    constructor(props) {
        super(props);
        this.getNews = this.getNews.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
        this.getNews = this.getNews.bind(this);
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
        this.getNews(this.props.match.params.id);
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

    deleteNews() {
        NewsDataService.delete(this.state.currentNews.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push("/news")
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser, currentNews } = this.state;
        const { t } = this.props;

        return (
            <div>
                <div className="edit-form">
                    <h6>{t("News")} >> {t("View News")}</h6>
                    <br/>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">{t("News Title")}</label>
                            <input disabled
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentNews.title}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newsDate">{t("News Date")}</label>
                            <input disabled
                                type="text"
                                className="form-control"
                                id="newsDate"
                                value={currentNews.newsDate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brief">{t("Brief")}</label>
                            <textarea disabled
                                type="text"
                                className="form-control"
                                id="brief"
                                value={currentNews.brief}
                                rows="2"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">{t("Content")}</label>
                            <textarea disabled
                                type="text"
                                className="form-control"
                                id="content"
                                value={currentNews.content}
                                rows="6"
                            />
                        </div>
                    </form>
                    {currentUser.permission.includes("NEWS_WRITE") && (
                        <div>
                            <button className="btn btn-danger" onClick={this.deleteNews}>
                                {t("Delete")}
                            </button>
                            <Link to={"/news/edit/" + currentNews.id}>
                                <button className="btn btn-warning">
                                    {t("Edit")}
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withTranslation()(ViewNews);

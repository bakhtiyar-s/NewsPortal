import React, { Component } from "react";
import NewsDataService from "../services/news.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { withTranslation } from 'react-i18next';

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveNews = this.retrieveNews.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteNews = this.deleteNews.bind(this);

        this.state = {
            news: [],
            currentUser: AuthService.getCurrentUser(),
            currentNews: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveNews();
    }

    retrieveNews() {
        NewsDataService.getAll()
            .then(response => {
                this.setState({
                    news: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveNews();
        this.setState({
            currentNews: null,
            currentIndex: -1
        });
    }

    deleteNews() {
        // NewsDataService.delete(this.state.currentNews.id)
        //     .then(response => {
        //         console.log(response.data);
        //         this.props.history.push("/news")
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    render() {
        const { news, currentUser, currentNews, currentIndex } = this.state;
        const { t } = this.props;

        return (
            <div>
                <div>
                    <br/>
                    <div>
                        {currentUser && news ?
                        news.map((newsItem) => (
                            <div>
                                <h6>{t("News")} >> {t("News List")}</h6>
                                <div>
                                    <div className="row">
                                        <div className="col-sm-3"><strong>{newsItem.title}</strong></div>
                                        <div className="col-sm-7"><strong>{newsItem.brief}</strong></div>
                                        <div className="col-sm-2">{newsItem.newsDate}</div>
                                    </div>
                                    <br/>
                                    <div>{newsItem.content}</div>
                                    <div className="justify-content-lg-end">
                                        {currentUser.permission.includes("NEWS_WRITE") && (<Link to={"/news/edit/" + newsItem.id} className="badge badge-warning">
                                            {t("Edit")}
                                        </Link>)}

                                        <Link to={"/news/" + newsItem.id} className="badge badge-warning">
                                            {t("View")}
                                        </Link>
                                        {/*<input*/}
                                        {/*    type="checkbox"*/}
                                        {/*/>*/}
                                    </div>

                                    <br/>
                                    <br/>
                                </div>
                                {/*<div>*/}
                                {/*    <button*/}
                                {/*        className="badge badge-danger mr-2"*/}
                                {/*        onClick={this.deleteNews}*/}
                                {/*    >*/}
                                {/*        Delete*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>

                        )) : (
                            <div className='container'>
                                <h3>{t("Please login")}</h3>
                            </div>

                            )
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default withTranslation()(NewsList);


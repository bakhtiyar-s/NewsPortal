import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AuthService from "./services/auth.service";
import AddNews from "./components/add-news.component";
import EditNews from "./components/edit-news.component";
import ViewNews from "./components/view-news.component";
import NewsList from "./components/news-list.component";
import Login from "./components/login.component"
import Unauthorized from "./components/unauthorized.component"
import { withTranslation } from 'react-i18next';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAddNews: false,
            showNewsList: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showNewsList: user.permission.includes("NEWS_READ"),
                showAddNews: user.permission.includes("NEWS_WRITE"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { showAddNews, showNewsList, currentUser } = this.state;
        const { t, i18n } = this.props;
        const changeLanguage=(e)=>{
            i18n.changeLanguage(e);
        }

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/news" className="navbar-brand">
                        {t("News Management")}
                    </a>

                    <div className="navbar-nav mr-auto">
                        {currentUser ? (
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a href="/auth/login" className="nav-link" onClick={this.logOut}>
                                        {t("Logout")}
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/auth/login"} className="nav-link">
                                        {t("Login")}
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
                    <div className="navbar-nav mr-auto">
                        {showNewsList && (
                            <li className="nav-item">
                                <Link to={"/news"} className="nav-link">
                                    {t("News List")}
                                </Link>
                            </li>
                        )}
                        {showAddNews && (
                            <li className="nav-item">
                                <Link to={"/news/add"} className="nav-link">
                                    {t("Add News")}
                                </Link>
                            </li>
                        )}

                    </div>
                    <div className="navbar-nav text-right">
                        <li className="nav-item">
                            <button value='en' onClick={() => changeLanguage('en')}>
                                {t("English")}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button value='ru' onClick={() => changeLanguage('ru')}>
                                {t("Russian")}
                            </button>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/news"]} component={NewsList} />
                        <Route exact path="/news/add" component={AddNews} />
                        <Route exact path="/news/edit/:id" component={EditNews} />
                        <Route exact path="/news/:id" component={ViewNews} />
                        <Route exact path="/auth/login" component={Login} />
                        <Route exact path="/unauthorized" component={Unauthorized} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withTranslation()(App);

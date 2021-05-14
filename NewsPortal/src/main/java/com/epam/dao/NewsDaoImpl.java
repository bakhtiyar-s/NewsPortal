package com.epam.dao;

import com.epam.entity.News;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class NewsDaoImpl implements NewsDao {

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<News> listNews() {
        Session session = this.sessionFactory.getCurrentSession();
        List<News> newsList = session.createQuery("from News").list();
        return newsList;
    }

    @Override
    public News addNews(News news) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(news);
        return news;
    }

    @Override
    public void deleteNews(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        News news = session.get(News.class, id);
        if (news != null) {
            session.delete(news);
        }
    }

    @Override
    public News updateNews(News news) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(news);
        return news;
    }

    @Override
    public News getNewsById(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        return session.get(News.class, id);
    }
}

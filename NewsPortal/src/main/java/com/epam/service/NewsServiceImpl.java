package com.epam.service;

import com.epam.dao.GenericDao;
import com.epam.entity.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    GenericDao<News> newsDao;

    @Autowired
    public void setNewsDao(GenericDao<News> newsDao) {
        this.newsDao = newsDao;
        this.newsDao.setEntityClass(News.class);
    }

    @Override
    public List<News> listNews() {
        return this.newsDao.findAll();
    }

    @Override
    public News addNews(News news) {return this.newsDao.create(news);
    }

    @Override
    public void deleteNews(int id) {
        this.newsDao.deleteById(id);
    }

    @Override
    public News updateNews(int id, News news) {
        News oldNews = newsDao.findOne(id);
        oldNews.setTitle(news.getTitle());
        oldNews.setBrief(news.getBrief());
        oldNews.setContent(news.getContent());
        oldNews.setNewsDate(news.getNewsDate());

        return this.newsDao.update(oldNews);
    }

    @Override
    public News getNewsById(int id) {
        return this.newsDao.findOne(id);
    }
}

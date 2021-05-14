package com.epam.service;

import com.epam.dao.NewsDao;
import com.epam.entity.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {
    private NewsDao newsDao;

    @Autowired
    public void setNewsDao(NewsDao newsDao) {
        this.newsDao = newsDao;
    }

    @Override
    public List<News> listNews() {
        return this.newsDao.listNews();
    }

    @Override
    public News addNews(News news) {return this.newsDao.addNews(news);
    }

    @Override
    public void deleteNews(int id) {
        this.newsDao.deleteNews(id);
    }

    @Override
    public News updateNews(int id, News news) {
        News oldNews = newsDao.getNewsById(id);
        oldNews.setTitle(news.getTitle());
        oldNews.setBrief(news.getBrief());
        oldNews.setContent(news.getContent());
        oldNews.setNewsDate(news.getNewsDate());

        return this.newsDao.updateNews(oldNews);
    }

    @Override
    public News getNewsById(int id) {
        return this.newsDao.getNewsById(id);
    }
}

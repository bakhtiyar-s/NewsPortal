package com.epam.service;

import com.epam.entity.News;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NewsService {

    public List<News> listNews();

    public News addNews(News news);

    public void deleteNews(int id);

    public News updateNews(int id, News news);

    public News getNewsById(int id);
}

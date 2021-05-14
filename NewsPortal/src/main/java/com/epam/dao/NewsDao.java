package com.epam.dao;

import com.epam.entity.News;
import java.util.List;

public interface NewsDao {

    public List<News> listNews();

    public News addNews(News news);

    public void deleteNews(int id);

    public News updateNews(News news);

    public News getNewsById(int id);
}

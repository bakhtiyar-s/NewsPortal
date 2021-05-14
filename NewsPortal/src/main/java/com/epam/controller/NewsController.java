package com.epam.controller;

import com.epam.entity.News;
import com.epam.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(value="/api")
public class NewsController {

    private NewsService newsService;

    @Autowired
    public void setNewsService(NewsService newsService) {
        this.newsService = newsService;
    }


    @ResponseBody
    @RequestMapping(value = "/news", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<News>>  listNews() {
        return new ResponseEntity<>(newsService.listNews(), HttpStatus.OK) ;
    }

    @ResponseBody
    @RequestMapping(value = "/news/add", method = RequestMethod.POST,produces = "application/json")
    public News addNews(@RequestBody News news) {
        if (news.getId()==0) {
            newsService.addNews(news);
        } else {
            newsService.updateNews(news.getId(), news);
        }
        return news;
    }

    @ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT, produces = "application/json")
    public News updateNews(@PathVariable("id") int id, @RequestBody News news) {
        return newsService.updateNews(id, news);
    }

    @ResponseBody
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteNews(@PathVariable("id") int id) {
        newsService.deleteNews(id);
    }

    @ResponseBody
    @RequestMapping(value = "/news/{id}", method = RequestMethod.GET, produces = "application/json")
    public News newsById(@PathVariable("id") int id) {
        return newsService.getNewsById(id);
    }

}

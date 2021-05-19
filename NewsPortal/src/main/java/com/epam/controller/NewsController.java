package com.epam.controller;

import com.epam.entity.News;
import com.epam.service.NewsService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(value="/api")
public class NewsController {
    private static final Logger LOGGER = LogManager.getLogger(NewsController.class.getName());
    private NewsService newsService;

    @Autowired
    public void setNewsService(NewsService newsService) {
        this.newsService = newsService;
    }


    @ResponseBody
    @RequestMapping(value = "/news", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<News>>  listNews() {
        try {
            List<News> news = newsService.listNews();
            if (news.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(news, HttpStatus.OK) ;
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/news/add", method = RequestMethod.POST,produces = "application/json")
    public ResponseEntity<?> addNews(@Valid @RequestBody News news, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Title length must be between 20 and 200 characters!", HttpStatus.BAD_REQUEST);
        } else {
            try {
                if (news.getId() == 0) {
                    newsService.addNews(news);
                } else {
                    newsService.updateNews(news.getId(), news);
                }
                return new ResponseEntity<>(news, HttpStatus.CREATED);
            } catch (Exception e) {
                LOGGER.error(e.getMessage(), e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity<News> updateNews(@PathVariable("id") int id, @RequestBody News news) {
        try {
            return new ResponseEntity<>(newsService.updateNews(id, news), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ResponseBody
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<HttpStatus> deleteNews(@PathVariable("id") int id) {
        try {
            newsService.deleteNews(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/news/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<News> newsById(@PathVariable("id") int id) {
        try {
            News news =  newsService.getNewsById(id);
            if (news != null) {
                return new ResponseEntity<>(news, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

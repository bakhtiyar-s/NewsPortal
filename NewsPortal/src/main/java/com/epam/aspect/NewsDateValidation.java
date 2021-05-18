package com.epam.aspect;

import com.epam.entity.News;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Aspect
@Service
public class NewsDateValidation {

    @Pointcut("execution(public * com.epam.controller.NewsController.addNews(..))")
    public void controller() { }

    @Before("controller() && args(.., news)")
    public void advice(News news) throws Exception {
        LocalDate newsDate = news.getNewsDate();
        LocalDate currentDate = LocalDate.now();
        if (newsDate.compareTo(currentDate) > 0) {
            throw new Exception("News cannot be saved with future date!");
        }
    }

}

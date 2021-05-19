package com.epam.dao;

import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
@Scope("prototype")
public class GenericDaoImpl<T extends Serializable> extends AbstractDao<T> implements GenericDao<T> {

    public GenericDaoImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    @Override
    public void setEntityClass(Class<T> entityClass) {
        super.setEntityClass(entityClass);
    }
}

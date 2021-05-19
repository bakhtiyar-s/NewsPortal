package com.epam.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.Serializable;
import java.util.List;

public abstract class AbstractDao<T extends Serializable> {
    private Class<T> entityClass;
    SessionFactory sessionFactory;

    @Autowired
    public AbstractDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void setEntityClass(Class< T > entityClass){
        this.entityClass = entityClass;
    }

    public T findOne(int id){
        return (T) sessionFactory.getCurrentSession().get(entityClass, id);
    }

    public List findAll() {
        return sessionFactory.getCurrentSession().createQuery("from " + entityClass.getName()).list();
    }

    public T create(T entity) {
        sessionFactory.getCurrentSession().saveOrUpdate(entity);
        return entity;
    }

    public T update(T entity) {
        return (T) sessionFactory.getCurrentSession().merge(entity);
    }
    public void delete(T entity) {
        sessionFactory.getCurrentSession().delete(entity);
    }

    public void deleteById(int entityId) {
        T entity = findOne(entityId);
        delete(entity);
    }
}

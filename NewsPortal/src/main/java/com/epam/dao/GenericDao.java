package com.epam.dao;

import java.io.Serializable;
import java.util.List;

public interface GenericDao<T extends Serializable> {
    T findOne(final int id);

    List<T> findAll();

    T create(final T entity);

    T update(final T entity);

    void delete(final T entity);

    void deleteById(final int entityId);

    void setEntityClass(Class<T> entityClass);
}

/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

/**
 * @author Dmitry Loktevich
 *
 */
/**
 * AuthorService
 */
public interface AuthorService<T> {
    T create(T author);

    List<T> getAll();

    T getById(long id);

    void deleteById(long id);
}
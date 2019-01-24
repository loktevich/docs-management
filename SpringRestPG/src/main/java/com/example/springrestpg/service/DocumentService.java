/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentService<T> {
	T create(T doc);

	List<T> getAll();

	T getById(long id);

	T update(T doc);

	void deleteById(long id);
}

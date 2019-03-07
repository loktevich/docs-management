/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentService<T> {
	T create(T doc, MultipartFile file);

	List<T> getAll();

	Page<T> findPaginated(int page, int size, Sort.Direction direction, String properties, String filterBy, String dateRange);

	T getById(long id);

	T update(long id, T doc, MultipartFile file);

	T update(long id, T doc);

	void deleteById(long id);
}

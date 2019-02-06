/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentService<T> {
	T create(T doc, MultipartFile file);

	List<T> getAll();

	T getById(long id);

	T update(long id, T doc, MultipartFile file);

	void deleteById(long id);
}

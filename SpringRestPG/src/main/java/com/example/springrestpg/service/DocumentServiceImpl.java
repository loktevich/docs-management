/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springrestpg.model.Document;
import com.example.springrestpg.repository.DocumentRepository;

/**
 * @author Dmitry Loktevich
 *
 */
@Service
public class DocumentServiceImpl implements DocumentService<Document> {

	@Autowired
	private DocumentRepository repository;

	@Override
	public Document create(Document document) {
		return repository.save(document);
	}

	@Override
	public List<Document> getAll() {
		return repository.findAll();
	}

	@Override
	public Document getById(long id) {
		return repository.getOne(id);
	}

	@Override
	public Document update(Document document) {
		return repository.save(document);
	}

	@Override
	public void deleteById(long id) {
		repository.deleteById(id);
	}

}

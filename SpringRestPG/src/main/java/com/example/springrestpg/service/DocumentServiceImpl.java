/**
 * 
 */
package com.example.springrestpg.service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
	public Document create(Document document, MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Document newDocument = new Document();
		try {
			newDocument.setDocumentName(fileName);
			newDocument.setDocumentType(file.getContentType());
			newDocument.setDescription(document.getDescription());
			newDocument.setAuthor(document.getAuthor());
			newDocument.setDocumentData(file.getBytes());
			newDocument.setCreationDate(new Date(new java.util.Date().getTime()));
			newDocument.setReadOnly(document.isReadOnly());
		} catch (IOException e) {
			e.printStackTrace();
		}

		return repository.save(newDocument);
	}

	@Override
	public List<Document> getAll() {
		return repository.findAll();
	}

	@Override
	public Page<Document> findPaginated(int page, int size, Sort.Direction direction, String properties) {
		return repository.findAll(PageRequest.of(page, size, direction, properties));
	}

	@Override
	public Document getById(long id) {
		return repository.getOne(id);
	}

	@Override
	public Document update(long id, Document document, MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Document existingDocument = repository.getOne(id);
		try {
			existingDocument.setDocumentName(fileName);
			existingDocument.setDocumentType(file.getContentType());
			existingDocument.setDescription(document.getDescription());
			existingDocument.setAuthor(document.getAuthor());
			existingDocument.setDocumentData(file.getBytes());
			existingDocument.setCreationDate(new Date(new java.util.Date().getTime()));
			existingDocument.setReadOnly(document.isReadOnly());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return repository.save(existingDocument);
	}

	@Override
	public Document update(long id, Document document) {
		Document existingDocument = repository.getOne(id);
		existingDocument.setDescription(document.getDescription());
		existingDocument.setAuthor(document.getAuthor());
		existingDocument.setCreationDate(new Date(new java.util.Date().getTime()));
		existingDocument.setReadOnly(document.isReadOnly());
		return repository.save(existingDocument);
	}

	@Override
	public void deleteById(long id) {
		repository.deleteById(id);
	}

}

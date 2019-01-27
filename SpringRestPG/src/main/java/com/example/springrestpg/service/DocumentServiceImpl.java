/**
 * 
 */
package com.example.springrestpg.service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
		try {
			Document newDocument = new Document();
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
	public Document update(Document document, MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			Document newDocument = new Document();
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
		return repository.save(document);
	}

	@Override
	public void deleteById(long id) {
		repository.deleteById(id);
	}

}

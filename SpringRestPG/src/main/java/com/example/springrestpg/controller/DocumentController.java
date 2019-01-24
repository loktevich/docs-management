/**
 * 
 */
package com.example.springrestpg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrestpg.model.Document;
import com.example.springrestpg.service.DocumentService;

/**
 * @author Dmitry Loktevich
 *
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DocumentController {

	@Autowired
	DocumentService<Document> docService;

	@GetMapping("/documents")
	public List<Document> getAllDocuments() {
		return docService.getAll();
	}

	@GetMapping("/documents/{id}")
	public Document getDocumentById(@PathVariable("id") long id) {
		return docService.getById(id);
	}

	@PostMapping("/documents/create")
	public Document createDocument(@RequestBody Document document) {
		return docService.create(document);
	}

	@PutMapping("/documents/{id}")
	public Document updateDocument(@RequestBody Document document) {
		return docService.update(document);
	}

	@DeleteMapping("/documents/{id}")
	public void deleteDocument(@PathVariable("id") long id) {
		docService.deleteById(id);
	}
}

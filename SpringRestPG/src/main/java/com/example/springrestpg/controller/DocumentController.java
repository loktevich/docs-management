/**
 * 
 */
package com.example.springrestpg.controller;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

	@PostMapping("/documents/add")
	public ResponseEntity<String> addDocument(@RequestPart("document") Document document, @RequestPart("docFile") MultipartFile file) {
		docService.create(document, file);
		return new ResponseEntity<String>("Document has been added", HttpStatus.OK);
	}

	@PutMapping("/documents/{id}")
	public ResponseEntity<String> updateDocument(@PathVariable("id") long id, @RequestPart("document") Document document, @RequestPart("docFile") MultipartFile file) {
		try {
			docService.getById(id);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<String>("Document not found", HttpStatus.NOT_FOUND);
		}
		docService.update(document, file);
		return new ResponseEntity<String>("Document has been updated", HttpStatus.OK);
	}

	@DeleteMapping("/documents/{id}")
	public ResponseEntity<String> deleteDocument(@PathVariable("id") long id) {
		docService.deleteById(id);
		return new ResponseEntity<String>("Document has been deleted", HttpStatus.OK);
	}
}

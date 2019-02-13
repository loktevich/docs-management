/**
 * 
 */
package com.example.springrestpg.controller;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.json.JSONException;
import org.json.JSONObject;
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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import com.example.springrestpg.model.Document;
import com.example.springrestpg.service.DocumentService;

/**
 * @author Dmitry Loktevich
 *
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
@Api(value = "Docs Management System", description = "Operations for Docs Management System")
public class DocumentController {

	@Autowired
	DocumentService<Document> docService;

	@ApiOperation(value = "View a list of documents", response = List.class)
	@GetMapping("/documents")
	public List<Document> getAllDocuments() {
		return docService.getAll();
	}

	@ApiOperation(value = "Search the document with an ID", response = Document.class)
	@GetMapping("/documents/{id}")
	public Document getDocumentById(@PathVariable("id") long id) {
		return docService.getById(id);
	}

	@ApiOperation(value = "Add the document")
	@PostMapping(value = "/documents/add", consumes = { "multipart/form-data" })
	public ResponseEntity<String> addDocument(@RequestPart("document") String document,
			@RequestPart("docFile") MultipartFile file) {
		Document doc = new Document();
		try {
			doc = getDocFromJson(document);
		} catch (JSONException e) {
			return new ResponseEntity<String>("\"Parsing error\"", HttpStatus.BAD_REQUEST);
		}
		docService.create(doc, file);
		return new ResponseEntity<String>("\"Document has been added\"", HttpStatus.OK);
	}

	@ApiOperation(value = "Update the document with an ID")
	@PutMapping("/documents/{id}")
	public ResponseEntity<String> updateDocument(@PathVariable("id") long id, @RequestPart("document") String document,
			@RequestPart(value = "docFile", required = false) MultipartFile file) {
		try {
			docService.getById(id);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<String>("\"Document not found\"", HttpStatus.NOT_FOUND);
		}
		Document doc = new Document();
		try {
			doc = getDocFromJson(document);
		} catch (JSONException e) {
			return new ResponseEntity<String>("\"Parsing error\"", HttpStatus.BAD_REQUEST);
		}
		if (file == null || file.isEmpty()) {
			docService.update(id, doc);
		} else {
			docService.update(id, doc, file);
		}
		return new ResponseEntity<String>("\"Document has been updated\"", HttpStatus.OK);
	}

	@ApiOperation(value = "Delete the document with an ID")
	@DeleteMapping("/documents/{id}")
	public ResponseEntity<String> deleteDocument(@PathVariable("id") long id) {
		docService.deleteById(id);
		return new ResponseEntity<String>("\"Document has been deleted\"", HttpStatus.OK);
	}

	private Document getDocFromJson(String jsonStr) throws JSONException {
		JSONObject jsonObj = new JSONObject(jsonStr);
		String description = jsonObj.getString("description");
		String author = jsonObj.getString("author");
		Boolean readOnly = jsonObj.getBoolean("readOnly");
		Document doc = new Document();
		doc.setDescription(description);
		doc.setAuthor(author);
		doc.setReadOnly(readOnly);
		return doc;
	}
}

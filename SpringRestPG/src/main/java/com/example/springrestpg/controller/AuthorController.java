/**
 * 
 */
package com.example.springrestpg.controller;

import java.util.List;

import com.example.springrestpg.model.Author;
import com.example.springrestpg.service.AuthorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



/**
 * @author Dmitry Loktevich
 * 
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthorController {

    @Autowired
    AuthorService<Author> service;

    @ApiOperation(value = "View a list of authors", response = List.class)
    @GetMapping("/authors")
    public List<Author> getAuthors() {
        return service.getAll();
    }
    
    @ApiOperation(value = "Add the author")
    @PostMapping("/authors/add")
    public ResponseEntity<String> addAuthor(@RequestBody Author author) {
        service.create(author);
        return new ResponseEntity<String>("\"Author has been added\"", HttpStatus.OK);
    }
    
    @ApiOperation(value = "Delete the author with an ID")
	@DeleteMapping("/authors/{id}")
	public ResponseEntity<String> deleteAuthor(@PathVariable("id") long id) {
		service.deleteById(id);
		return new ResponseEntity<String>("\"Author has been deleted\"", HttpStatus.OK);
	}
}
/**
 * 
 */
package com.example.springrestpg.service;

import java.util.List;

import com.example.springrestpg.model.Author;
import com.example.springrestpg.repository.AuthorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Dmitry Loktevich
 *
 */
@Service
public class AuthorServiceImpl implements AuthorService<Author> {

    @Autowired
    private AuthorRepository repository;

    @Override
    public Author create(Author author) {
        return repository.save(author);
    }

    @Override
    public List<Author> getAll() {
        return repository.findAll();
    }

    @Override
    public Author getById(long id) {
        return repository.getOne(id);
    }

    @Override
    public void deleteById(long id) {
        repository.deleteById(id);
    }
}
/**
 * 
 */
package com.example.springrestpg.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springrestpg.model.Document;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Page<Document> findByAuthor_AuthorId(Long authorId, Pageable pageable);
}

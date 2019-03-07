/**
 * 
 */
package com.example.springrestpg.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;

import com.example.springrestpg.model.Document;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Page<Document> findByAuthor_AuthorId(Long authorId, Pageable pageable);

    Page<Document> findByCreationDateBetween(Date creationDateStart, Date creationDateEnd, Pageable pageable);

    Page<Document> findByAuthor_AuthorIdAndCreationDateBetween(Long authorId, Date creationDateStart,
            Date creationDateEnd, Pageable pageable);
}

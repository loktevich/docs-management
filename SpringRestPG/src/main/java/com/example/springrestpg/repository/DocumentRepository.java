/**
 * 
 */
package com.example.springrestpg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springrestpg.model.Document;

/**
 * @author Dmitry Loktevich
 *
 */
public interface DocumentRepository extends JpaRepository<Document, Long> {

}

/**
 * 
 */
package com.example.springrestpg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springrestpg.model.Author;;

/**
 * @author Dmitry Loktevich
 *
 */
public interface AuthorRepository extends JpaRepository<Author, Long> {

}

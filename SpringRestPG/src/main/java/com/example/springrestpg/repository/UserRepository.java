/**
 * 
 */
package com.example.springrestpg.repository;

import com.example.springrestpg.model.User;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Dmitry Loktevich
 *
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserName(String username);
}
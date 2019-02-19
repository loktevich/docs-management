package com.example.springrestpg.service;

import com.example.springrestpg.model.User;
import com.example.springrestpg.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * UserService
 */
@Service
public class DetailsService implements UserDetailsService {

    @Autowired
    UserRepository users;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = users.findByUserName(userName);
        if (user == null) {
            throw new UsernameNotFoundException(userName + " was not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
                AuthorityUtils.createAuthorityList(user.getRoles()));
    }

    
}
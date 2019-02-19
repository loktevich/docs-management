package com.example.springrestpg.config;

import java.util.Arrays;
import java.util.List;

import com.example.springrestpg.model.User;
import com.example.springrestpg.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * DatabaseLoader
 */
@Component
public class UserLoader implements ApplicationRunner {

    private UserRepository userRepo;

    @Autowired
    public UserLoader(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<User> users = Arrays.asList(
            new User("Agent", "Smith", "agent", "smith", new String[] { "ROLE_USER" }),
            new User("Thomas", "Anderson", "neo", "matrix", new String[] { "ROLE_USER", "ROLE_ADMIN" }));
        userRepo.saveAll(users);
    }

}
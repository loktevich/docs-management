/**
 * 
 */
package com.example.springrestpg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * User
 */
@Entity
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;
    
    @Column(name = "username")
    private String userName;
    
    @JsonIgnore
    private String password;
    
    @JsonIgnore
    private String[] roles;

    public User() {
    }

    public User(String firstName, String lastName, String userName, String password, String[] roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        setPassword(password);
        this.roles = roles;
    }

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    /**
     * @return the roles
     */
    public String[] getRoles() {
        return roles;
    }

    /**
     * @param roles the roles to set
     */
    public void setRoles(String[] roles) {
        this.roles = roles;
    }

}
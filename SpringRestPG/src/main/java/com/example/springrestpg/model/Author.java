/**
 * 
 */
package com.example.springrestpg.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import io.swagger.annotations.ApiModelProperty;

/**
 * @author Dmitry Loktevich
 *
 */
@Entity
@Table(name = "author")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @ApiModelProperty(value = "The generated author ID")
    private long authorId;

    @Column(name = "fullname")
    @ApiModelProperty(value = "Author's fullname")
    private String fullName;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Document> documents;

    public Author() {
    }

    public Author(String fullName) {
        this.fullName = fullName;
    }

    public long getAuthorId() {
        return authorId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Author [authorId=").append(authorId).append(", fullname=").append(fullName);
        return builder.toString();
    }

}
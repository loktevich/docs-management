/**
 * 
 */
package com.example.springrestpg.model;

import java.io.File;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Dmitry Loktevich
 *
 */
@Entity
@Table(name = "document")
public class Document {

	public Document(String description, Date creationDate, String author, File documentFile, Boolean readOnly) {
		this.description = description;
		this.creationDate = creationDate;
		this.author = author;
		this.documentFile = documentFile;
		this.readOnly = readOnly;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long documentId;

	@Column(name = "description")
	private String description;

	@Column(name = "date")
	private Date creationDate;

	@Column(name = "author")
	private String author;

	@Column(name = "file")
	private File documentFile;

	@Column(name = "readonly")
	private Boolean readOnly;

	public long getDocumentId() {
		return documentId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public File getDocumentFile() {
		return documentFile;
	}

	public void setDocumentFile(File documentFile) {
		this.documentFile = documentFile;
	}

	public Boolean isReadOnly() {
		return readOnly;
	}

	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Document [documentId=").append(documentId).append(", description=").append(description)
				.append(", creationDate=").append(creationDate).append(", author=").append(author)
				.append(", documentFile=").append(documentFile).append(", readOnly=").append(readOnly).append("]");
		return builder.toString();
	}
	
}

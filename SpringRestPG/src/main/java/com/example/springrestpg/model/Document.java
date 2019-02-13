/**
 * 
 */
package com.example.springrestpg.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

import io.swagger.annotations.ApiModelProperty;

/**
 * @author Dmitry Loktevich
 *
 */
@Entity
@Table(name = "document")
@Proxy(lazy = false)
public class Document {

	public Document() {
	}

	public Document(String documentName, String description, Date creationDate, String author, byte[] documentData,
			String documentType, Boolean readOnly) {
		this.documentName = documentName;
		this.description = description;
		this.creationDate = creationDate;
		this.author = author;
		this.documentData = documentData;
		this.documentType = documentType;
		this.readOnly = readOnly;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@ApiModelProperty(value = "The generated document ID")
	private long documentId;

	@Column(name = "name")
	@ApiModelProperty(value = "The name of the document")
	private String documentName;

	@Column(name = "description")
	@ApiModelProperty(value = "The description of the document")
	private String description;

	@Column(name = "date")
	@ApiModelProperty(value = "The date when document had been created/modified")
	private Date creationDate;

	@Column(name = "author")
	@ApiModelProperty(value = "The author of the document")
	private String author;

	@Column(name = "data")
	@ApiModelProperty(value = "The binary document data")
	private byte[] documentData;

	@Column(name = "type")
	@ApiModelProperty(value = "The type of the document")
	private String documentType;

	@Column(name = "readonly")
	@ApiModelProperty(value = "The flag to indicate if document is readonly")
	private Boolean readOnly;

	public long getDocumentId() {
		return documentId;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
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

	public byte[] getDocumentData() {
		return documentData;
	}

	public void setDocumentData(byte[] documentData) {
		this.documentData = documentData;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
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
		builder.append("Document [documentId=").append(documentId).append(", name=").append(documentName)
				.append(", type=").append(documentType).append(", description=").append(description)
				.append(", creationDate=").append(creationDate).append(", author=").append(author).append(", readOnly=")
				.append(readOnly).append("]");
		return builder.toString();
	}

}

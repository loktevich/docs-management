import { DocumentAuthor } from './author';

export class Document {
    documentId: number;
    documentName: string;
    description: string;
    creationDate: Date;
    author: DocumentAuthor;
    documentType: string;
    readOnly: boolean;
}

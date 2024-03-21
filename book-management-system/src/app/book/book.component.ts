import { Component } from '@angular/core';
import { BookModel } from '../models/book.model';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: BookModel[] = [];
  newTitle: string = "";
  newAuthor: string = "";

  ngOnInit() {
    let data = localStorage.getItem("books");
    this.books = data ? JSON.parse(data) : [];
  }

  addBook() {
    let book = {
      id: Date.now(),
      title: this.newTitle,
      author: this.newAuthor
    };
    this.books.push(book);
    localStorage.setItem("books", JSON.stringify(this.books));
    this.newTitle = "";
    this.newAuthor = "";
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(this.books));
  }
}

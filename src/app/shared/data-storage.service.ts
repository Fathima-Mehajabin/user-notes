import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from '../notes/notes.model';
import { NotesService } from '../notes/notes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  error = null;

  constructor(private http: HttpClient, private noteService: NotesService) {}

  storeNotes() {
    const notes = this.noteService.getNotes();
    this.http
      .put(
        'https://user-notes-c006b-default-rtdb.firebaseio.com/notes.json',
        notes
      )
      .subscribe(
        (response) => {
          //console.log(response);
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
        }
      );
  }

  fetchNotes() {
    this.http
      .get<Notes[]>(
        'https://user-notes-c006b-default-rtdb.firebaseio.com/notes.json'
      )
      .subscribe(
        (response) => {
          //console.log(response);
          this.noteService.setNotes(response);
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
        }
      );
  }

  deleteNotes(key: number) {
    this.http
      .delete(
        'https://user-notes-c006b-default-rtdb.firebaseio.com/notes/' +
          key +
          '.json'
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
        }
      );
  }
}

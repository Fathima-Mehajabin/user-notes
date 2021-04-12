import { Subject } from 'rxjs';
import { Notes } from './notes.model';

export class NotesService {
  noteSelected = new Subject<Notes>();
  noteChanged = new Subject<Notes[]>();

  constructor() {}
  private notes: Notes[] = [];

  setNotes(notes: Notes[]) {
    this.notes = notes.filter(this.notEmpty);
    this.noteChanged.next(this.notes.slice());
  }

  notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
    }
  getNotes() {
    return this.notes.slice();
  }

  getNote(index: number) {
    return this.notes[index];
  }

  updateNote(index: number, newNote: Notes) {
    this.notes[index] = newNote;
    this.noteChanged.next(this.notes.slice());
  }

  addNote(newNote: Notes) {
    this.notes.push(newNote);
    this.noteChanged.next(this.notes.slice());
  }

  deleteNote(id: number) {
    console.log(id);
    this.notes.splice(id, 1);
    this.noteChanged.next(this.notes.slice());
    console.log(this.notes);
  }
}

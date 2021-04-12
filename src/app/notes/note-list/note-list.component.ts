import { Component, OnInit } from '@angular/core';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: Notes[];

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.noteService.noteChanged.subscribe((notes: Notes[]) => {
      this.notes = notes;
    });
    this.notes = this.noteService.getNotes();
  }
}

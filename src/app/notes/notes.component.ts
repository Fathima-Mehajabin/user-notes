import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Notes } from './notes.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  selectedNotes: Notes;

  constructor(
    private noteService: NotesService,
    private dataStorageService: DataStorageService
  ) {
    this.dataStorageService.fetchNotes();
  }

  ngOnInit(): void {
    this.noteService.noteSelected.subscribe((data) => {
      this.selectedNotes = data;
    });
  }
}

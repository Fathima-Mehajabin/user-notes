import { Component, OnInit, Input } from '@angular/core';
import { Notes } from '../../notes.model';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent implements OnInit {
  @Input() note: Notes;
  @Input() index: number;

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {}
}

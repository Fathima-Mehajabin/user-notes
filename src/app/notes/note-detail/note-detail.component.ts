import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
})
export class NoteDetailComponent implements OnInit {
  note: Notes;
  id: number;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private datastorageService: DataStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.note = this.noteService.getNote(this.id);
      console.log(this.id);
    });
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this note?')) {
      this.datastorageService.deleteNotes(this.id);
      this.noteService.deleteNote(this.id);
      this.toastr.warning('Note deleted');
      this.router.navigate(['notes']);
      this.datastorageService.storeNotes();
    }
  }
}

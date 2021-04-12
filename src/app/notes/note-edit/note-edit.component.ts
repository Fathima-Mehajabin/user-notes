import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';
import { ToastrService } from 'ngx-toastr';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css'],
})
export class NoteEditComponent implements OnInit {
  id: number;
  editMode = false;
  noteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService,
    private router: Router,
    private datastorageService: DataStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const note = new Notes(
      this.noteForm.value['title'],
      this.noteForm.value['content'],
      this.noteForm.value['priority'],
      this.noteForm.value['date']
    );
    if (this.editMode) {
      this.noteService.updateNote(this.id, note);
      console.log(this.noteForm.value);
      this.datastorageService.storeNotes();
      this.toastr.info('Note edited successfully!');
    } else {
      this.noteService.addNote(note);
      console.log(this.noteForm.value);
      this.datastorageService.storeNotes();
      this.toastr.success('Note added successfully');
    }
    this.onCancelClick();
  }

  onCancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let title = '';
    let content = '';
    let priority = '';
    let date = null;

    if (this.editMode) {
      const note = this.noteService.getNote(this.id);
      console.log(note);
      title = note.title;
      content = note.content;
      priority = note.priority;
      date = note.date;
    }
    this.noteForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      content: new FormControl(content, Validators.required),
      priority: new FormControl(priority, Validators.required),
      date: new FormControl(date, Validators.required),
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NotesStartComponent } from './notes/notes-start/notes-start.component';
import { NotesComponent } from './notes/notes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  {
    path: 'notes',
    component: NotesComponent,
    children: [
      { path: '', component: NotesStartComponent },
      { path: 'new', component: NoteEditComponent },
      { path: ':id', component: NoteDetailComponent },
      { path: ':id/edit', component: NoteEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

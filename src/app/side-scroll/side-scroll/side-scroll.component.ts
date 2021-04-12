import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-side-scroll',
  templateUrl: './side-scroll.component.html',
  styleUrls: ['./side-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideScrollComponent implements OnInit {
  items = ['All Notes', '+'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {}

  onClick(item: string) {
    if (item === '+') {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
    if (item === 'All Notes') {
      this.dataStorageService.fetchNotes();
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}

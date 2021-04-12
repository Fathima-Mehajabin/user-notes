export class Notes {
  public title: string;
  public content: string;
  public priority: string;
  public date: Date;

  constructor(title: string, content: string, priority: string, date: Date) {
    this.title = title;
    this.content = content;
    this.priority = priority;
    this.date = date;
  }
}

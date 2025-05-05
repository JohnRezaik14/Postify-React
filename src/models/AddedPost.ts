export class AddedPost {
  private _title: string;
  private _body: string;
  private _image: string;
  private _createdOn: number;
  constructor(props: AddedPost) {
    this._title = props.title;
    this._body = props.body;
    this._image = props.image;
    this._createdOn = props.createdOn ?? new Date().getTime();
  }
  public get title() {
    return this._title;
  }
  public get body() {
    return this._body;
  }
  public get image() {
    return this._image;
  }
  public get createdOn() {
    return this._createdOn;
  }
}

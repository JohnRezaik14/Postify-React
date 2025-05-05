import { AddedPost } from "./AddedPost";

export class EditedPost extends AddedPost {
  id: number;
  userId: number;
  username: string;

  constructor(
    addedPost: AddedPost,
    username: string,
    userId: number,
    postId: number
  ) {
    super(addedPost);
    this.userId = userId;
    this.username = username;
    this.id = postId;
  }
  public get _username() {
    return this.username;
  }
  public get _userId() {
    return this.userId;
  }
}

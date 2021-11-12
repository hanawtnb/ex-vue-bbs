import { Comment } from "./comment";
/**
 * 記事を表す部品用のクラス.
 */
export class Article {
  constructor(
    // id
    private _id: number,
    // 名前
    private _name: string,
    // 内容
    private _content: string,
    // コメント一覧
    private _commentList: Array<Comment>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get comment(): string {
    return this._content;
  }

  public set comment(comment: string) {
    this._content = comment;
  }

  public get commentList(): Array<Comment> {
    return this._commentList;
  }

  public set commentList(commentList: Array<Comment>) {
    this._commentList = commentList;
  }
}

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  IdentifiedReference
} from '@mikro-orm/core';
import { PostEntity } from '../posts/mikroEntity';
  
@Entity()
export class CommentEntity {
  @PrimaryKey({ type: 'int', autoincrement: true })
    id!: number;

  @Property({ type: 'text' })
    message!: string;

  @ManyToOne(() => PostEntity)
    post?: IdentifiedReference<PostEntity>;

  constructor(message: string) {
    this.message = message;
  }
}
  
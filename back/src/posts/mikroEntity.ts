import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Collection,
  OneToMany,
} from '@mikro-orm/core';

@Entity()
export class PostEntity {
  @PrimaryKey({ type: 'int', autoincrement: true })
    id!: number;

  @Property({ type: 'text' })
    message: string;

  @OneToMany(() => ImageEntity, b => b.post)
    images = new Collection<ImageEntity>(this);

  constructor(message: string) {
    this.message = message;
  }
}

@Entity()
export class ImageEntity {
  @PrimaryKey({ type: 'int', autoincrement: true })
    id!: number;

  @Property({ type: 'text' })
    src: string;

  @ManyToOne({ type: 'PostEntity' })
    post: PostEntity;

  constructor(src: string, post: PostEntity) {
    this.src = src;
    this.post = post;
  }
}

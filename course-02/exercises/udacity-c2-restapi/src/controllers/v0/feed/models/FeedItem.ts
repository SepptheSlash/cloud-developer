import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey} from 'sequelize-typescript';
import { User } from '../../users/models/User';

@Table //corresponding to table
export class FeedItem extends Model<FeedItem> {
  @Column //corresponding to column
  public caption!: string;

  @Column
  public url!: string;

  @Column
  @CreatedAt //option in Posgres to automatically set the date at creation
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}

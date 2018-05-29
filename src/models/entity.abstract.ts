import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export class EntityAbstract {
  private _id: number;
  private _updatedAt: Date;
  private _createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ name: 'id' })
  public get id(): number { return this._id; }
  public set id(value: number) { this._id = value; }

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updatedAt' })
  public get updatedAt(): Date { return this._updatedAt; }
  public set updatedAt(value: Date) { this._updatedAt = value; }

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'createdAt' })
  public get createdAt(): Date { return this._createdAt; }
  public set createdAt(value: Date) { this._createdAt = value; }
}

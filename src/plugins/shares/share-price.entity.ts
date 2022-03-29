import { DeepPartial, VendureEntity } from '@vendure/core';
import { Entity, Column } from 'typeorm';

@Entity()
export class SharePrice extends VendureEntity {
  constructor(input?: DeepPartial<SharePrice>) {
    super(input);
  }

  @Column()
  ticker: string;

  @Column('date')
  date: Date;

  @Column('float')
  price: number;
}

import { DeepPartial, VendureEntity } from '@vendure/core';
import { Entity, Column } from 'typeorm';

@Entity()
export class Shares extends VendureEntity {
  constructor(input?: DeepPartial<Shares>) {
    super(input);
  }

  @Column({ unique: true })
  ticker: string;

  @Column({ unique: true })
  isin: string;

  @Column({ unique: true })
  name: string;

  @Column()
  country: string;

  @Column()
  exchange: string;
}

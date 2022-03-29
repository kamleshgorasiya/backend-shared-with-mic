import { getManager } from 'typeorm';
import { ID, InternalServerError, TransactionalConnection } from '@vendure/core';
import { Injectable } from '@nestjs/common';
import { Share, ShareList, ShareTimeSeries } from '../@codegen/generated-shop-types';
import { SharePrice } from './share-price.entity';
import { Shares } from './shares.entity';

@Injectable()
export class SharesService {
  constructor(private connection: TransactionalConnection) {}

  async insertShare(share: Share | [Share]): Promise<void> {
    const repository = this.connection.getRepository(Shares);
    await repository.insert(share);
  }

  async insertSharePrice(sharePrice: SharePrice | [SharePrice]): Promise<void> {
    const repository = this.connection.getRepository(SharePrice);
    await repository.insert(sharePrice);
  }

  async getAllShares(): Promise<ShareList> {
    try {
      const repository = this.connection.getRepository(Shares);
      const query = await repository.findAndCount();
      const result = { items: query[0], totalShares: query[1] };
      return result;
    } catch (error) {
      throw new InternalServerError('An error occured when calling getAllShares()...');
    }
  }

  async getShareTimeSeries(id: ID, numberOfDays: number): Promise<ShareTimeSeries> {
    try {
      const entityManager = getManager();
      const query = await entityManager.query(
        `
      SELECT sp.*
      FROM   share_price sp
             LEFT JOIN shares s
                    ON sp.ticker = s.ticker
      WHERE  s.id = $1 limit $2
      `,
        [id, numberOfDays]
      );
      return { timeseries: query };
    } catch (error) {
      throw new InternalServerError('An error occured when calling getShareTimeSeries()...');
    }
  }
}

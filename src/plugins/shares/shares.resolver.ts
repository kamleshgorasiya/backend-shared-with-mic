import { Args, Query, Resolver } from '@nestjs/graphql';
import { Transaction, Permission, ID, Allow } from '@vendure/core';
import { Get } from '@nestjs/common';
import { SharesService } from './shares.service';
import { ShareTimeSeries, ShareList } from '../@codegen/generated-shop-types';

@Resolver()
export class SharesResolver {
  constructor(private sharesService: SharesService) {}

  @Query()
  @Get()
  @Allow(Permission.Owner)
  async shares(): Promise<ShareList> {
    return await this.sharesService.getAllShares();
  }

  @Query()
  @Get()
  async shareTimeSeries(@Args() args: { id: ID }): Promise<ShareTimeSeries> {
    return await this.sharesService.getShareTimeSeries(args.id, 270);
  }
}

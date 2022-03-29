import { StockMovementType } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { OrderLine } from '../order-line/order-line.entity';
import { StockMovement } from './stock-movement.entity';
export declare class Allocation extends StockMovement {
    readonly type = StockMovementType.ALLOCATION;
    constructor(input: DeepPartial<Allocation>);
    orderLine: OrderLine;
}

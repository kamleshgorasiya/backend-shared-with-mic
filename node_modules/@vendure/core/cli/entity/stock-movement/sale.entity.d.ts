import { StockMovementType } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { OrderLine } from '../order-line/order-line.entity';
import { StockMovement } from './stock-movement.entity';
export declare class Sale extends StockMovement {
    readonly type = StockMovementType.SALE;
    constructor(input: DeepPartial<Sale>);
    orderLine: OrderLine;
}

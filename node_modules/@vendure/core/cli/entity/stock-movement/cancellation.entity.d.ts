import { StockMovementType } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { OrderItem } from '../order-item/order-item.entity';
import { StockMovement } from './stock-movement.entity';
export declare class Cancellation extends StockMovement {
    readonly type = StockMovementType.CANCELLATION;
    constructor(input: DeepPartial<Cancellation>);
    orderItem: OrderItem;
}

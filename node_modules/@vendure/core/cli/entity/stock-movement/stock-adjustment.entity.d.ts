import { StockMovementType } from '@vendure/common/lib/generated-types';
import { DeepPartial } from '@vendure/common/lib/shared-types';
import { StockMovement } from './stock-movement.entity';
export declare class StockAdjustment extends StockMovement {
    readonly type = StockMovementType.ADJUSTMENT;
    constructor(input: DeepPartial<StockAdjustment>);
}

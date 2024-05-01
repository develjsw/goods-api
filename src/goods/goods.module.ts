import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './repositories/goods.repository';
import { GoodsService } from './servicies/goods.service';

@Module({
    exports: [],
    imports: [],
    providers: [GoodsService, GoodsRepository],
    controllers: [GoodsController]
})
export class GoodsModule {}

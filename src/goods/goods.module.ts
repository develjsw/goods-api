import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './repositories/goods.repository';
import { GoodsService } from './servicies/goods.service';
import { ApiService } from '../api/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    exports: [],
    imports: [HttpModule],
    providers: [GoodsService, ApiService, GoodsRepository],
    controllers: [GoodsController]
})
export class GoodsModule {}

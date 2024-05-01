import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GoodsEntity } from '../entities/goods.entity';

@Injectable()
export class GoodsRepository {
    private goodsRepository: Repository<GoodsEntity>;

    constructor(protected readonly dataSource: DataSource) {
        this.goodsRepository = this.dataSource.getRepository(GoodsEntity);
    }
}

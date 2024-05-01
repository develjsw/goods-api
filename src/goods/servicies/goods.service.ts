import { Injectable } from '@nestjs/common';
import { GoodsCreateDto } from '../dto/goods-create.dto';
import { GoodsRepository } from '../repositories/goods.repository';

@Injectable()
export class GoodsService {
    constructor(private readonly goodsRepository: GoodsRepository) {}

    async goodsCreate(goodsCreateDto: GoodsCreateDto): Promise<any> {
        return goodsCreateDto;
    }
}

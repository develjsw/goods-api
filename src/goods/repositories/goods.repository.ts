import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { GoodsEntity } from '../entities/goods.entity';
import { GoodsCreateDto } from '../dto/goods-create.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GoodsRepository {
    private goodsRepository: Repository<GoodsEntity>;

    constructor(protected readonly dataSource: DataSource) {
        this.goodsRepository = this.dataSource.getRepository(GoodsEntity);
    }

    async goodsCreate(goodsCreateDto: GoodsCreateDto): Promise<InsertResult> {
        const convertToGoodsEntity: GoodsEntity = plainToInstance(GoodsEntity, goodsCreateDto);
        convertToGoodsEntity.regDate = new Date();

        return await this.goodsRepository.insert(convertToGoodsEntity);
    }

    async goodsDelete(goodsId: number): Promise<UpdateResult> {
        const deleteDate: Date = new Date();

        return await this.goodsRepository.update(goodsId, {
            deleteDate: deleteDate
        });
    }

    async goodsDetail(goodsId: number): Promise<GoodsEntity | null> {
        return await this.goodsRepository.findOne({
            //where: { goodsId: goodsId, deleteDate: Not(IsNull()) }
            where: { goodsId: goodsId, deleteDate: IsNull() }
        });
    }
}

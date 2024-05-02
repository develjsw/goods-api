import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { GoodsCreateDto } from '../dto/goods-create.dto';
import { GoodsRepository } from '../repositories/goods.repository';
import { InsertResult, UpdateResult } from 'typeorm';
import { GoodsEntity } from '../entities/goods.entity';

@Injectable()
export class GoodsService {
    constructor(private readonly goodsRepository: GoodsRepository) {}

    async goodsCreate(goodsCreateDto: GoodsCreateDto): Promise<{ goodsIds: Array<number> }> {
        try {
            const insertResult: InsertResult = await this.goodsRepository.goodsCreate(goodsCreateDto);

            const { identifiers } = insertResult;

            return { goodsIds: identifiers.map((item) => item.goodsId) };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async goodsDelete(goodsId: number): Promise<any> {
        const selectResult: GoodsEntity = await this.goodsRepository.goodsDetail(goodsId);

        if (!selectResult) throw new BadRequestException('goodsId에 해당하는 정보가 삭제되었거나 존재하지 않습니다.');

        try {
            const updateResult: UpdateResult = await this.goodsRepository.goodsDelete(goodsId);

            const { affected } = updateResult;

            return {
                updateCount: affected
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async goodsDetail(goodsId: number): Promise<GoodsEntity | object> {
        const selectResult: GoodsEntity | null = await this.goodsRepository.goodsDetail(goodsId);

        if (!selectResult) return {};

        return selectResult;
    }
}

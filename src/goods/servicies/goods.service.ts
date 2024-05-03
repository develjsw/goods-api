import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoodsCreateDto } from '../dto/goods-create.dto';
import { GoodsDto } from '../dto/goods.dto';
import { GoodsRepository } from '../repositories/goods.repository';
import { UpdateResult } from 'typeorm';
import { GoodsEntity } from '../entities/goods.entity';

@Injectable()
export class GoodsService {
    constructor(private readonly goodsRepository: GoodsRepository) {}

    async goodsCreate(goodsCreateDto: GoodsCreateDto): Promise<{ goodsIds: number[] }> {
        try {
            // TODO : 생성 실패 데이터 별도로 추출하여 반환 해줘야 할지 판단 필요
            /* 상품등록은 순서 상관없으므로 병렬 처리 */
            const insertResults = await Promise.allSettled(
                goodsCreateDto.goodsDto.map((item: GoodsDto) => {
                    return this.goodsRepository.goodsCreate(item);
                })
            );

            const goodsIds: number[] = insertResults
                .filter((item) => item.status === 'fulfilled')
                .map((item) => {
                    return item['value'].identifiers
                        .map((subItem: { goodsId: number }) => subItem.goodsId)
                        .find((innerItem: number) => innerItem);
                });

            return { goodsIds: goodsIds };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async goodsDelete(goodsId: number): Promise<{ updateCount: number }> {
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

    async goodsModify(goodsId: number, goodsDto: GoodsDto): Promise<{ updateCount: number }> {
        const selectResult: GoodsEntity = await this.goodsRepository.goodsDetail(goodsId);

        if (!selectResult) throw new BadRequestException('goodsId에 해당하는 정보가 존재하지 않습니다.');

        try {
            const updateResult: UpdateResult = await this.goodsRepository.goodsModify(goodsId, goodsDto);

            const { affected } = updateResult;

            return {
                updateCount: affected
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message());
        }
    }

    async goodsList(page: number, perPage: number): Promise<{ totalCount: number; data: GoodsEntity[] }> {
        const skip = (page - 1) * perPage;
        const selectResult = await this.goodsRepository.goodsList(perPage, skip);

        const result = {
            totalCount: 0,
            data: []
        };

        selectResult.forEach((item: GoodsEntity[] | number, idx: number) => {
            switch (idx) {
                case 0:
                    result.data = item as [];
                    break;
                case 1:
                    result.totalCount = item as number;
                    break;
            }
        });

        return result;
    }

    async goodsDetail(goodsId: number): Promise<GoodsEntity | object> {
        const selectResult: GoodsEntity | null = await this.goodsRepository.goodsDetail(goodsId);

        if (!selectResult) return {};

        return selectResult;
    }
}

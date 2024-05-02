import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { GoodsCreateDto } from './dto/goods-create.dto';
import { GoodsService } from './servicies/goods.service';

@Controller('api/v1/goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    /**
     * 상품 등록
     * @param goodsCreateDto
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() goodsCreateDto: GoodsCreateDto) {
        return await this.goodsService.goodsCreate(goodsCreateDto);
    }

    /**
     * 상품 삭제
     * @param goodsId
     */
    @Delete(':goodsId')
    async delete(@Param('goodsId', ParseIntPipe) goodsId: number) {
        return await this.goodsService.goodsDelete(goodsId);
    }

    @Patch(':goodsId')
    async modify() {
        return '상품수정';
    }

    @Post()
    async list() {
        return '상품리스트';
    }

    /**
     * 상품 상세
     * @param goodsId
     */
    @Get(':goodsId')
    async detail(@Param('goodsId', ParseIntPipe) goodsId: number) {
        return await this.goodsService.goodsDetail(goodsId);
    }
}

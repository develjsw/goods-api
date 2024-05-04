import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { GoodsCreateDto } from './dto/goods-create.dto';
import { GoodsDto } from './dto/goods.dto';
import { GoodsService } from './servicies/goods.service';

@Controller('api/v1/goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    /**
     * 상품 등록 (단건/다건)
     * @param goodsCreateDto
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() goodsCreateDto: GoodsCreateDto) {
        return await this.goodsService.goodsCreate(goodsCreateDto);
    }

    /**
     * 상품 삭제 (단건)
     * @param goodsId
     */
    @Delete(':goodsId')
    async delete(@Param('goodsId', ParseIntPipe) goodsId: number) {
        return await this.goodsService.goodsDelete(goodsId);
    }

    /**
     * 상품 수정 (단건)
     * @param goodsId
     * @param goodsDto
     */
    @Patch(':goodsId')
    @UsePipes(ValidationPipe)
    async modify(@Param('goodsId', ParseIntPipe) goodsId: number, @Body() goodsDto: GoodsDto) {
        return await this.goodsService.goodsModify(goodsId, goodsDto);
    }

    /**
     * 상품 리스트
     * @param page
     * @param perPage
     */
    @Get()
    async list(@Query('page', ParseIntPipe) page: number, @Query('perPage', ParseIntPipe) perPage: number) {
        return await this.goodsService.goodsList(page, perPage);
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

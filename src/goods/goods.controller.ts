import {
    Body,
    Controller,
    Delete,
    Get,
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
    @Post(':goodsId')
    @UsePipes(ValidationPipe)
    async create(@Body() goodsCreateDto: GoodsCreateDto) {
        return await this.goodsService.goodsCreate(goodsCreateDto);
    }

    @Delete(':goodsId')
    async delete() {
        return '상품삭제';
    }

    @Patch(':goodsId')
    async modify() {
        return '상품수정';
    }

    @Post('')
    async list() {
        return '상품리스트';
    }

    @Get('')
    async detail() {
        return '상품상세';
    }
}

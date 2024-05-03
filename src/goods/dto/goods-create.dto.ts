import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GoodsDto } from './goods.dto';

export class GoodsCreateDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GoodsDto)
    goodsDto: GoodsDto[]; // = goodsDto: Array<GoodsDto>;
}

import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GoodsListDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    perPage: number;
}

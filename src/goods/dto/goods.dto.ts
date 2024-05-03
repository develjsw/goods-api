import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GoodsDto {
    @IsNotEmpty()
    @IsString()
    goodsName: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsOptional()
    @IsIn(['Y', 'N'])
    isUse: string;
}

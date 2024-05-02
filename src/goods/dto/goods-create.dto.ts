import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GoodsCreateDto {
    // TODO : 배열로 받아서 처리할 수 있도록 변경 예정
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

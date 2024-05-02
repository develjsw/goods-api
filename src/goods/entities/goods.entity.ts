import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_goods')
export class GoodsEntity {
    @PrimaryGeneratedColumn({
        name: 'goods_id',
        comment: '상품 코드(PK)'
    })
    goodsId: number;

    @Column('varchar', {
        name: 'goods_name',
        comment: '상품명',
        length: 200
    })
    goodsName: string;

    @Column('int', {
        name: 'price',
        comment: '상품 가격'
    })
    price: number;

    @Column('char', {
        name: 'is_use',
        comment: '사용 여부(Y/N)',
        default: 'N'
    })
    isUse: string;

    @Column('datetime', {
        name: 'reg_date',
        comment: '상품 등록일',
        nullable: true
    })
    regDate: Date;

    @Column('datetime', {
        name: 'update_date',
        comment: '상품 수정일',
        nullable: true
    })
    updateDate: Date;

    @Column('datetime', {
        name: 'delete_date',
        comment: '상품 삭제일',
        nullable: true
    })
    deleteDate: Date;
}

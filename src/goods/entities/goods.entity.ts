import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_goods')
export class GoodsEntity {
    @PrimaryGeneratedColumn({
        name: 'goods_id'
    })
    goodsId: number;

    @Column('varchar', {
        name: 'goods_name'
    })
    goodsName: string;

    @Column('int', {
        name: 'price'
    })
    price: number;

    @Column('char', {
        name: 'is_use'
    })
    isUse: string;

    @Column('int', {
        name: 'stock'
    })
    stock: number;

    @Column('datetime', {
        name: 'reg_date'
    })
    regDate: Date;

    @Column('datetime', {
        name: 'update_date'
    })
    updateDate: Date;
}

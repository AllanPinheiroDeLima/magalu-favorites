import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Favorite } from "./favorites.entity";
import * as bcrypt from 'bcrypt-node';

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column({ select: false })
    password: string

    @OneToMany(() => Favorite, favorite => favorite.customer)
    favorites: Favorite[]

    @BeforeInsert()
    async beforeInsert () {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12));
    }
}

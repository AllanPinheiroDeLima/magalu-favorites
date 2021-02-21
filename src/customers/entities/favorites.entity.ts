import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity("favorites")
export class Favorite {
    @PrimaryColumn()
    product_id: string

    @ManyToOne(() => Customer, customer => customer.favorites)
    @JoinColumn({ name: "customer_id" })
    customer?: Customer
}

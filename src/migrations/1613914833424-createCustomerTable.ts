import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCustomerTable1613914833424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const customerTable = new Table({
            name: "customers",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                }
            ]
        })

        await queryRunner.createTable(customerTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers")
    }

}

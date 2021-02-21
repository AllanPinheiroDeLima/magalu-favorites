import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addNameColumn1613923530920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const nameColumn = new TableColumn({
            name: "name",
            type: "varchar",
            isNullable: false
        })

        await queryRunner.addColumn("customers", nameColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("customers", "name");
    }

}

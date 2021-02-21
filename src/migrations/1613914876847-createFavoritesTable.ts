import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class createFavoritesTable1613914876847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const favoritesTable = new Table({
            name: "favorites",
            columns: [
                {
                    name: "product_id",
                    type: "varchar"
                },
                {
                    name: "customer_id",
                    type: "int"
                }
            ]
        });

        await queryRunner.createTable(favoritesTable);

        const customerFK = new TableForeignKey({
            name: "customer_favorites_fk",
            columnNames: ["customer_id"],
            referencedTableName: "customers",
            referencedColumnNames: ["id"]
        })

        await queryRunner.createForeignKey("favorites", customerFK);

        const customerFavoritesIndex = new TableIndex({
            name: "customer_favorites_idx",
            isUnique: true,
            columnNames: ["product_id", "customer_id"]
        })

        await queryRunner.createIndex("favorites", customerFavoritesIndex);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("favorites", "customer_favorites_idx");
        await queryRunner.dropForeignKey("favorites", "customer_favorites_fk");
        await queryRunner.dropDatabase("favorites");
    }

}

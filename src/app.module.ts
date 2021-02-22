import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: false,
      migrationsRun: true,
      entities: ["dist/**/entities/*.entity.js"],
      migrations: ["dist/migrations/*.js"],
      logging: "all"
    }),
    CustomersModule,
    ProductsModule,
    AuthModule,
    FavoritesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}

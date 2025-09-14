import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./module/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { UserProfileModule } from "./module/userProfile.module";


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        schema: configService.get<string>("DB_SCHEMA"),
        entities: [join(__dirname, "**", "*.entity{.ts,.js}")],
        synchronize: true,
        logging: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UserProfileModule
  ],
})
export class AppModule { }

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

const port = process.env.PORT || 5050;

let corsOptions;
if (process.env.NODE_ENV === "production") {
  corsOptions = {
    origin: [
      "http://localhost:3000"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
} else {
  corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors설정
  app.enableCors(corsOptions);

  //글로벌 엔드포인트 설정
  app.setGlobalPrefix("api");

  //글로벌 검증실행 메서드
  app.useGlobalPipes(new ValidationPipe());

  // server run
  await app.listen(port, "0.0.0.0").then(() => {
    // eslint-disable-next-line no-console
    console.log(`server is running at http://localhost:${port}`);
  });
}

bootstrap();

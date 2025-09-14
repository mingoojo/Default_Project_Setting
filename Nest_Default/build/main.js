"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const port = process.env.PORT || 5050;
let corsOptions;
if (process.env.NODE_ENV === "production") {
    corsOptions = {
        origin: [],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
}
else {
    corsOptions = {
        origin: ["http://localhost:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // cors설정
    app.enableCors(corsOptions);
    //글로벌 엔드포인트 설정
    app.setGlobalPrefix("api");
    //글로벌 검증실행 메서드
    app.useGlobalPipes(new common_1.ValidationPipe());
    // server run
    await app.listen(port, "0.0.0.0").then(() => {
        // eslint-disable-next-line no-console
        console.log(`server is running at http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
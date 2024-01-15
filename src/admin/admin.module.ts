import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminProductsController } from "./admin.products.controller";
import { ProductModule } from "src/models/product.module";

@Module({
    imports: [ProductModule],
    controllers: [AdminController, AdminProductsController]
})
export class AdminModule {}
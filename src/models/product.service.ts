import { Model } from "mongoose";
import { Product } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findOne({id: id}).exec();
    }
    async createOrUpdate(product: Product) {
        const createProduct = new this.productModel(product);
        return createProduct.save();
    }
}
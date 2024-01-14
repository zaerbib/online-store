import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    price: number;

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string) {
        this.image = image;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
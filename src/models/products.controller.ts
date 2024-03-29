import { Controller, Get, Param, Render, Res } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) {}


    @Get('/')
    @Render('products/index')
    async index() {
        const viewData = [];
        viewData['title'] = 'Products - Online Store';
        viewData['subtitle'] = 'List of products';
        viewData['products'] = await this.productsService.findAll();

        return {
            viewData: viewData
        };
    }

    @Get('/:id')
    async show(@Param() params, @Res() response) {
        const product = await this.productsService.findOne(params.id);
        if(product === undefined) {
            return response.redirect('/products');
        }

        const viewData = [];
        viewData['title'] = product.name + '- Online Store';
        viewData['subtitle'] = product.name + '- Product Information';
        viewData['product'] = product;
        
        return response.render('products/show', { viewData: viewData });
    }

}
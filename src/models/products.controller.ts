import { Controller, Get, Param, Render, Res } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) {}

    static products = [
        {
            id: '1',
            name: 'TV',
            description: 'Best tv',
            image: 'game.png',
            price: '1000',
        },
        {
            id: '2',
            name: 'iPhone',
            description: 'Best iPhone',
            image: 'safe.png',
            price: '999',
        },
        {
            id: '3',
            name: 'Chromecast',
            description: 'Best Chromecast',
            image: 'submarine.png',
            price: '30',
        },
        {
            id: '4',
            name: 'Glasses',
            description: 'Best Glasses',
            image: 'game.png',
            price: '100',
        }
    ];


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
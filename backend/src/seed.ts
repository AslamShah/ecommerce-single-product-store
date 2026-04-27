import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { Product } from './products/schemas/product.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const productModel: Model<Product> = app.get('ProductModel');
  
  const existingProduct = await productModel.findOne({ slug: 'apex-01' }).exec();
  
  if (!existingProduct) {
    await productModel.create({
      name: 'Apex-01 Professional Clipper',
      slug: 'apex-01',
      description: 'Professional-grade hair clipper designed for precision cutting. Features ultra-sharp blades, powerful motor, and ergonomic design for comfortable handling.',
      price: 89.99,
      comparePrice: 129.99,
      images: [
        'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682478498_0.png',
        'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682480968_1.png',
        'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682482778_2.png',
        'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682484598_3.png',
      ],
      features: [
        'Ultra-sharp stainless steel blades',
        'Powerful 15,000 RPM motor',
        'Ergonomic lightweight design',
        'Adjustable cutting lengths (0.5mm - 25mm)',
        'Cordless with 90-minute battery life',
        'USB fast charging',
        'Silent operation technology',
      ],
      isActive: true,
      sku: 'APX-01-CLP',
      category: 'Clippers',
    });
    console.log('✅ Sample product seeded');
  } else {
    console.log('ℹ️ Product already exists');
  }
  
  await app.close();
}
bootstrap();
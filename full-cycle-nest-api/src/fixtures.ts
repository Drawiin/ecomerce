import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');

  const fakeProducts = [
    {
      id: '26d1bfa2-f1bc-4a21-863a-9be686eb9f90',
      name: 'Product 1',
      description: 'Product 1 description',
      image_url:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      price: 100,
    },
    {
      id: '45e98a7b-6c39-4f32-98d9-35c0a7a4d18f',
      name: 'Super Widget',
      description: 'The ultimate product for your needs',
      image_url: 'https://www.example.com/super_widget.png',
      price: 120,
    },
    {
      id: '87c62e49-9bf3-43e5-89c7-12aefb7a6827',
      name: 'Tech Gadget',
      description: 'Cutting-edge technology at your fingertips',
      image_url: 'https://www.example.com/tech_gadget.jpg',
      price: 150,
    },
    {
      id: 'b6478f8c-9230-4f48-a8e1-cd43112f2e79',
      name: 'Awesome Gizmo',
      description: 'Experience awesomeness with this gizmo',
      image_url: 'https://www.example.com/awesome_gizmo.png',
      price: 90,
    },
    {
      id: 'd59fba3a-8ebd-4be2-b1e0-fb83731e6c8c',
      name: 'Sleek Device',
      description: 'A sleek and stylish addition to your collection',
      image_url: 'https://www.example.com/sleek_device.jpg',
      price: 110,
    },
    {
      id: '34c1e0b3-4e3b-4fbb-a579-c9c8d4aa67f8',
      name: 'Digital Marvel',
      description: 'Enter the world of digital marvels with this product',
      image_url: 'https://www.example.com/digital_marvel.gif',
      price: 130,
    },
    {
      id: '9a8b6c5e-12d3-4f32-9c74-86f3e21d3c28',
      name: 'Innovative Tech',
      description: 'Stay ahead with this innovative tech solution',
      image_url: 'https://www.example.com/innovative_tech.jpg',
      price: 95,
    },
    {
      id: 'f2673ec1-1b82-416a-89ae-23b0c5b3e0a1',
      name: 'Gadget X',
      description: 'Unlock the power of Gadget X in your life',
      image_url: 'https://www.example.com/gadget_x.png',
      price: 140,
    },
    {
      id: '65d9a8f4-82c7-4b4e-9b0c-7c69318a843e',
      name: 'Smart Companion',
      description: 'Your smart companion for everyday tasks',
      image_url: 'https://www.example.com/smart_companion.jpg',
      price: 105,
    },
    {
      id: '29e1c7d8-6b9a-493e-b9db-efba2b5f3b3c',
      name: 'Digital Wonder',
      description: 'Experience the wonder of digital innovation',
      image_url: 'https://www.example.com/digital_wonder.png',
      price: 115,
    },
  ];
  await productRepo.insert(fakeProducts);

  await app.close();
}
bootstrap();

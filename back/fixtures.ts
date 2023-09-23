import config from './config';
import crypto from 'crypto';
import mongoose from 'mongoose';
import User from './models/User';
import Item from "./models/Item";

const run = async () => {

  await mongoose.connect(config.db);
  const db = mongoose.connection;


  try {
    await db.dropCollection('users');
    await db.dropCollection('items');
  } catch (e) {
    console.log('Collection were not present, skipping drop collections');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'user_1',
      password: '12',
      displayName: 'Bob',
      phone: "+123456789",
      token: crypto.randomUUID(),
    }, {
      username: 'user_2',
      password: '123',
      displayName: 'Loon',
        phone: '+09876543',
      token: crypto.randomUUID(),
    }
  );

  const [item_1, item_2, item_3, item_4] = await Item.create(
    {
      user: user_1._id,
        title: 'Dress',
      description: 'Simple white dress for girls',
      price: 1300,
      image: '/fixtures/whiteDress.jpeg',
      category : 'clothes'
    },
    {
      user: user_2._id,
        title: 'HP',
      description: 'HP Pro Book',
      price: 80000,
      image: '/fixtures/hp.jpeg',
      category : 'PC'
    },
    {
      user: user_1._id,
        title: 'T-Shirt',
      description: 'Blue t-shirt for boys',
      price: 1100,
      image: '/fixtures/tShirt.jpeg',
      category : 'clothes'
    },
    {
      user: user_2._id,
        title: 'Macbook',
      description: 'Macbook m2',
      price: 120000,
      image: '/fixtures/macbook.jpeg',
      category : 'PC'
    },
  )

  await db.close();
}

run().catch(console.error);
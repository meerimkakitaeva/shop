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

  const [user_1, user_2, user_3] = await User.create(
    {
      username: 'user_1',
      password: '12',
      displayName: 'Bob',
      phone: "+123456789988",
      token: crypto.randomUUID(),
    }, {
      username: 'user_2',
      password: '123',
      displayName: 'Loon',
        phone: '+667788900078',
      token: crypto.randomUUID(),
    }, {
        username: 'user_3',
          password: '1234',
          displayName: 'Yan',
          phone: '+776509809784',
          token: crypto.randomUUID(),
      }
  );

  const [item_1, item_2, item_3, item_4] = await Item.create(
    {
      user: user_1._id,
        title: 'Flowy Trench Coat',
      description: 'Trench coat with lapel collar and long sleeves. Front welt pockets. Back vent. Front button closure.',
      price: 5600,
      image: '/fixtures/trench.jpg',
      category : 'clothes'
    },
    {
      user: user_2._id,
        title: 'HP ProBook',
      description: 'The HP ProBook is a line of business-oriented laptop computers made by Hewlett-Packard (HP Inc.). HP marketed the ProBook series to business users; the list price was lower than that of HP\'s higher-end EliteBook series. Hewlett-Packard (HP Inc.)',
      price: 80000,
      image: '/fixtures/hp.jpeg',
      category : 'PC'
    },
    {
      user: user_1._id,
        title: 'T-Shirt',
      description: 'As calm as the ocean and cool as the blue blue sky, a premium shade of blue. Looks great particularly with white or beige bottoms. An all-time favorite combination of blue t-shirt and black jeans amped up with some accessories looks just fine!',
      price: 1100,
      image: '/fixtures/tShirt.jpeg',
      category : 'clothes'
    },
    {
      user: user_2._id,
        title: 'Macbook M2',
      description: 'The M2 contains dedicated neural network hardware in a 16-core Neural Engine capable of executing 15.8 trillion operations per second. Other components include an image signal processor, a PCIe storage controller, a Secure Enclave, and a USB4 controller that includes Thunderbolt 3 (Thunderbolt 4 on Mac mini) support.',
      price: 120000,
      image: '/fixtures/macbook.jpeg',
      category : 'PC'
    },
      {
        user: user_2._id,
        title: 'Pride and Prejudice',
        description: ' romantic novel by Jane Austen, published anonymously in three volumes in 1813. A classic of English literature, written with incisive wit and superb character delineation, it centres on the burgeoning relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. Upon publication, Pride and Prejudice was well received by critics and readers. The first edition sold out within the first year, and it never went out of print.',
        price: 1400,
        image: '/fixtures/book1.jpeg',
        category : 'books'
      },
      {
          user: user_1._id,
          title: 'Me before you',
          description: 'Louisa Clark is an ordinary girl living an exceedingly ordinary life—steady boyfriend, close family—who has barely been farther afield than their tiny village. She takes a badly needed job working for ex–Master of the Universe Will Traynor, who is wheelchair bound after an accident. Will has always lived a huge life—big deals, extreme sports, worldwide travel—and now he’s pretty sure he cannot live the way he is.\n',
          price: 1100,
          image: '/fixtures/book2.jpg',
          category : 'books'
      },
      {
          user: user_2._id,
          title: 'Samsung 23 Ultra',
          description: 'The Samsung Galaxy S23 Ultra is the headliner of the S23 series. Specifications are top-notch including 6.8-inch Dynamic AMOLED display with 120Hz refresh rate, Snapdragon 8 Gen 2 processor, 5000mAh battery, up to 12gigs of RAM, and 1TB of storage.',
          price: 114000,
          image: '/fixtures/samsung.jpeg',
          category : 'phones'
      },
      {
          user: user_1._id,
          title: 'Iphone 15 Pro Max',
          description: 'The iPhone 15 Pro Max display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.69 inches diagonally (actual viewable area is less).',
          price: 135000,
          image: '/fixtures/iphone.jpeg',
          category : 'phones'
      },
      {
          user: user_3._id,
          title: 'Fahrenheit 451',
          description: 'Fahrenheit 451 (1953) is regarded as Ray Bradbury\'s greatest work. The novel is about a future society where books are forbidden, and it has been acclaimed for its anti-censorship themes and its defense of literature against the encroachment of electronic media.',
          price: 990,
          image: 'fixtures/book3.jpeg',
          category: 'books',
      },
      {
          user: user_2.id,
          title: 'Lenovo IdeaPad 3',
          description: 'The Lenovo IdeaPad 3 15 (2021) is a budget Windows ultraportable laptop. It\'s available with AMD Ryzen 5000 U-series CPUs, integrated graphics, up to 16GB of memory, and over 1TB of storage. You can choose between a TN or IPS display; they\'re both 1080p 60Hz panels with no variable refresh rate support.',
          price: 55000,
          image: 'fixtures/lenovo.jpeg',
          category: 'PC',
      },
      {
          user: user_1.id,
          title: 'Faux Suede Bomber Jacket',
          description: 'Round collar jacket with cuffed long sleeves. Front welt pockets. Front tonal snap button closure.',
          price: 3500,
          image: 'fixtures/zara.jpeg',
          category: 'clothes',
      },
  )

  await db.close();
}

run().catch(console.error);
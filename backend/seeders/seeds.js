require('dotenv').config();

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Shoe = require('../models/Shoe');
const Category = require('../models/Category');

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Create your seeds (users)
const NUM_SEED_USERS = 10;

const generateFakeUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    username: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    hashedPassword: bcrypt.hashSync("password", 10)
  };
};

// Create seeds for shoes
const seedCategories = async () => {
  const categories = [
    { name: 'Jordan' },
    { name: 'Yeezy' },
    { name: 'Nike' },
    { name: 'New Balance' },
    { name: 'Asics' }
  ];
  return await Category.insertMany(categories);
};

const generateShoe = (categories, shoeObj) => {
  const category = categories.find(cat => cat.name === shoeObj.category);
  return {
    name: shoeObj.name,
    category: category._id,
    photoUrl: shoeObj.photoUrl,
    description: shoeObj.description,
    price: shoeObj.price
  };
};

const shoeListings = [
  {
    name: "AIR JORDAN 1 RETRO HIGH OG Chicago Lost and Found",
    category: "Jordan",
    photoUrl: './j1-chi.webp',
    description: "The Air Jordan 1 High “Lost and Found” is the highly anticipated re-release of the original colorway of Michael Jordan’s signature shoe that draws inspiration from the model’s 1985 release. The “Lost and Found” replicates the look and feel of the debut version of the “Chicago” from the ‘80s. It features accurate-to-original panel shapes and colors, and a decidedly aged, vintage look. The perforated toe and mid-panel are designed in white leather. The neutral base is accented by red leather overlays. A black leather Swoosh appears on both sides of the shoe. Classic “Nike Air” and Swoosh branding can be found on the red nylon tongue tag. Underfoot, a white midsole and black rubber outsole complete the look.",
    price: 450
  },
  {
    name: "AIR JORDAN 3 White Cement Reimagined 2023",
    category: "Jordan",
    photoUrl: './j3-wc.webp',
    description: "The Air Jordan 3 “White Cement Reimagined” is a special version of the classic basketball sneaker that replicates the model’s original design. Released by Jordan Brand in 2023 to celebrate the iconic Jordan 3’s 35th anniversary, the “White Cement Reimagined” retains the look of the model’s “White Cement” colorway with accurate-to-original panels, colors, and overall shape. Faithful to the 1988 version of the Jordan 3 “White Cement,” the “Reimagined” features a higher-cut ankle collar inspired by the OG Jordan 3’s design. It also is equipped with a white leather upper with contrasting grey elephant print on the toe and heel, which has also been modified to look like the detailing on the original Jordan 3. The “Nike Air” branded heel counter has an aged, vintage look, as does the midsole. A red Jumpman logo is embroidered on the tongue.",
    price: 350
  },
  {
    name: "AIR JORDAN 4 Bred Reimagined",
    category: "Jordan",
    photoUrl: './j4-b.webp',
    description: "The Air Jordan 4 'Bred Reimagined' is an iconic and original colorway of the fourth Air Jordan sneaker that replicates the model’s original design. The “Bred Reimagined” was released by Jordan Brand in February 2024 to celebrate the legendary Jordan 4’s 35th anniversary. Dressed in the same color block as the original version from 1989, the “Bred Reimagined” mimics the look of the OG Jordan 4 “Bred” with accurate-to-original panels, colors, and overall shape. However, the design does differ from the original “Bred” Air Jordan 4 by featuring a tumbled leather upper instead of the OG’s nubuck construction. Cement Grey plastic eyelets contrast the look on the front of the shoe. On the back, Cement Grey “Nike Air” branding gives the sneaker a classic look. A red Jumpman and “Flight” branding in cursive appear on the tongue tag. A grey and white rubber midsole completes the look.",
    price: 350
  },
  {
    name: "DUNK LOW RETRO Black / White - Panda",
    category: "Nike",
    photoUrl: './dunk-panda.webp',
    description: "The Nike Dunk Low “Black/White” is a timeless look for the ultra popular low-top shoe that was released in March 2021. The Dunk made an improbable comeback in 2020 to become one of the hottest shoes on the planet after spending several years in the vault. Colorways like the “Black/White” speak to the shoe’s enduring retro style that feels fresher than ever in the present day. Nike places supple black leather overlays on the forefoot, eyelets, collar, and heel. The same black leather detailing can be found on the Swoosh branding on either side and on the heel tab with “Nike” embroidery in white text. The white leather found on the perforated toe and mid-panel and collar forms a clean contrast against the aforementioned black leather panels. A black nylon branding tag with “Nike” insignia is stitched onto the white mesh tongue.",
    price: 150
  },
  {
    name: "YEEZY SLIDE Onyx 2022/2023",
    category: "Yeezy",
    photoUrl: './yzy-slide-onyx.webp',
    description: "The adidas Yeezy Slide “Onyx” is a monochromatic black colorway of the popular slip-on sandal by Kanye West. The “Onyx” was released in March 2022 and is a casual footwear style for the summer and beyond. Its lightweight, one-piece EVA foam body is designed in Onyx, or black, for a versatile look that goes with anything. Ridges on the outsole provide traction on slippery surfaces.",
    price: 150
  },
  {
    name: "YEEZY BOOST 350 V2 Onyx",
    category: "Yeezy",
    photoUrl: './yzy-350-onyx.webp',
    description: "The adidas Yeezy Boost 350 V2 “Onyx” is a colorway of Kanye West’s popular lifestyle shoe that mimics the appearance of colorways from the “Black Friday Pack.” The aforementioned collection of 350 V2s was originally released back in November 2016 and featured several black-based colorways with contrasting side panel accenting. The “Onyx” replicates the look with its black Primeknit upper and Onyx-colored side stripe displaying “SPLY-350” branding in black lettering on the lateral side of the shoe. Adidas’s proprietary Boost cushioning is encased within the black midsole.",
    price: 320
  },
  {
    name: "YEEZY FOAM RUNNER Carbon",
    category: "Yeezy",
    photoUrl: './yzy-foam-carbon.webp',
    description: "The adidas Yeezy Foam Runner “Carbon” is a monochromatic dark grey colorway of the popular slip-on sandal/sneaker. The Yeezy Foam Runner has a molded one-piece body made from a combination of lightweight EVA foam and harvested algae that are designed in dark grey on this “Carbon” colorway. Perforations provide an airy yet supportive fit.",
    price: 200
  },
  {
    name: "YEEZY SLIDE Bone 2022",
    category: "Yeezy",
    photoUrl: './yzy-slide-bone.webp',
    description: "The adidas Yeezy Slide “Bone” is a versatile, earth tone colorway of Kanye West’s casual slip-on sandals. From July 2022, the “Bone” is yet another minimalist vibe for the Yeezy Slide. It features a tan-colored lightweight EVA foam construction for superior durability while remaining comfortable to all-day use. A large mid-foot arch stabilizes the foot while ridges on the outsole ensure grip on slippery surfaces.",
    price: 220
  },
  {
    name: "YEEZY BOOST 350 V2 Black Red 2017 - 2020",
    category: "Yeezy",
    photoUrl: './yzy-350-breds.webp',
    description: "This first Yeezy sighting of 2017 was this adidas Yeezy Boost 350 V2 Bred. Anchored by a woven black Primeknit upper and a matching midsole, the shoe features an tonal black look that's offset by red SPLY-350 messaging in reverse on the side panel. The stripe the Yeezy Boost 350 V2 model often features does not appear, but that doesn't take away from the overall appeal of the shoe. Instead, this iteration of the adidas Yeezy Boost 350 V2 is a reminder that sometimes simple is better.",
    price: 320
  },
  {
    name: "YEEZY FOAM RUNNER MX Brown Blue",
    category: "Yeezy",
    photoUrl: './yzy-foam-mx.webp',
    description: "The adidas Yeezy Foam Runner “MX Brown/Blue” is a colorway of the futuristic slip-on sandal/sneaker design with an interesting combination of colors. The Yeezy Foam Runner in “MX Brown/Blue” has a marbled blend of grey, dark blue, and brown on its lightweight, EVA foam and harvested algae body. The design’s multiple perforations provide ventilation and give the shoe a unique appearance.",
    price: 180
  },
  {
    name: "New Balance 990 V6 Action Bronson - Lapis Lazuli",
    category: "New Balance",
    photoUrl: './nb-ab.webp',
    description: "The Action Bronson x New Balance 990 V6 “Lapis Lazuli” is a collaboration by the New York based hip-hop artist and New Balance on the popular lifestyle shoe. One of multiple colorways of the New Balance 990 V6 by Bronson in 2023, the “Lapis Lazuli” followed the initial “Baklava” colorway as the second release. The shoe features grey-blue mesh base with a Lapis-Lazuli-colored suede mudguard overlay. Contrasting reflective leather overlays are found on the toe and collar. Teal suede overlays appear on either side of the shoe. A silver “N” logo is located on the sides and dual branding is printed on the insole. Underfoot, the shoe is mounted on a cream and blue midsole.",
    price: 300
  },
  {
    name: "NEW BALANCE 1906R Salehe Bembury - Heat Be Hot - Lava",
    category: "New Balance",
    photoUrl: './nb-sb.webp',
    description: "The Salehe Bembury x New Balance 1906R “Heat Be Hot - Lava” is a collaboration by the acclaimed footwear designer on a fiery colorway of the lifestyle shoe. Inspired by 2000s-era performance running sneakers, the New Balance 1906R has both a retro and contemporary design, and here, Salehe Bembury modifies its appearance with details emulating the lava pantone. The shoe features flashy metallic silver overlays on a gradient, yellow, orange, and red mesh base. An orange “N” logo appears on the sides, while Salehe’s signature branding is found on the orange tab on the lateral side of the collar. Underfoot, the shoe’s techy-looking N-ergy foam midsole has ash-like black accenting to complete the shoe’s volcano-inspired motif.",
    price: 300
  },
  {
    name: "NEW BALANCE 550 Marquette",
    category: "New Balance",
    photoUrl: './nb-marquette.jpeg',
    description: "The New Balance 550 “Marquette” is a colorway of the classic shoe that shows appreciation to the Marquette Golden Eagles’ college basketball team. In no way officially affiliated with Marquette University, the New Balance 550 “Marquette” nonetheless nods to the school’s men’s and women’s college basketball teams by featuring their team uniform colors on its design. A combination of smooth and dotted white leather is found on the shoe’s upper. Contrasting light blue “N” branding appears on both sides. A golden yellow “550” logo is embroidered on the lateral side of the forefoot and cream “NB” branding appears on the navy heel overlay. Yellow and burgundy accenting is found on the overlays on the collar and heel, respectively. The white rubber midsole is paired with a blue, white, and grey outsole.",
    price: 150
  },
  {
    name: "ASICS GEL-KAYANO 14 Metallic Plum",
    category: "Asics",
    photoUrl: './asics-mp.webp',
    description: "The ASICS GEL-Kayano 14 Metallic Plum is a versatile colorway of the retro running shoe by the Japanese footwear company. The Gel-Kayano 14 is one of several shoes that helped popularize the Y2K sneaker trend in 2022 and 2023. Done up in “Metallic Plum,” the colorway features a cream mesh upper with silver leather overlays and Metallic Plum leather ASICS branding on the sides. A “Gel-Kayano” logo appears on the lateral side of the left shoe’s heel and “ASICS” branding is seen on the tongue. The Y2K-style shoe is mounted on a techy looking midsole that features ASICS’s Gel cushioning technology.",
    price: 190
  },
  {
    name: "ASICS GEL 1130 Canyon",
    category: "Asics",
    photoUrl: './asics-canyon.webp',
    description: "The ASICS Gel-1130 “Canyon” is a colorway of the retro running shoe with brown accents. The Gel-1130 debuted in 2008 and is now part of the Y2K trend in sneaker culture. On the “Canyon” colorway, the upper features a white mesh construction with metallic brown overlays and silver accenting. “ASICS” and “Gel-1130” branding can be found on the mesh tongue. A techy-looking midsole with the brand’s signature Gel cushioning technology provides a comfortable ride.",
    price: 150
  },
  {
    name: "ASICS GEL-LYTE III Sean Wotherspoon x atmos",
    category: "Asics",
    photoUrl: './asics-sw.jpeg',
    description: "The Sean Wotherspoon x atmos x ASICS Gel-Lyte III is a high-profile three-way collaboration between Wotherspoon, the Japanese-based boutique, and heritage footwear brand that was released in Summer 2020. Wotherspoon’s debut ASICS collaboration certainly doesn’t disappoint as it features a customizable element that allows the wearer to add and remove ASICS patches on the mid-panel. The bold mismatching color scheme of both shoes is reminiscent of the colorful era of streetwear culture that began in Japan in the 2000s. Like Wotherspoon’s noteworthy Nike Air Max 1/97 design from 2018, this GEL-Lyte III is constructed using premium corduroy paneling. The model’s split tongue design is left fully intact by Wotherspoon and atmos, though that’s about all that is familiar on one of the most vibrant GEL-Lyte III colorways ever produced.",
    price: 200
  }
];

// Connect to the database, drop existing data, and seed users, categories, and shoes
mongoose.connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    await Promise.all([
      User.deleteMany(),
      Shoe.deleteMany(),
      Category.deleteMany()
    ]);
    const categories = await seedCategories();
    const users = Array.from({ length: NUM_SEED_USERS }, generateFakeUser);
    const shoes = shoeListings.map(shoeObj => generateShoe(categories, shoeObj));
    await User.insertMany(users);
    await Shoe.insertMany(shoes);
    console.log("Seeding completed!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });



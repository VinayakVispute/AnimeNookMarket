const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");

const products = [
  {
    id: 26,
    title: "Plant Hanger For Home",
    description:
      "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
    price: 41,
    discountPercentage: 17.86,
    rating: 4.08,
    stock: 131,
    brand: "Boho Decor",
    category: "Home Decoration",
    thumbnail: "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/26/1.jpg",
      "https://i.dummyjson.com/data/products/26/2.jpg",
      "https://i.dummyjson.com/data/products/26/3.jpg",
      "https://i.dummyjson.com/data/products/26/4.jpg",
      "https://i.dummyjson.com/data/products/26/5.jpg",
      "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
    ],
  },
  {
    id: 27,
    title: "Flying Wooden Bird",
    description:
      "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
    price: 51,
    discountPercentage: 15.58,
    rating: 4.41,
    stock: 17,
    brand: "Flying Wooden",
    category: "Home Decoration",
    thumbnail: "https://i.dummyjson.com/data/products/27/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/27/1.jpg",
      "https://i.dummyjson.com/data/products/27/2.jpg",
      "https://i.dummyjson.com/data/products/27/3.jpg",
      "https://i.dummyjson.com/data/products/27/4.jpg",
      "https://i.dummyjson.com/data/products/27/thumbnail.webp",
    ],
  },
  {
    id: 28,
    title: "3D Embellishment Art Lamp",
    description:
      "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
    price: 20,
    discountPercentage: 16.49,
    rating: 4.82,
    stock: 54,
    brand: "LED Lights",
    category: "Home Decoration",
    thumbnail: "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/28/1.jpg",
      "https://i.dummyjson.com/data/products/28/2.jpg",
      "https://i.dummyjson.com/data/products/28/3.png",
      "https://i.dummyjson.com/data/products/28/4.jpg",
      "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
    ],
  },
  {
    id: 29,
    title: "Handcraft Chinese style",
    description:
      "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
    price: 60,
    discountPercentage: 15.34,
    rating: 4.44,
    stock: 7,
    brand: "luxury palace",
    category: "Home Decoration",
    thumbnail: "https://i.dummyjson.com/data/products/29/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/29/1.jpg",
      "https://i.dummyjson.com/data/products/29/2.jpg",
      "https://i.dummyjson.com/data/products/29/3.webp",
      "https://i.dummyjson.com/data/products/29/4.webp",
      "https://i.dummyjson.com/data/products/29/thumbnail.webp",
    ],
  },
  {
    id: 30,
    title: "Key Holder",
    description:
      "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    discountPercentage: 2.92,
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    category: "Home Decoration",
    thumbnail: "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/30/1.jpg",
      "https://i.dummyjson.com/data/products/30/2.jpg",
      "https://i.dummyjson.com/data/products/30/3.jpg",
      "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
    ],
  },
  {
    id: 41,
    title: "NIGHT SUIT",
    description: "NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.",
    price: 55,
    discountPercentage: 15.05,
    rating: 4.65,
    stock: 21,
    brand: "RED MICKY MOUSE..",
    category: "Womens Dresses",
    thumbnail: "https://i.dummyjson.com/data/products/41/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/41/1.jpg",
      "https://i.dummyjson.com/data/products/41/2.webp",
      "https://i.dummyjson.com/data/products/41/3.jpg",
      "https://i.dummyjson.com/data/products/41/4.jpg",
      "https://i.dummyjson.com/data/products/41/thumbnail.webp",
    ],
  },
  {
    id: 42,
    title: "Stiched Kurta plus trouser",
    description:
      "FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN",
    price: 80,
    discountPercentage: 15.37,
    rating: 4.05,
    stock: 148,
    brand: "Digital Printed",
    category: "Womens Dresses",
    thumbnail: "https://i.dummyjson.com/data/products/42/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/42/1.png",
      "https://i.dummyjson.com/data/products/42/2.png",
      "https://i.dummyjson.com/data/products/42/3.png",
      "https://i.dummyjson.com/data/products/42/4.jpg",
      "https://i.dummyjson.com/data/products/42/thumbnail.jpg",
    ],
  },
  {
    id: 43,
    title: "frock gold printed",
    description:
      "Ghazi fabric long frock gold printed ready to wear stitched collection (G992)",
    price: 600,
    discountPercentage: 15.55,
    rating: 4.31,
    stock: 150,
    brand: "Ghazi Fabric",
    category: "Womens Dresses",
    thumbnail: "https://i.dummyjson.com/data/products/43/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/43/1.jpg",
      "https://i.dummyjson.com/data/products/43/2.jpg",
      "https://i.dummyjson.com/data/products/43/3.jpg",
      "https://i.dummyjson.com/data/products/43/4.jpg",
      "https://i.dummyjson.com/data/products/43/thumbnail.jpg",
    ],
  },
  {
    id: 44,
    title: "Ladies Multicolored Dress",
    description:
      "This classy shirt for women gives you a gorgeous look on everyday wear and specially for semi-casual wears.",
    price: 79,
    discountPercentage: 16.88,
    rating: 4.03,
    stock: 2,
    brand: "Ghazi Fabric",
    category: "Womens Dresses",
    thumbnail: "https://i.dummyjson.com/data/products/44/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/44/1.jpg",
      "https://i.dummyjson.com/data/products/44/2.jpg",
      "https://i.dummyjson.com/data/products/44/3.jpg",
      "https://i.dummyjson.com/data/products/44/4.jpg",
      "https://i.dummyjson.com/data/products/44/thumbnail.jpg",
    ],
  },
  {
    id: 45,
    title: "Malai Maxi Dress",
    description:
      "Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff",
    price: 50,
    discountPercentage: 5.07,
    rating: 4.67,
    stock: 96,
    brand: "IELGY",
    category: "Womens Dresses",
    thumbnail: "https://i.dummyjson.com/data/products/45/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/45/1.jpg",
      "https://i.dummyjson.com/data/products/45/2.webp",
      "https://i.dummyjson.com/data/products/45/3.jpg",
      "https://i.dummyjson.com/data/products/45/4.jpg",
      "https://i.dummyjson.com/data/products/45/thumbnail.jpg",
    ],
  },
  {
    id: 46,
    title: "women's shoes",
    description:
      "Close: Lace, Style with bottom: Increased inside, Sole Material: Rubber",
    price: 40,
    discountPercentage: 16.96,
    rating: 4.14,
    stock: 72,
    brand: "IELGY fashion",
    category: "Womens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/46/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/46/1.webp",
      "https://i.dummyjson.com/data/products/46/2.jpg",
      "https://i.dummyjson.com/data/products/46/3.jpg",
      "https://i.dummyjson.com/data/products/46/4.jpg",
      "https://i.dummyjson.com/data/products/46/thumbnail.jpg",
    ],
  },
  {
    id: 47,
    title: "Sneaker shoes",
    description:
      "Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women",
    price: 120,
    discountPercentage: 10.37,
    rating: 4.19,
    stock: 50,
    brand: "Synthetic Leather",
    category: "Womens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/47/thumbnail.jpeg",
    images: [
      "https://i.dummyjson.com/data/products/47/1.jpg",
      "https://i.dummyjson.com/data/products/47/2.jpg",
      "https://i.dummyjson.com/data/products/47/3.jpg",
      "https://i.dummyjson.com/data/products/47/thumbnail.jpeg",
    ],
  },
  {
    id: 48,
    title: "Women Strip Heel",
    description:
      "Features: Flip-flops, Mid Heel, Comfortable, Striped Heel, Antiskid, Striped",
    price: 40,
    discountPercentage: 10.83,
    rating: 4.02,
    stock: 25,
    brand: "Sandals Flip Flops",
    category: "Womens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/48/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/48/1.jpg",
      "https://i.dummyjson.com/data/products/48/2.jpg",
      "https://i.dummyjson.com/data/products/48/3.jpg",
      "https://i.dummyjson.com/data/products/48/4.jpg",
      "https://i.dummyjson.com/data/products/48/thumbnail.jpg",
    ],
  },
  {
    id: 49,
    title: "Chappals & Shoe Ladies Metallic",
    description:
      "Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals",
    price: 23,
    discountPercentage: 2.62,
    rating: 4.72,
    stock: 107,
    brand: "Maasai Sandals",
    category: "Womens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/49/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/49/1.jpg",
      "https://i.dummyjson.com/data/products/49/2.jpg",
      "https://i.dummyjson.com/data/products/49/3.webp",
      "https://i.dummyjson.com/data/products/49/thumbnail.jpg",
    ],
  },
  {
    id: 50,
    title: "Women Shoes",
    description:
      "2020 New Arrivals Genuine Leather Fashion Trend Platform Summer Women Shoes",
    price: 36,
    discountPercentage: 16.87,
    rating: 4.33,
    stock: 46,
    brand: "Arrivals Genuine",
    category: "Womens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/50/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/50/1.jpeg",
      "https://i.dummyjson.com/data/products/50/2.jpg",
      "https://i.dummyjson.com/data/products/50/3.jpg",
    ],
  },
  {
    id: 51,
    title: "half sleeves T shirts",
    description:
      "Many store is creating new designs and trend every month and every year. Daraz.pk have a beautiful range of men fashion brands",
    price: 23,
    discountPercentage: 12.76,
    rating: 4.26,
    stock: 132,
    brand: "Vintage Apparel",
    category: "Mens Shirts",
    thumbnail: "https://i.dummyjson.com/data/products/51/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/51/1.png",
      "https://i.dummyjson.com/data/products/51/2.jpg",
      "https://i.dummyjson.com/data/products/51/3.jpg",
      "https://i.dummyjson.com/data/products/51/thumbnail.jpg",
    ],
  },
  {
    id: 52,
    title: "FREE FIRE T Shirt",
    description:
      "quality and professional print - It doesn't just look high quality, it is high quality.",
    price: 10,
    discountPercentage: 14.72,
    rating: 4.52,
    stock: 128,
    brand: "FREE FIRE",
    category: "Mens Shirts",
    thumbnail: "https://i.dummyjson.com/data/products/52/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/52/1.png",
      "https://i.dummyjson.com/data/products/52/2.png",
      "https://i.dummyjson.com/data/products/52/3.jpg",
      "https://i.dummyjson.com/data/products/52/4.jpg",
      "https://i.dummyjson.com/data/products/52/thumbnail.jpg",
    ],
  },
  {
    id: 53,
    title: "printed high quality T shirts",
    description: "Brand: vintage Apparel ,Export quality",
    price: 35,
    discountPercentage: 7.54,
    rating: 4.89,
    stock: 6,
    brand: "Vintage Apparel",
    category: "Mens Shirts",
    thumbnail: "https://i.dummyjson.com/data/products/53/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/53/1.webp",
      "https://i.dummyjson.com/data/products/53/2.jpg",
      "https://i.dummyjson.com/data/products/53/3.jpg",
      "https://i.dummyjson.com/data/products/53/4.jpg",
      "https://i.dummyjson.com/data/products/53/thumbnail.jpg",
    ],
  },
  {
    id: 54,
    title: "Pubg Printed Graphic T-Shirt",
    description:
      "Product Description Features: 100% Ultra soft Polyester Jersey. Vibrant & colorful printing on front. Feels soft as cotton without ever cracking",
    price: 46,
    discountPercentage: 16.44,
    rating: 4.62,
    stock: 136,
    brand: "The Warehouse",
    category: "Mens Shirts",
    thumbnail: "https://i.dummyjson.com/data/products/54/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/54/1.jpg",
      "https://i.dummyjson.com/data/products/54/2.jpg",
      "https://i.dummyjson.com/data/products/54/3.jpg",
      "https://i.dummyjson.com/data/products/54/4.jpg",
      "https://i.dummyjson.com/data/products/54/thumbnail.jpg",
    ],
  },
  {
    id: 55,
    title: "Money Heist Printed Summer T Shirts",
    description: "Fabric Jercy, Size: M & L Wear Stylish Dual Stiched",
    price: 66,
    discountPercentage: 15.97,
    rating: 4.9,
    stock: 122,
    brand: "The Warehouse",
    category: "Mens Shirts",
    thumbnail: "https://i.dummyjson.com/data/products/55/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/55/1.jpg",
      "https://i.dummyjson.com/data/products/55/2.webp",
      "https://i.dummyjson.com/data/products/55/3.jpg",
      "https://i.dummyjson.com/data/products/55/4.jpg",
      "https://i.dummyjson.com/data/products/55/thumbnail.jpg",
    ],
  },
  {
    id: 56,
    title: "Sneakers Joggers Shoes",
    description:
      "Gender: Men , Colors: Same as DisplayedCondition: 100% Brand New",
    price: 40,
    discountPercentage: 12.57,
    rating: 4.38,
    stock: 6,
    brand: "Sneakers",
    category: "Mens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/56/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/56/1.jpg",
      "https://i.dummyjson.com/data/products/56/2.jpg",
      "https://i.dummyjson.com/data/products/56/3.jpg",
      "https://i.dummyjson.com/data/products/56/4.jpg",
      "https://i.dummyjson.com/data/products/56/5.jpg",
      "https://i.dummyjson.com/data/products/56/thumbnail.jpg",
    ],
  },
  {
    id: 57,
    title: "Loafers for men",
    description:
      "Men Shoes - Loafers for men - Rubber Shoes - Nylon Shoes - Shoes for men - Moccassion - Pure Nylon (Rubber) Expot Quality.",
    price: 47,
    discountPercentage: 10.91,
    rating: 4.91,
    stock: 20,
    brand: "Rubber",
    category: "Mens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/57/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/57/1.jpg",
      "https://i.dummyjson.com/data/products/57/2.jpg",
      "https://i.dummyjson.com/data/products/57/3.jpg",
      "https://i.dummyjson.com/data/products/57/4.jpg",
      "https://i.dummyjson.com/data/products/57/thumbnail.jpg",
    ],
  },
  {
    id: 58,
    title: "formal offices shoes",
    description:
      "Pattern Type: Solid, Material: PU, Toe Shape: Pointed Toe ,Outsole Material: Rubber",
    price: 57,
    discountPercentage: 12,
    rating: 4.41,
    stock: 68,
    brand: "The Warehouse",
    category: "Mens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/58/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/58/1.jpg",
      "https://i.dummyjson.com/data/products/58/2.jpg",
      "https://i.dummyjson.com/data/products/58/3.jpg",
      "https://i.dummyjson.com/data/products/58/4.jpg",
      "https://i.dummyjson.com/data/products/58/thumbnail.jpg",
    ],
  },
  {
    id: 59,
    title: "Spring and summershoes",
    description:
      "Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;",
    price: 20,
    discountPercentage: 8.71,
    rating: 4.33,
    stock: 137,
    brand: "Sneakers",
    category: "Mens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/59/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/59/1.jpg",
      "https://i.dummyjson.com/data/products/59/2.jpg",
      "https://i.dummyjson.com/data/products/59/3.jpg",
      "https://i.dummyjson.com/data/products/59/4.jpg",
      "https://i.dummyjson.com/data/products/59/thumbnail.jpg",
    ],
  },
  {
    id: 60,
    title: "Stylish Casual Jeans Shoes",
    description:
      "High Quality ,Stylish design ,Comfortable wear ,FAshion ,Durable",
    price: 58,
    discountPercentage: 7.55,
    rating: 4.55,
    stock: 129,
    brand: "Sneakers",
    category: "Mens Shoes",
    thumbnail: "https://i.dummyjson.com/data/products/60/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/60/1.jpg",
      "https://i.dummyjson.com/data/products/60/2.jpg",
      "https://i.dummyjson.com/data/products/60/3.jpg",
      "https://i.dummyjson.com/data/products/60/thumbnail.jpg",
    ],
  },
  {
    id: 61,
    title: "Leather Straps Wristwatch",
    description: "Style:Sport ,Clasp:Buckles ,Water Resistance Depth:3Bar",
    price: 120,
    discountPercentage: 7.14,
    rating: 4.63,
    stock: 91,
    brand: "Naviforce",
    category: "Mens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/61/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/61/1.jpg",
      "https://i.dummyjson.com/data/products/61/2.png",
      "https://i.dummyjson.com/data/products/61/3.jpg",
    ],
  },
  {
    id: 62,
    title: "Waterproof Leather Brand Watch",
    description:
      "Watch Crown With Environmental IPS Bronze Electroplating; Display system of 12 hours",
    price: 46,
    discountPercentage: 3.15,
    rating: 4.05,
    stock: 95,
    brand: "SKMEI 9117",
    category: "Mens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/62/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/62/1.jpg",
      "https://i.dummyjson.com/data/products/62/2.jpg",
    ],
  },
  {
    id: 63,
    title: "Royal Blue Premium Watch",
    description:
      "Men Silver Chain Royal Blue Premium Watch Latest Analog Watch",
    price: 50,
    discountPercentage: 2.56,
    rating: 4.89,
    stock: 142,
    brand: "SKMEI 9117",
    category: "Mens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/63/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/63/1.jpg",
      "https://i.dummyjson.com/data/products/63/2.jpg",
      "https://i.dummyjson.com/data/products/63/3.png",
      "https://i.dummyjson.com/data/products/63/4.jpeg",
    ],
  },
  {
    id: 64,
    title: "Leather Strap Skeleton Watch",
    description:
      "Leather Strap Skeleton Watch for Men - Stylish and Latest Design",
    price: 46,
    discountPercentage: 10.2,
    rating: 4.98,
    stock: 61,
    brand: "Strap Skeleton",
    category: "Mens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/64/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/64/1.jpg",
      "https://i.dummyjson.com/data/products/64/2.webp",
      "https://i.dummyjson.com/data/products/64/3.jpg",
      "https://i.dummyjson.com/data/products/64/thumbnail.jpg",
    ],
  },
  {
    id: 65,
    title: "Stainless Steel Wrist Watch",
    description:
      "Stylish Watch For Man (Luxury) Classy Men's Stainless Steel Wrist Watch - Box Packed",
    price: 47,
    discountPercentage: 17.79,
    rating: 4.79,
    stock: 94,
    brand: "Stainless",
    category: "Mens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/65/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/65/1.jpg",
      "https://i.dummyjson.com/data/products/65/2.webp",
      "https://i.dummyjson.com/data/products/65/3.jpg",
      "https://i.dummyjson.com/data/products/65/4.webp",
      "https://i.dummyjson.com/data/products/65/thumbnail.webp",
    ],
  },
  {
    id: 66,
    title: "Steel Analog Couple Watches",
    description: "Elegant design, Stylish ,Unique & Trendy,Comfortable wear",
    price: 35,
    discountPercentage: 3.23,
    rating: 4.79,
    stock: 24,
    brand: "Eastern Watches",
    category: "Womens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/66/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/66/1.jpg",
      "https://i.dummyjson.com/data/products/66/2.jpg",
      "https://i.dummyjson.com/data/products/66/3.jpg",
      "https://i.dummyjson.com/data/products/66/4.JPG",
      "https://i.dummyjson.com/data/products/66/thumbnail.jpg",
    ],
  },
  {
    id: 67,
    title: "Fashion Magnetic Wrist Watch",
    description:
      "Buy this awesome  The product is originally manufactured by the company and it's a top selling product with a very reasonable",
    price: 60,
    discountPercentage: 16.69,
    rating: 4.03,
    stock: 46,
    brand: "Eastern Watches",
    category: "Womens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/67/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/67/1.jpg",
      "https://i.dummyjson.com/data/products/67/2.jpg",
      "https://i.dummyjson.com/data/products/67/3.jpg",
      "https://i.dummyjson.com/data/products/67/4.jpg",
      "https://i.dummyjson.com/data/products/67/thumbnail.jpg",
    ],
  },
  {
    id: 68,
    title: "Stylish Luxury Digital Watch",
    description:
      "Stylish Luxury Digital Watch For Girls / Women - Led Smart Ladies Watches For Girls",
    price: 57,
    discountPercentage: 9.03,
    rating: 4.55,
    stock: 77,
    brand: "Luxury Digital",
    category: "Womens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/68/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/68/1.jpg",
      "https://i.dummyjson.com/data/products/68/2.jpg",
    ],
  },
  {
    id: 69,
    title: "Golden Watch Pearls Bracelet Watch",
    description:
      "Product details of Golden Watch Pearls Bracelet Watch For Girls - Golden Chain Ladies Bracelate Watch for Women",
    price: 47,
    discountPercentage: 17.55,
    rating: 4.77,
    stock: 89,
    brand: "Watch Pearls",
    category: "Womens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/69/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/69/1.jpg",
      "https://i.dummyjson.com/data/products/69/2.jpg",
      "https://i.dummyjson.com/data/products/69/3.webp",
      "https://i.dummyjson.com/data/products/69/4.jpg",
      "https://i.dummyjson.com/data/products/69/thumbnail.jpg",
    ],
  },
  {
    id: 70,
    title: "Stainless Steel Women",
    description:
      "Fashion Skmei 1830 Shell Dial Stainless Steel Women Wrist Watch Lady Bracelet Watch Quartz Watches Ladies",
    price: 35,
    discountPercentage: 8.98,
    rating: 4.08,
    stock: 111,
    brand: "Bracelet",
    category: "Womens Watches",
    thumbnail: "https://i.dummyjson.com/data/products/70/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/70/1.jpg",
      "https://i.dummyjson.com/data/products/70/2.jpg",
      "https://i.dummyjson.com/data/products/70/thumbnail.jpg",
    ],
  },
  {
    id: 71,
    title: "Women Shoulder Bags",
    description:
      "LouisWill Women Shoulder Bags Long Clutches Cross Body Bags Phone Bags PU Leather Hand Bags Large Capacity Card Holders Zipper Coin Purses Fashion Crossbody Bags for Girls Ladies",
    price: 46,
    discountPercentage: 14.65,
    rating: 4.71,
    stock: 17,
    brand: "LouisWill",
    category: "Womens Bags",
    thumbnail: "https://i.dummyjson.com/data/products/71/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/71/1.jpg",
      "https://i.dummyjson.com/data/products/71/2.jpg",
      "https://i.dummyjson.com/data/products/71/3.webp",
      "https://i.dummyjson.com/data/products/71/thumbnail.jpg",
    ],
  },
  {
    id: 72,
    title: "Handbag For Girls",
    description:
      "This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.",
    price: 23,
    discountPercentage: 17.5,
    rating: 4.91,
    stock: 27,
    brand: "LouisWill",
    category: "Womens Bags",
    thumbnail: "https://i.dummyjson.com/data/products/72/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/72/1.jpg",
      "https://i.dummyjson.com/data/products/72/2.png",
      "https://i.dummyjson.com/data/products/72/3.webp",
      "https://i.dummyjson.com/data/products/72/4.jpg",
      "https://i.dummyjson.com/data/products/72/thumbnail.webp",
    ],
  },
  {
    id: 73,
    title: "Fancy hand clutch",
    description:
      "This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.",
    price: 44,
    discountPercentage: 10.39,
    rating: 4.18,
    stock: 101,
    brand: "Bracelet",
    category: "Womens Bags",
    thumbnail: "https://i.dummyjson.com/data/products/73/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/73/1.jpg",
      "https://i.dummyjson.com/data/products/73/2.webp",
      "https://i.dummyjson.com/data/products/73/3.jpg",
      "https://i.dummyjson.com/data/products/73/thumbnail.jpg",
    ],
  },
  {
    id: 74,
    title: "Leather Hand Bag",
    description:
      "It features an attractive design that makes it a must have accessory in your collection. We sell different kind of bags for boys, kids, women, girls and also for unisex.",
    price: 57,
    discountPercentage: 11.19,
    rating: 4.01,
    stock: 43,
    brand: "Copenhagen Luxe",
    category: "Womens Bags",
    thumbnail: "https://i.dummyjson.com/data/products/74/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/74/1.jpg",
      "https://i.dummyjson.com/data/products/74/2.jpg",
      "https://i.dummyjson.com/data/products/74/3.jpg",
      "https://i.dummyjson.com/data/products/74/4.jpg",
      "https://i.dummyjson.com/data/products/74/thumbnail.jpg",
    ],
  },
  {
    id: 75,
    title: "Seven Pocket Women Bag",
    description:
      "Seven Pocket Women Bag Handbags Lady Shoulder Crossbody Bag Female Purse Seven Pocket Bag",
    price: 68,
    discountPercentage: 14.87,
    rating: 4.93,
    stock: 13,
    brand: "Steal Frame",
    category: "Womens Bags",
    thumbnail: "https://i.dummyjson.com/data/products/75/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/75/1.jpg",
      "https://i.dummyjson.com/data/products/75/2.jpg",
      "https://i.dummyjson.com/data/products/75/3.jpg",
      "https://i.dummyjson.com/data/products/75/thumbnail.jpg",
    ],
  },
  {
    id: 76,
    title: "Silver Ring Set Women",
    description:
      "Jewelry Type:RingsCertificate Type:NonePlating:Silver PlatedShapeattern:noneStyle:CLASSICReligious",
    price: 70,
    discountPercentage: 13.57,
    rating: 4.61,
    stock: 51,
    brand: "Darojay",
    category: "Womens Jewellery",
    thumbnail: "https://i.dummyjson.com/data/products/76/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/76/1.jpg",
      "https://i.dummyjson.com/data/products/76/2.jpg",
      "https://i.dummyjson.com/data/products/76/thumbnail.jpg",
    ],
  },
  {
    id: 77,
    title: "Rose Ring",
    description:
      "Brand: The Greetings Flower Colour: RedRing Colour: GoldenSize: Adjustable",
    price: 100,
    discountPercentage: 3.22,
    rating: 4.21,
    stock: 149,
    brand: "Copenhagen Luxe",
    category: "Womens Jewellery",
    thumbnail: "https://i.dummyjson.com/data/products/77/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/77/1.jpg",
      "https://i.dummyjson.com/data/products/77/2.jpg",
      "https://i.dummyjson.com/data/products/77/3.jpg",
      "https://i.dummyjson.com/data/products/77/thumbnail.jpg",
    ],
  },
  {
    id: 78,
    title: "Rhinestone Korean Style Open Rings",
    description:
      "Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women",
    price: 30,
    discountPercentage: 8.02,
    rating: 4.69,
    stock: 9,
    brand: "Fashion Jewellery",
    category: "Womens Jewellery",
    thumbnail: "https://i.dummyjson.com/data/products/78/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/78/thumbnail.jpg"],
  },
  {
    id: 79,
    title: "Elegant Female Pearl Earrings",
    description:
      "Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set",
    price: 30,
    discountPercentage: 12.8,
    rating: 4.74,
    stock: 16,
    brand: "Fashion Jewellery",
    category: "Womens Jewellery",
    thumbnail: "https://i.dummyjson.com/data/products/79/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/79/1.jpg"],
  },
  {
    id: 80,
    title: "Chain Pin Tassel Earrings",
    description:
      "Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)",
    price: 45,
    discountPercentage: 17.75,
    rating: 4.59,
    stock: 9,
    brand: "Cuff Butterfly",
    category: "Womens Jewellery",
    thumbnail: "https://i.dummyjson.com/data/products/80/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/80/1.jpg",
      "https://i.dummyjson.com/data/products/80/2.jpg",
      "https://i.dummyjson.com/data/products/80/3.png",
      "https://i.dummyjson.com/data/products/80/4.jpg",
      "https://i.dummyjson.com/data/products/80/thumbnail.jpg",
    ],
  },
];

function capitalizeFirstLetterEachWord(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// Function to create product data
async function createProductData() {
  let count = 0;
  let notfoundbrand = [];
  let notfoudncategory = [];
  while (count < 100) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Loop through each product
      for (let i = count; i < 100; i++) {
        const product = products[i];
        // Find category reference
        const category = await Category.findOne({
          label: capitalizeFirstLetterEachWord(product.category),
        });
        if (!category) {
          notfoudncategory.push(count);
          count++;
          console.log(
            `Category not found: ${capitalizeFirstLetterEachWord(
              product.category
            )}`
          );
          continue;
        }

        // Find brand reference
        const brand = await Brand.findOne({
          label: capitalizeFirstLetterEachWord(product.brand),
        });
        if (!brand) {
          notfoundbrand.push(count);
          count++;
          console.log(
            `Brand not found: ${capitalizeFirstLetterEachWord(product.brand)}`
          );
          continue;
        }

        // Save images and thumbnail to Cloudinary
        const thumbnailResponse = await cloudinary.uploader.upload(
          product.thumbnail,
          { folder: "AnimeNookMarket" }
        );
        const imagesResponse = await Promise.all(
          product.images.map((image) =>
            cloudinary.uploader.upload(image, { folder: "AnimeNookMarket" })
          )
        );
        console.log(thumbnailResponse);

        // Create product data
        const productData = {
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          category: category._id,
          brand: brand._id,
          thumbnail: thumbnailResponse.secure_url,
          images: imagesResponse.map((res) => res.secure_url),
          isDeleted: product.isDeleted,
        };

        // Save the product to the database
        await Product.create(productData);

        console.log(
          `Product "${product.title}" created successfully! ${count++}`
        );
      }

      console.log("All products created successfully!");
      console.log("brand not found", notfoundbrand);
      console.log("Category not found", notfoudncategory);
    } catch (error) {
      console.error("Error creating products:", error);
      console.log("brand not found", notfoundbrand);
      console.log("Category not found", notfoudncategory);
    } finally {
      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log("brand not found", notfoundbrand);
      console.log("Category not found", notfoudncategory);
    }
  }
}

function filter() {
  const notFoundIndices = [
    24, 25, 26, 27, 28, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
    53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78,
  ];

  // Filter the product data based on the notFoundIndices
  const filteredProducts = products.filter((product, index) =>
    notFoundIndices.includes(index)
  );

  // Now, filteredProducts contains the products that were not found
  console.log(filteredProducts);
}

// Call the function to create product data
createProductData();
// filter();

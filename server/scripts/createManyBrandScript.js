const mongoose = require("mongoose");
const Brand = require("../models/BrandModel");
require("dotenv").config();

const brands = [
  {
    value: "Apple",
    label: "Apple",
    checked: false,
  },
  {
    value: "Samsung",
    label: "Samsung",
    checked: false,
  },
  {
    value: "OPPO",
    label: "Oppo",
    checked: false,
  },
  {
    value: "Huawei",
    label: "Huawei",
    checked: false,
  },
  {
    value: "Microsoft Surface",
    label: "Microsoft surface",
    checked: false,
  },
  {
    value: "Infinix",
    label: "Infinix",
    checked: false,
  },
  {
    value: "HP Pavilion",
    label: "Hp pavilion",
    checked: false,
  },
  {
    value: "Impression of Acqua Di Gio",
    label: "Impression of acqua di gio",
    checked: false,
  },
  {
    value: "Royal_Mirage",
    label: "Royal mirage",
    checked: false,
  },
  {
    value: "Fog Scent Xpressio",
    label: "Fog scent xpressio",
    checked: false,
  },
  {
    value: "Al Munakh",
    label: "Al munakh",
    checked: false,
  },
  {
    value: "Lord - Al-Rehab",
    label: "Lord   al rehab",
    checked: false,
  },
  {
    value: "L'Oreal Paris",
    label: "L'oreal paris",
    checked: false,
  },
  {
    value: "Hemani Tea",
    label: "Hemani tea",
    checked: false,
  },
  {
    value: "Dermive",
    label: "Dermive",
    checked: false,
  },
  {
    value: "ROREC White Rice",
    label: "Rorec white rice",
    checked: false,
  },
  {
    value: "Fair & Clear",
    label: "Fair & clear",
    checked: false,
  },
  {
    value: "Saaf & Khaas",
    label: "Saaf & khaas",
    checked: false,
  },
  {
    value: "Bake Parlor Big",
    label: "Bake parlor big",
    checked: false,
  },
  {
    value: "Baking Food Items",
    label: "Baking food items",
    checked: false,
  },
  {
    value: "fauji",
    label: "Fauji",
    checked: false,
  },
  {
    value: "Dry Rose",
    label: "Dry rose",
    checked: false,
  },
  {
    value: "Boho Decor",
    label: "Boho decor",
    checked: false,
  },
  {
    value: "Flying Wooden",
    label: "Flying wooden",
    checked: false,
  },
  {
    value: "LED Lights",
    label: "Led lights",
    checked: false,
  },
  {
    value: "luxury palace",
    label: "Luxury palace",
    checked: false,
  },
  {
    value: "Golden",
    label: "Golden",
    checked: false,
  },
  {
    value: "Furniture Bed Set",
    label: "Furniture bed set",
    checked: false,
  },
  {
    value: "Ratttan Outdoor",
    label: "Ratttan outdoor",
    checked: false,
  },
  {
    value: "Kitchen Shelf",
    label: "Kitchen shelf",
    checked: false,
  },
  {
    value: "Multi Purpose",
    label: "Multi purpose",
    checked: false,
  },
  {
    value: "AmnaMart",
    label: "Amnamart",
    checked: false,
  },
  {
    value: "Professional Wear",
    label: "Professional wear",
    checked: false,
  },
  {
    value: "Soft Cotton",
    label: "Soft cotton",
    checked: false,
  },
  {
    value: "Top Sweater",
    label: "Top sweater",
    checked: false,
  },
  {
    value: "RED MICKY MOUSE..",
    label: "Red micky mouse..",
    checked: false,
  },
  {
    value: "Digital Printed",
    label: "Digital printed",
    checked: false,
  },
  {
    value: "Ghazi Fabric",
    label: "Ghazi fabric",
    checked: false,
  },
  {
    value: "IELGY",
    label: "Ielgy",
    checked: false,
  },
  {
    value: "IELGY fashion",
    label: "Ielgy fashion",
    checked: false,
  },
  {
    value: "Synthetic Leather",
    label: "Synthetic leather",
    checked: false,
  },
  {
    value: "Sandals Flip Flops",
    label: "Sandals flip flops",
    checked: false,
  },
  {
    value: "Maasai Sandals",
    label: "Maasai sandals",
    checked: false,
  },
  {
    value: "Arrivals Genuine",
    label: "Arrivals genuine",
    checked: false,
  },
  {
    value: "Vintage Apparel",
    label: "Vintage apparel",
    checked: false,
  },
  {
    value: "FREE FIRE",
    label: "Free fire",
    checked: false,
  },
  {
    value: "The Warehouse",
    label: "The warehouse",
    checked: false,
  },
  {
    value: "Sneakers",
    label: "Sneakers",
    checked: false,
  },
  {
    value: "Rubber",
    label: "Rubber",
    checked: false,
  },
  {
    value: "Naviforce",
    label: "Naviforce",
    checked: false,
  },
  {
    value: "SKMEI 9117",
    label: "Skmei 9117",
    checked: false,
  },
  {
    value: "Strap Skeleton",
    label: "Strap skeleton",
    checked: false,
  },
  {
    value: "Stainless",
    label: "Stainless",
    checked: false,
  },
  {
    value: "Eastern Watches",
    label: "Eastern watches",
    checked: false,
  },
  {
    value: "Luxury Digital",
    label: "Luxury digital",
    checked: false,
  },
  {
    value: "Watch Pearls",
    label: "Watch pearls",
    checked: false,
  },
  {
    value: "Bracelet",
    label: "Bracelet",
    checked: false,
  },
  {
    value: "LouisWill",
    label: "Louiswill",
    checked: false,
  },
  {
    value: "Copenhagen Luxe",
    label: "Copenhagen luxe",
    checked: false,
  },
  {
    value: "Steal Frame",
    label: "Steal frame",
    checked: false,
  },
  {
    value: "Darojay",
    label: "Darojay",
    checked: false,
  },
  {
    value: "Fashion Jewellery",
    label: "Fashion jewellery",
    checked: false,
  },
  {
    value: "Cuff Butterfly",
    label: "Cuff butterfly",
    checked: false,
  },
  {
    value: "Designer Sun Glasses",
    label: "Designer sun glasses",
    checked: false,
  },
  {
    value: "mastar watch",
    label: "Mastar watch",
    checked: false,
  },
  {
    value: "Car Aux",
    label: "Car aux",
    checked: false,
  },
  {
    value: "W1209 DC12V",
    label: "W1209 dc12v",
    checked: false,
  },
  {
    value: "TC Reusable",
    label: "Tc reusable",
    checked: false,
  },
  {
    value: "Neon LED Light",
    label: "Neon led light",
    checked: false,
  },
  {
    value: "METRO 70cc Motorcycle - MR70",
    label: "Metro 70cc motorcycle   mr70",
    checked: false,
  },
  {
    value: "BRAVE BULL",
    label: "Brave bull",
    checked: false,
  },
  {
    value: "shock absorber",
    label: "Shock absorber",
    checked: false,
  },
  {
    value: "JIEPOLLY",
    label: "Jiepolly",
    checked: false,
  },
  {
    value: "Xiangle",
    label: "Xiangle",
    checked: false,
  },
  {
    value: "lightingbrilliance",
    label: "Lightingbrilliance",
    checked: false,
  },
  {
    value: "Ifei Home",
    label: "Ifei home",
    checked: false,
  },
  {
    value: "DADAWU",
    label: "Dadawu",
    checked: false,
  },
  {
    value: "YIOSI",
    label: "Yiosi",
    checked: false,
  },
];
function capitalizeFirstLetterEachWord(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// Function to extract labels and upload to MongoDB
async function uploadLabelsToMongoDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Delete all existing documents in the Category collection
    await Brand.deleteMany({});

    // Use map to transform the categories directly
    const labels = brands.map(({ label }) => ({
      label: capitalizeFirstLetterEachWord(label),
    }));

    function capitalizeFirstLetterEachWord(string) {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    // Use try-with-resources for MongoDB operations
    await Brand.create(labels);

    console.log("Labels uploaded to MongoDB successfully!");
  } catch (error) {
    console.error("Error uploading labels to MongoDB:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

// Call the function to upload labels
uploadLabelsToMongoDB();

const mongoose = require('mongoose');
require('dotenv').config();
const Tea = require('./models/Tea');

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tea_shop")
    .then(async () => {
        const teas = [
            {
                name: "HIMALAYAN SPRING | 100 GM | FIRST FLUSH LOOSE BLACK TEA",
                type: "Black",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Peach", "Floral", "Crisp"],
                description: "Handplucked in spring after 3-4 months of dormancy after winter.",
                brewingTemp: "195°F (90°C)",
                brewingTime: "3-4 minutes",
                price: 795,
                image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "SUMMER SOLSTICE MUSCATEL | 100 GM | SECOND FLUSH LOOSE BLACK TEA | TIN CADDY",
                type: "Black",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Muscatel", "Honey", "Robust"],
                description: "A profound summer flush offering the classic muscatel grape character synonymous with premium Darjeeling.",
                brewingTemp: "212°F (100°C)",
                brewingTime: "3-5 minutes",
                price: 775,
                image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "SPRINGTIME BLOOM | 100 GM | FIRST FLUSH BLACK LOOSE TEA | TIN CADDY",
                type: "Black",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Wildflowers", "Mellow", "Sweet"],
                description: "An early spring pluck showcasing a bright liquor and a beautiful bouquet of meadow flowers.",
                brewingTemp: "195°F (90°C)",
                brewingTime: "3 minutes",
                price: 775,
                image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "SILVER TIPS IMPERIAL | 50 GM | MASCULINE MUSCATEL OOLONG",
                type: "Oolong",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Muscatel", "Mango", "Smooth"],
                description: "The crown jewel of our estate, featuring prominent silver buds and an intoxicatingly fruity, smooth profile.",
                brewingTemp: "185°F (85°C)",
                brewingTime: "4 minutes",
                price: 1250,
                image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "AUTUMNAL DEW | 100 GM | ROASTED AUTUMN FLUSH",
                type: "Black",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Roasted Nuts", "Woodsy", "Warm"],
                description: "A deeply comforting autumn harvest with a roasted depth and a rich, amber infusion.",
                brewingTemp: "212°F (100°C)",
                brewingTime: "4-5 minutes",
                price: 650,
                image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "MOONLIGHT PLUCK | 50 GM | RARE WHITE TEA",
                type: "Herbal", // White tea mapped to herbal due to existing enum
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Honeydew", "Silver", "Delicate"],
                description: "Plucked entirely by moonlight, these delicate buds yield a profoundly subtle and pure cup.",
                brewingTemp: "175°F (80°C)",
                brewingTime: "2-3 minutes",
                price: 2100,
                image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80",
                featured: true
            },
            {
                name: "EMERALD GREEN | 100 GM | SPRING HARVEST GREEN TEA",
                type: "Green",
                origin: "Makaibari Tea Estate",
                flavorNotes: ["Fresh Grass", "Marine", "Clean"],
                description: "A vibrant, unoxidized green tea offering a crisp, clean cup full of spring vitality.",
                brewingTemp: "160°F (70°C)",
                brewingTime: "2-3 minutes",
                price: 550,
                image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
                featured: true
            }
        ];
        await Tea.deleteMany({});
        await Tea.insertMany(teas);
        console.log("Seed successful");
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

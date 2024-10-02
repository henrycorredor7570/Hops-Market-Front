const products = [
    {
        id:1,
        name:"Baptist",
        price: 6.3,
        image:"/src/assets/Cervezas/Baptist-IPA-300x300.png",
        stock:21
    },
    {
        id:2,
        name:"Delta",
        price: 7.9,
        image:"/src/assets/Cervezas/BBP-Delta-IPA-300x300.jpg",
        stock:32
    },
    {
        id:3,
        name:"Juice Junkie",
        price: 8.0,
        image:"/src/assets/Cervezas/BBP-Juice-Junkie-300x300.jpg.webp",
        stock:45
    },
    {
        id:4,
        name:"Jungle Joy",
        price: 6.1,
        image:"/src/assets/Cervezas/BBP-Jungle-Joy-300x300.jpg.webp",
        stock:34
    },
    {
        id:5,
        name:"Pico Bello",
        price: 6.0,
        image:"/src/assets/Cervezas/BBP-Pico-Bello-300x300.jpg.webp",
        stock:82
    },
    {
        id:6,
        name:"Wunder Lager",
        price: 3.3,
        image:"/src/assets/Cervezas/BBP-Wunder-Lager-300x300.jpg.webp",
        stock:27
    },
    {
        id:7,
        name:"Belgenius Haze",
        price: 8.0,
        image:"/src/assets/Cervezas/Belgenius-Belgian-Haze-IPA-Blond-33-300x300.jpg",
        stock:47
    },
    {
        id:8,
        name:"Belgenius Belgian",
        price: 6.3,
        image:"/src/assets/Cervezas/Belgenius-Double-Ipa-33-cl-Fles-300x300.jpg",
        stock:34
    },
    {
        id:9,
        name:"Belgian Coast",
        price: 6.7,
        image:"/src/assets/Cervezas/Belgian-coast-ipa-300x300.png.webp",
        stock:18
    },
    {
        id:10,
        name:"Belle Fleur",
        price: 9.1,
        image:"/src/assets/Cervezas/Belle-Fleur-300x300.png",
        stock:10
    },
    {
        id:11,
        name:"Bon Secours",
        price: 2.3,
        image:"/src/assets/Cervezas/Bon-Secours-4-Houblons-1-300x300.png.webp",
        stock:89
    },
    {
        id:12,
        name:"Broers",
        price: 9.9,
        image:"/src/assets/Cervezas/Broers-Dark-Saison-IPA-300x300.png.webp",
        stock:97
    },
    {
        id:13,
        name:"Crime Passionnel",
        price: 9.0,
        image:"/src/assets/Cervezas/Crime-Passionnel-300x300.png.webp",
        stock:94
    },
    {
        id:14,
        name:"Funkey Chicken",
        price: 8.3,
        image:"/src/assets/Cervezas/De-Keukenbrouwers-Hip-Hop-Funky-Chicken-300x300.jpg.webp",
        stock:22
    },
    {
        id:15,
        name:"Delirium",
        price: 6.3,
        image:"/src/assets/Cervezas/Delirium-Argentum-300x300.png.webp",
        stock:84
    },
    {
        id:16,
        name:"Houblon",
        price: 6.3,
        image:"/src/assets/Cervezas/De-Poes-Houblon-300x300.png",
        stock:20
    },
    {
        id:17,
        name:"Double-IPA",
        price: 7.4,
        image:"/src/assets/Cervezas/Double-IPA-300x300.png.webp",
        stock:72
    },
    {
        id:18,
        name:"Eilandje",
        price: 4.5,
        image:"/src/assets/Cervezas/Eilandje-300x300.jpg.webp",
        stock:45
    },
    {
        id:19,
        name:"El Dorado",
        price: 2.0,
        image:"/src/assets/Cervezas/El-Dorado-300x300.png.webp",
        stock:65
    },
    {
        id:20,
        name:"Enigma Hopnytized",
        price: 5.5,
        image:"/src/assets/Cervezas/Enigma-Hopnytized-New-England-IPA-300x300.png.webp",
        stock:43
    },
    {
        id:21,
        name:"Everyday",
        price: 4.5,
        image:"/src/assets/Cervezas/Everyday-IPA--300x300.png.webp",
        stock:56
    },
    {
        id:22,
        name:"Extase",
        price: 2.3,
        image:"/src/assets/Cervezas/Extase-300x300.png.webp",
        stock:76
    },
    {
        id:23,
        name:"Fris bie",
        price: 6.3,
        image:"/src/assets/Cervezas/Fris-bie-300x300.png.webp",
        stock:87
    },
    {
        id:24,
        name:"Galea",
        price: 8.3,
        image:"/src/assets/Cervezas/Galea-We-Meet-Again-in-Antwepren-1-300x300.png.webp",
        stock:43
    },
    {
        id:25,
        name:"Gouden Carolus",
        price: 7.3,
        image:"/src/assets/Cervezas/Gouden-Carolus-Hopsinjoor-300x300.png",
        stock:56
    },
    {
        id:26,
        name:"Hip Hop Alicious",
        price: 4.4,
        image:"/src/assets/Cervezas/Hip-Hop-Alicious-IPA-300x300.png.webp",
        stock:76
    },
    {
        id:27,
        name:"Hip Hop Double",
        price: 3.0,
        image:"/src/assets/Cervezas/Hip-Hop-Double-IPA-300x300.png.webp",
        stock:87
    },
    {
        id:28,
        name:"Hip Hop Milkshake",
        price: 9.4,
        image:"/src/assets/Cervezas/Hip-Hop-Milkshake-300x300.jpg.webp",
        stock:32
    },
    {
        id:29,
        name:"Hip Hop Orange",
        price: 7.4,
        image:"/src/assets/Cervezas/Hip-Hop-Orange-Crush-300x300.png.webp",
        stock:54
    },
    {
        id:30,
        name:"Hip Hop Purple",
        price: 3.2,
        image:"/src/assets/Cervezas/Hip-Hop-Purple-Haze-300x300.jpg.webp",
        stock:13
    },
    {
        id:31,
        name:"Hopnytized American",
        price: 6.0,
        image:"/src/assets/Cervezas/Hopnytized-American-IPA-300x300.png.webp",
        stock:53
    },
    {
        id:32,
        name:"Hopnytized DIPA",
        price: 6.3,
        image:"/src/assets/Cervezas/Hopnytized-DIPA-300x300.png.webp",
        stock:36
    },
    {
        id:33,
        name:"Hopnytized Milkshake",
        price: 4.0,
        image:"/src/assets/Cervezas/Hopnytized-Milkshake-IPA-300x300.png.webp",
        stock:24
    },
    {
        id:34,
        name:"Houblon Chouffe",
        price: 4.3,
        image:"/src/assets/Cervezas/houblon-chouffe-fles-300x300.jpg",
        stock:65
    },
    {
        id:35,
        name:"IPA MyAss",
        price: 3.0,
        image:"/src/assets/Cervezas/IPA-MyAss--300x300.png.webp",
        stock:75
    },
    {
        id:36,
        name:"IPK",
        price: 8.9,
        image:"/src/assets/Cervezas/IPK-300x300.png.webp",
        stock:86
    },
    {
        id:37,
        name:"Juigy blue",
        price: 4.7,
        image:"/src/assets/Cervezas/Juigy-blue-300x300.png.webp",
        stock:97
    },
    {
        id:38,
        name:"Kerel Grapefruit",
        price: 2.3,
        image:"/src/assets/Cervezas/Kerel-Grapefruit-IPA-300x300.png",
        stock:35
    },
    {
        id:39,
        name:"Kerel India",
        price: 6.4,
        image:"/src/assets/Cervezas/Kerel-India-Pale-Ale-1-300x300.png.webp",
        stock:36
    },
    {
        id:40,
        name:"Kill Destroy",
        price: 3.5,
        image:"/src/assets/Cervezas/Kill-Destroy-300x300.png.webp",
        stock:84
    },
    {
        id:41,
        name:"King Mule",
        price: 7.4,
        image:"/src/assets/Cervezas/King-Mule-IPA-300x300.png.webp",
        stock:98
    },
    {
        id:42,
        name:"Kiss My Neighbours",
        price: 2.6,
        image:"/src/assets/Cervezas/Kiss-My-Neighbours-Wife-300x300.png.webp",
        stock:53
    },
    {
        id:43,
        name:"Kveik",
        price: 8.5,
        image:"/src/assets/Cervezas/Kveik-IPA-300x300.png.webp",
        stock:64
    },
    {
        id:44,
        name:"Loemelaer",
        price: 4.7,
        image:"/src/assets/Cervezas/Loemelaer-IPA-1-300x300.png.webp",
        stock:75
    },
    {
        id:45,
        name:"Lupulin Monster",
        price: 2.3,
        image:"/src/assets/Cervezas/Lupulin-Monster-300x300.png.webp",
        stock:87
    },
    {
        id:46,
        name:"Ma Mere Speciale",
        price: 9.3,
        image:"/src/assets/Cervezas/Ma-Mere-Speciale--300x300.png.webp",
        stock:35
    },
    {
        id:47,
        name:"Hoppa Hontas",
        price: 3.7,
        image:"/src/assets/Cervezas/Maenhout-Hoppa-Hontas-v2-300x300.jpg",
        stock:35
    },
    {
        id:48,
        name:"MOPA",
        price: 7.3,
        image:"/src/assets/Cervezas/MOPA-300x300.png.webp",
        stock:65
    },
    {
        id:49,
        name:"Flierefluiter",
        price: 3.6,
        image:"/src/assets/Cervezas/ne-flierefluiter-hophophoera-300x300.jpg",
        stock:86
    },
    {
        id:50,
        name:"Oh My Dear",
        price: 7.4,
        image:"/src/assets/Cervezas/Oh-My-Dear--300x300.png.webp",
        stock:85
    },
    {
        id:51,
        name:"Passe Partout",
        price: 5.7,
        image:"/src/assets/Cervezas/Passe-Partout-300x300.png.webp",
        stock:35
    },
    {
        id:52,
        name:"Session",
        price: 4.4,
        image:"/src/assets/Cervezas/Session-IPA-300x300.png.webp",
        stock:75
    },
    {
        id:53,
        name:"Sloeber",
        price: 9.3,
        image:"/src/assets/Cervezas/sloeber-ipa-1-300x300.png",
        stock:35
    },
    {
        id:54,
        name:"Stout",
        price: 9.4,
        image:"/src/assets/Cervezas/Stout-IPA-300x300.png.webp",
        stock:46
    },
    {
        id:55,
        name:"Struise",
        price: 8.7,
        image:"/src/assets/Cervezas/Struise-Ignis-en-flamma-19-300x300.png.webp",
        stock:23
    },
    {
        id:56,
        name:"Thorberg",
        price: 7.4,
        image:"/src/assets/Cervezas/Thorberg-Five-Hop-300x300.jpg",
        stock:62
    },
    {
        id:57,
        name:"Tij Van de Duvel",
        price: 4.8,
        image:"/src/assets/Cervezas/tij-van-de-duvel--300x300.png",
        stock:22
    },
    {
        id:58,
        name:"Tripel",
        price: 4.6,
        image:"/src/assets/Cervezas/tripel-hop-cashmere-300x300.png",
        stock:78
    },
    {
        id:59,
        name:"Troubadour",
        price: 4.2,
        image:"/src/assets/Cervezas/troubadour-magma-300x300.jpg",
        stock:42
    },
    {
        id:60,
        name:"Troubadour Magma",
        price: 8.3,
        image:"/src/assets/Cervezas/Troubadour-Magma-Barrel-Aged--300x300.png.webp",
        stock:74
    },
    {
        id:61,
        name:"Troubadour Magma Indian",
        price: 8.6,
        image:"/src/assets/Cervezas/Troubadour-Magma-Indian-Summer--300x300.png.webp",
        stock:15
    },
    {
        id:62,
        name:"Vedett",
        price: 3.8,
        image:"/src/assets/Cervezas/Vedett-IPA-300x300.png.webp",
        stock:15
    },
    {
        id:63,
        name:"Viven Imperial",
        price: 2.7,
        image:"/src/assets/Cervezas/Viven-Imperial-IPA-300x300.png.webp",
        stock:63
    },
    {
        id:64,
        name:"Viven Master",
        price: 7.3,
        image:"/src/assets/Cervezas/Viven-Master-IPA-300x300.png.webp",
        stock:84
    },
    {
        id:65,
        name:"Viven Nada",
        price: 3.8,
        image:"/src/assets/Cervezas/Viven-Nada-300x300.png.webp",
        stock:62
    },
    {
        id:66,
        name:"When Life Gives",
        price: 2.8,
        image:"/src/assets/Cervezas/When-Life-Gives-You-Hop-300x300.png.webp",
        stock:25
    },
    {
        id:67,
        name:"Yellow stone",
        price: 3.6,
        image:"/src/assets/Cervezas/Yellow-stone-300x300.png.webp",
        stock:36
    },
    {
        id:68,
        name:"Hopnytized",
        price: 9.1,
        image:"/src/assets/Cervezas/Hopnytized-Milkshake-IPA-300x300.png.webp",
        stock:47
    },
    {
        id:69,
        name:"Juigy",
        price: 7.3,
        image:"/src/assets/Cervezas/Juigy-blue-300x300.png.webp",
        stock:74
    },
    {
        id:70,
        name:"Flamma",
        price: 7.2,
        image:"/src/assets/Cervezas/Struise-Ignis-en-flamma-19-300x300.png.webp",
        stock:96
    },
]

export default products ;
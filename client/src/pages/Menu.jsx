import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Menu.css';

const CATEGORIES = [
  { key: 'all', label: '🍽️ All', icon: '🍽️' },
  { key: 'breakfast', label: '🌅 Breakfast', icon: '🌅' },
  { key: 'lunch', label: '☀️ Lunch & Dinners', icon: '☀️' },
  { key: 'biryani', label: '🍚 Biryani', icon: '🍚' },
  { key: 'indochinese', label: '🥡 Indo-Chinese', icon: '🥡' },
  { key: 'american', label: '🍔 American', icon: '🍔' },
];

const ALL_ITEMS = [
  // BREAKFAST
  { id: 1, name: 'Idli (4 pcs)', description: 'Soft steamed rice cakes with sambar & chutney', price: 40, category: 'breakfast', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/09/60/38/77/360_F_960387714_vYtcaWwlILrM4LO79ObNCfnHkghFl2To.jpg' },
  { id: 2, name: 'Vada (3 pcs)', description: 'Crispy fried lentil donuts with sambar & coconut chutney', price: 35, category: 'breakfast', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/17/37/93/65/360_F_1737936551_QAH5lKw9C4s1jyjvxkwZnueJ6SX3vyPL.jpg' },
  { id: 3, name: 'Plain Dosa', description: 'Thin crispy rice crepe with sambar & chutney', price: 40, category: 'breakfast', isVeg: true, image_url: 'https://t3.ftcdn.net/jpg/01/86/33/72/360_F_186337209_9rbcMLu3wGCDNaEoK1jO0aNzb0pv7Xs7.jpg' },
  { id: 4, name: 'Masala Dosa', description: 'Crispy dosa stuffed with spiced potato filling including sambar & chutney', price: 40, category: 'breakfast', isVeg: true, image_url: 'https://www.shutterstock.com/image-photo/masala-dosa-south-indian-meal-260nw-1008673576.jpg' },
  { id: 5, name: 'Onion Dosa', description: 'Dosa topped with caramelized onions including sambar & chutney', price: 40, category: 'breakfast', isVeg: true, image_url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEEcCzNfurHhyFfno3XevO-4g8jp9Y8QTlWw6rlz-h52Yq615eQVHvInkr7P51MJ0iKvo4imhCrA0P3uCpx-sNjZOCbBPTWr6dfO3mO-QmTDKaGk-nmU0bcLdzIB6oXxrJGSvbT7ojQ0x8i48CaWmkD_LLP-bq6CCWQkEvhdauSweotPKIyXmQXnMWv7gV/w1280-h720-p-k-no-nu/1000454702.png' },
  { id: 6, name: 'Upma', description: 'Savory semolina porridge with vegetables', price: 30, category: 'breakfast', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/10/88/62/83/360_F_1088628359_6ZskzdYQNvfT1QICDXE0W9kpISi4kgS4.jpg' },
  { id: 7, name: 'Poori Bhaji', description: 'Deep fried bread with spiced potato curry', price: 30, category: 'breakfast', isVeg: true, image_url: 'https://www.shutterstock.com/image-photo/puri-bhaji-north-indian-poori-260nw-2118305552.jpg' },
  { id: 8, name: 'Pongal', description: 'Creamy rice and lentil porridge with ghee', price: 40, category: 'breakfast', isVeg: true, image_url: 'https://img.freepik.com/premium-photo/tasty-pongal-rice-indian-dish_787273-4710.jpg' },
  { id: 9, name: 'Aloo Paratha', description: 'Stuffed flatbread with spiced potato', price: 80, category: 'breakfast', isVeg: true, image_url: 'https://thumbs.dreamstime.com/b/aloo-paratha-indian-potato-stuffed-flatbread-butter-top-served-fresh-sweet-lassi-chutney-pickle-selective-focus-lassie-164213775.jpg' },
  { id: 10, name: 'Punugulu', description: 'Crispy deep-fried snack made from rice flour', price: 100, category: 'breakfast', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/18/73/88/89/360_F_1873888909_vcTPoIVzxWxPtBTIxog3DUnDymjMIXJQ.jpg' },
  { id: 11, name: 'Idli + Vada + Coffee Combo', description: '2 idlis, 2 vada and a hot coffee', price: 100, category: 'breakfast', isVeg: true, isCombo: true, image_url: 'https://static.vecteezy.com/system/resources/previews/071/459/741/large_2x/south-indian-breakfast-idli-vada-chutney-and-filter-coffee-free-photo.jpg' },
  { id: 12, name: 'Dosa + Vada + Idli Combo', description: 'Plain dosa with Vada and Idli', price: 110, category: 'breakfast', isVeg: true, isCombo: true, image_url: 'https://thumbs.dreamstime.com/b/south-indian-breakfast-idli-dosa-vada-chutney-sambhar-coconut-sambar-banana-leaf-tea-time-snack-171494128.jpg' },

  // LUNCH & DINNERS
  { id: 13, name: 'Veg Meals (Unlimited)', description: 'Full thali with rice, dal, sabzi, roti and papad', price: 150, category: 'lunch', isVeg: true, image_url: 'https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg' },
  { id: 14, name: 'Chicken Meals', description: 'Full thali with rice, chicken curry and roti', price: 220, category: 'lunch', isVeg: false, image_url: 'https://img.freepik.com/free-photo/indian-butter-chicken-black-bowl-wooden-table_123827-20633.jpg?semt=ais_incoming&w=740&q=80' },
  { id: 15, name: 'Mutton Meals', description: 'Full thali with rice, mutton curry', price: 280, category: 'lunch', isVeg: false, image_url: 'https://vantalupindivantalu.com/wp-content/uploads/2025/03/Bagara-rice-with-mutton-curry-Homemade-Telangana-Recipes-Online.jpg' },
  { id: 16, name: 'Curd Rice', description: 'Cooling rice mixed with yogurt and mustard tempering', price: 80, category: 'lunch', isVeg: true, image_url: 'https://cdn.prod.website-files.com/64931d2aee18510b47f4bb1f/65ca6181d5ded1d7f7b5b3d0_Curd-Rice-Pongal-Recipe-Cover-Image.jpg' },
  { id: 18, name: 'Paneer Butter Masala', description: 'Cottage cheese in rich creamy tomato gravy', price: 180, category: 'lunch', isVeg: true, image_url: 'https://www.theendlessmeal.com/wp-content/uploads/2021/06/Paneer-Butter-Masala-2-scaled.jpg' },
  { id: 19, name: 'Kadai Paneer', description: 'Paneer cooked with bell peppers and spices', price: 170, category: 'lunch', isVeg: true, image_url: 'https://static.wixstatic.com/media/2554b6_2f03777fc17342c3864afa6b15e24bd1~mv2.jpg/v1/fill/w_568,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2554b6_2f03777fc17342c3864afa6b15e24bd1~mv2.jpg' },
  { id: 20, name: 'Dal Tadka', description: 'Yellow lentils with smoky tempering of spices', price: 120, category: 'lunch', isVeg: true, image_url: 'https://www.shutterstock.com/image-photo/indian-dal-traditional-soup-lentils-600nw-1312092353.jpg' },
  { id: 21, name: 'Butter Chicken', description: 'Tender chicken in velvety butter tomato sauce', price: 220, category: 'lunch', isVeg: false, isChefSpecial: true, image_url: 'https://media.istockphoto.com/id/1411074630/photo/chicken-tikka-masala-spicy-curry-meat-food-butter-chicken-rice-and-naan-bread-on-red-vine.jpg?s=612x612&w=0&k=20&c=5jJQUjGyFWn85GEQiat7j7BIeh3QwB93Gi_EHG8g4t4=' },
  { id: 25, name: 'Butter Naan', description: 'Soft leavened bread brushed with butter (3 pcs)', price: 30, category: 'lunch', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/17/15/16/93/360_F_1715169355_cAjyCT1V26tJbHqmlqqXT8rKNgRvFiHk.jpg' },
  { id: 26, name: 'Garlic Naan', description: 'Naan topped with garlic and butter (3 pcs)', price: 50, category: 'lunch', isVeg: true, image_url: 'https://t4.ftcdn.net/jpg/12/47/82/11/360_F_1247821125_u3qsx1VlcApFJ9Z7MRg4cAlFlGdnIOf2.jpg' },
  { id: 27, name: 'Tandoori Roti', description: 'Whole wheat bread baked in tandoor (3 pcs)', price: 30, category: 'lunch', isVeg: true, image_url: 'https://www.shutterstock.com/image-photo/hot-crispy-north-indian-tandoori-600nw-2485391083.jpg' },
  { id: 28, name: 'Paratha', description: 'Flaky layered whole wheat flatbread (3 pcs)', price: 30, category: 'lunch', isVeg: true, image_url: 'https://cdn.create.vista.com/api/media/small/320124180/stock-photo-aloo-paratha-indian-potato-stuffed-flatbread-butter-top-served-fresh' },

  // BIRYANI
  { id: 33, name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables', price: 150, category: 'biryani', isVeg: true, image_url: 'https://t3.ftcdn.net/jpg/12/01/85/96/360_F_1201859641_7YGp6cKX1e9PVCbElNqtEK2VLAguJdtm.jpg' },
  { id: 34, name: 'Paneer Biryani', description: 'Aromatic biryani with cottage cheese', price: 180, category: 'biryani', isVeg: true, image_url: 'https://bitesofindiaevan.com/wp-content/uploads/2024/11/paneer-biryani.png' },
  { id: 35, name: 'Chicken Biryani', description: 'Classic Hyderabadi dum chicken biryani', price: 220, category: 'biryani', isVeg: false, isChefSpecial: true, image_url: 'https://png.pngtree.com/background/20250121/original/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-picture-image_15342026.jpg' },
  { id: 36, name: 'Mutton Biryani', description: 'Rich slow-cooked mutton biryani', price: 280, category: 'biryani', isVeg: false, image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20240328/pngtree-mutton-biryani-meal-in-a-plate-on-table-image_15645442.jpg' },
  { id: 37, name: 'Egg Biryani', description: 'Spiced biryani with boiled eggs', price: 160, category: 'biryani', isVeg: false, image_url: 'https://www.relishthebite.com/wp-content/uploads/2015/02/EGgBiryani-5_name.jpg' },

  // INDO-CHINESE
  { id: 29, name: 'Veg Manchurian', description: 'Crispy veggie balls in spicy Indo-Chinese sauce', price: 140, category: 'indochinese', isVeg: true, image_url: 'https://media.istockphoto.com/id/1208083887/photo/freshly-prepared-veg-manchurian-with-a-bowl-of-fried-rice.jpg?s=612x612&w=0&k=20&c=nTtgKk-SSQAh1E0Pz8SnpGjqMRSIIXM6XiDHIsd5LDQ=' },
  { id: 30, name: 'Paneer 65', description: 'Spicy deep-fried paneer cubes', price: 180, category: 'indochinese', isVeg: true, image_url: 'https://www.dwarakaorganic.com/wp-content/uploads/2025/10/Paneer-65.jpg' },
  { id: 31, name: 'Chicken 65', description: 'Spicy crispy fried chicken', price: 190, category: 'indochinese', isVeg: false, image_url: 'https://thumbs.dreamstime.com/b/crispy-chicken-fiery-red-spices-bold-flavors-perfect-crunch-classic-south-indian-dish-featuring-deep-fried-pieces-367422399.jpg' },
  { id: 32, name: 'Chilli Chicken', description: 'Stir-fried chicken with peppers in spicy sauce', price: 200, category: 'indochinese', isVeg: false, image_url: 'https://png.pngtree.com/background/20250128/original/pngtree-indian-chilli-chicken-dry-served-in-a-plate-over-moody-background-picture-image_15312212.jpg' },

  // AMERICAN - BURGERS
  { id: 40, name: 'Classic Veg Burger', description: 'Crispy veggie patty with fresh lettuce, tomato & cheese in a toasted bun', price: 120, category: 'american', isVeg: true, subCategory: '🍔 Burgers', image_url: 'https://pforpizza.in/wp-content/uploads/2024/01/big-burger-stuffed-with-chicken-meat-salad-wooden-board-min-scaled.jpg' },
  { id: 41, name: 'Cheese Veg Burger', description: 'Double cheese slice with juicy veggie patty & special burger sauce', price: 140, category: 'american', isVeg: true, subCategory: '🍔 Burgers', image_url: 'https://i.pinimg.com/736x/75/bb/bb/75bbbb36ed0002e96dcca2475ec48664.jpg' },
  { id: 42, name: 'Chicken Burger', description: 'Crispy fried chicken fillet with coleslaw and mayo in a sesame bun', price: 160, category: 'american', isVeg: false, subCategory: '🍔 Burgers', image_url: 'https://www.shutterstock.com/image-photo/gourmet-chicken-burger-cheese-veggies-600nw-2451376477.jpg' },
  { id: 43, name: 'Double Patty ChickenBurger', description: 'Two juicy chicken patties with double cheese & caramelized onions', price: 200, category: 'american', isVeg: false, isChefSpecial: true, subCategory: '🍔 Burgers', image_url: 'https://thumbs.dreamstime.com/b/yummy-grilled-chicken-burger-double-cutlet-cheese-wooden-table-copy-space-hamburger-fast-food-concept-yummy-grilled-211508311.jpg' },

  // AMERICAN - PIZZA
  { id: 44, name: 'Margherita Pizza', description: 'Classic tomato base with fresh mozzarella and basil', price: 180, category: 'american', isVeg: true, subCategory: '🍕 Pizza', image_url: 'https://t3.ftcdn.net/jpg/04/44/86/70/360_F_444867086_79U7yvSiS6LaEWo8nN0ZYX8CJ7NhvhJh.jpg' },
  { id: 45, name: 'Farmhouse Pizza', description: 'Loaded with capsicum, onions, mushrooms & sweet corn', price: 220, category: 'american', isVeg: true, subCategory: '🍕 Pizza', image_url: 'https://rahicafe.com/wp-content/uploads/2022/03/pizza-farm-house.jpg' },
  { id: 46, name: 'Paneer Pizza', description: 'Loaded with paneer, capsicum, onions and mushrooms', price: 260, category: 'american', isVeg: false, subCategory: '🍕 Pizza', image_url: 'https://i.pinimg.com/736x/ff/b8/e8/ffb8e8c94bf6210bf383e050520b00cf.jpg' },
  { id: 47, name: 'BBQ Chicken Pizza', description: 'Smoky BBQ chicken with onions, peppers and mozzarella', price: 280, category: 'american', isVeg: false, isChefSpecial: true, subCategory: '🍕 Pizza', image_url: 'https://static.standard.co.uk/2023/05/22/12/newFile-7.jpg?width=1200' },

  // AMERICAN - SIDES
  { id: 48, name: 'French Fries', description: 'Golden crispy fries with ketchup dip', price: 90, category: 'american', isVeg: true, subCategory: '🍟 Sides', image_url: 'https://i.pinimg.com/236x/51/30/2e/51302ec5fbd95944281940debf39e79b.jpg' },
  { id: 49, name: 'Peri Peri Fries', description: 'Crispy fries tossed in spicy peri peri seasoning', price: 110, category: 'american', isVeg: true, isSpicy: true, subCategory: '🍟 Sides', image_url: 'https://vanlavino.com/wp-content/uploads/2025/01/basket-sweet-spicy-fries-scaled.jpg' },
  { id: 50, name: 'Chicken Nuggets (6 pcs)', description: 'Crispy golden chicken nuggets with dipping sauce', price: 150, category: 'american', isVeg: false, subCategory: '🍟 Sides', image_url: 'https://img.freepik.com/premium-photo/delicious-chicken-nugget-with-sauce-recipe-aesthetic-background_636537-293080.jpg' },
  { id: 51, name: 'Mozzarella Sticks', description: 'Crispy breaded mozzarella with marinara dipping sauce', price: 160, category: 'american', isVeg: true, subCategory: '🍟 Sides', image_url: 'https://i.pinimg.com/736x/19/46/e3/1946e31507474a1b947f5a3fa129e256.jpg' },

  // AMERICAN - OTHERS
  { id: 52, name: 'Chicken Hot Dog', description: 'Crispy chicken sausage in a toasted bun with mustard and ketchup', price: 140, category: 'american', isVeg: false, subCategory: '🌭 Others', image_url: 'https://i.pinimg.com/736x/19/46/e3/1946e31507474a1b947f5a3fa129e256.jpg' },
  { id: 53, name: 'Grilled Sandwich', description: 'Toasted sandwich with veggies, cheese and herb mayo', price: 130, category: 'american', isVeg: true, subCategory: '🌭 Others', image_url: 'https://i.pinimg.com/736x/18/0b/4a/180b4a8cdc19f5ed90caee9882a0837d.jpg' },
  { id: 54, name: 'Club Sandwich', description: 'Triple-decker with chicken, egg, lettuce, tomato & mayo', price: 180, category: 'american', isVeg: false, subCategory: '🌭 Others', image_url: 'https://t4.ftcdn.net/jpg/02/58/91/65/360_F_258916556_B6oirjJOKQkaxs39KPi9wjf9ePlT7zF8.jpg' },

  // AMERICAN - BEVERAGES
  { id: 55, name: 'Soft Drinks', description: 'Diet Coke / Chilled Pepsi / 7Up / Mirinda /Coke / Sprite / Thums Up of your choice', price: 40, category: 'american', isVeg: true, subCategory: '🥤 Beverages', image_url: 'https://thumbs.dreamstime.com/b/products-popular-global-soft-drink-brands-poznan-pol-oct-344374847.jpg' },
  { id: 56, name: 'Cold Coffee', description: 'Chilled blended coffee with milk and ice', price: 90, category: 'american', isVeg: true, subCategory: '🥤 Beverages', image_url: 'https://img.freepik.com/premium-photo/iced-coffee-with-whipped-cream-caramel-topping-black-background_934652-2881.jpg?w=360' },
  { id: 57, name: 'Milkshakes', description: 'Thick creamy milkshake — Chocolate, Vanilla or Strawberry of your choice ', price: 120, category: 'american', isVeg: true, subCategory: '🥤 Beverages', image_url: 'https://cdn2.hubspot.net/hubfs/358358/13512111_1192999890731687_7672300692946110901_n.jpg' },
  { id: 58, name: 'Fresh Lime Soda', description: 'Refreshing lime soda — sweet, salted or mixed', price: 50, category: 'american', isVeg: true, subCategory: '🥤 Beverages', image_url: 'https://img.freepik.com/free-photo/fresh-lime-drinks-macro-shot_53876-42483.jpg?w=360' },

  // AMERICAN - DESSERTS
  { id: 59, name: 'Brownie with Ice Cream', description: 'Warm chocolate brownie topped with vanilla ice cream', price: 140, category: 'american', isVeg: true, isChefSpecial: true, subCategory: '🍰 Desserts', image_url: 'https://www.shutterstock.com/image-photo/rich-brownie-topped-scoop-vanilla-600nw-2627792239.jpg' },
  { id: 60, name: 'Ice Cream Sundae', description: 'Scoops of ice cream with hot fudge, nuts & cherry on top', price: 120, category: 'american', isVeg: true, subCategory: '🍰 Desserts', image_url: 'https://i.pinimg.com/736x/f6/38/87/f638877241034ee6c6fceff9d27f32b5.jpg' },
  { id: 61, name: 'Pancakes with Syrup', description: 'Fluffy buttermilk pancakes drizzled with maple syrup', price: 160, category: 'american', isVeg: true, subCategory: '🍰 Desserts', image_url: 'https://cdn.nutritioninthekitch.com/wp-content/uploads/2019/04/buckwheat_pancakes-2-680x915.jpg' },

  // AMERICAN - COMBOS
  { id: 62, name: 'Burger + Fries + Drink Combo', description: 'Any burger with french fries and a soft drink', price: 220, category: 'american', isVeg: true, isCombo: true, subCategory: '🎁 Combo Offers', image_url: 'https://media.istockphoto.com/id/1473452859/photo/tasty-cheeseburger-glass-of-cola-and-french-fries-on-wooden-tray-close-up.jpg?s=612x612&w=0&k=20&c=QLq7mv50xRL-LSfLYgUwNHsHm8Ri5nWrIdNwQL0qCqc=' },
  { id: 63, name: 'Pizza + Drink Combo', description: 'Any 7-inch pizza with a chilled soft drink', price: 200, category: 'american', isVeg: true, isCombo: true, subCategory: '🎁 Combo Offers', image_url: 'https://ideogram.ai/assets/progressive-image/balanced/response/l3pcSvyoRgSfp1qFNTTncA' },
  { id: 64, name: 'Nuggets + Fries + Drink Combo', description: '6 chicken nuggets with peri peri fries and cold coffee', price: 280, category: 'american', isVeg: false, isCombo: true, subCategory: '🎁 Combo Offers', image_url: 'https://img.freepik.com/premium-photo/fast-food-combo-nuggets-fries-soft-drink-restaurant-table_693425-95456.jpg?semt=ais_incoming&w=740&q=80' },
];

const DIET_FILTERS = [
  { key: 'all', label: '🍽️ All' },
  { key: 'veg', label: '🟢 Veg' },
  { key: 'nonveg', label: '🔴 Non-Veg' },
  { key: 'spicy', label: '🌶️ Spicy' },
  { key: 'chef', label: '👨‍🍳 Chef\'s Special' },
  { key: 'combo', label: '🎁 Combo Deals' },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const { addToCart, setIsOpen } = useCart();

  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    const filtered = category !== 'all'
      ? ALL_ITEMS.filter(i => i.category === category)
      : ALL_ITEMS;
    setItems(filtered);
    setLoading(false);
  }, [category]);

  const applyFilters = (list) => {
    let result = list;
    if (search) {
      result = result.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (dietFilter === 'veg') result = result.filter(i => i.isVeg);
    if (dietFilter === 'nonveg') result = result.filter(i => !i.isVeg);
    if (dietFilter === 'spicy') result = result.filter(i => i.isSpicy);
    if (dietFilter === 'chef') result = result.filter(i => i.isChefSpecial);
    if (dietFilter === 'combo') result = result.filter(i => i.isCombo);
    return result;
  };

  const filtered = applyFilters(items);

  // Group by category for "All" view
  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const catItems = filtered.filter(i => i.category === cat.key);
    if (catItems.length > 0) acc[cat.key] = catItems;
    return acc;
  }, {});

  // Group American items by subCategory
  const americanGrouped = (itemList) => {
    return itemList.reduce((acc, item) => {
      const sub = item.subCategory || 'Other';
      if (!acc[sub]) acc[sub] = [];
      acc[sub].push(item);
      return acc;
    }, {});
  };

  const handleAdd = (item) => {
    addToCart(item);
    toast.success(`${item.name} added!`);
    setIsOpen(true);
  };

  const renderGrid = (itemList) => {
    if (category === 'american' || itemList.some(i => i.subCategory)) {
      const grouped = americanGrouped(itemList);
      return Object.entries(grouped).map(([sub, subItems]) => (
        <div key={sub} className="cat-section">
          <div className="cat-header">
            <h2 className="cat-title">{sub}</h2>
            <div className="cat-divider" />
          </div>
          <div className="menu-grid">
            {subItems.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
          </div>
        </div>
      ));
    }
    return (
      <div className="menu-grid">
        {itemList.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
      </div>
    );
  };

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="container">
          <span className="section-label">🍛 Our Kitchen</span>
          <h1>The Menu</h1>
          <p>Authentic Indian flavors crafted with love</p>
        </div>
      </div>

      <div className="container">
        {/* Category Tabs */}
        <div className="menu-controls">
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                className={`cat-tab ${category === c.key ? 'active' : ''}`}
                onClick={() => { setSearchParams(c.key !== 'all' ? { category: c.key } : {}); setDietFilter('all'); }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="menu-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'none', border: 'none', boxShadow: 'none', padding: '0' }}
            />
          </div>
        </div>

        {/* Diet / Special Filters */}
        <div className="diet-filter-bar">
          {DIET_FILTERS.map(f => (
            <button
              key={f.key}
              className={`diet-btn ${dietFilter === f.key ? 'active' : ''}`}
              onClick={() => setDietFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Chef's Special Banner */}
        {dietFilter === 'chef' && (
          <div className="chef-banner">
            <span>👨‍🍳</span>
            <div>
              <strong>Chef's Special Picks</strong>
              <p>Handpicked by our chef for an unforgettable experience</p>
            </div>
          </div>
        )}

        {/* Combo Banner */}
        {dietFilter === 'combo' && (
          <div className="combo-banner">
            <span>🎁</span>
            <div>
              <strong>Combo Deals — Save More!</strong>
              <p>Best value meals bundled together for you</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="menu-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="menu-card skeleton" style={{ height: 300 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 48 }}>🍽️</div>
            <h3>No dishes found</h3>
            <p>Try a different search or filter</p>
          </div>
        ) : category === 'all' ? (
          Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} className="cat-section">
              <div className="cat-header">
                <h2 className="cat-title">{CATEGORIES.find(c => c.key === cat)?.label}</h2>
                <div className="cat-divider" />
              </div>
              <div className="menu-grid">
                {catItems.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </div>
          ))
        ) : (
          renderGrid(filtered)
        )}
      </div>
    </div>
  );
}

function MenuCard({ item, onAdd }) {
  return (
    <div className={`menu-card ${item.isChefSpecial ? 'chef-special-card' : ''} ${item.isCombo ? 'combo-card' : ''}`}>
      <div className="menu-card-img">
        <img src={item.image_url} alt={item.name}
          onError={e => e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'} />
        <span className="menu-cat-badge">{item.category}</span>

        {/* Veg / Non-Veg indicator */}
        <span className={`veg-indicator ${item.isVeg ? 'veg' : 'nonveg'}`}>
          {item.isVeg ? '🟢' : '🔴'}
        </span>

        {/* Badges */}
        {item.isChefSpecial && <span className="badge chef-badge">👨‍🍳 Chef's Special</span>}
        {item.isCombo && <span className="badge combo-badge">🎁 Combo</span>}
        {item.isSpicy && <span className="badge spicy-badge">🌶️ Spicy</span>}
      </div>
      <div className="menu-card-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          <span className="menu-price">₹{item.price}</span>
          <button className="add-btn" onClick={() => onAdd(item)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

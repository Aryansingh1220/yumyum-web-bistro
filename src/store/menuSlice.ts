import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
  isSpecial?: boolean;
  allergens?: string[];
}

interface MenuState {
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: MenuState = {
  items: [
    {
      id: '1',
      name: 'Truffle Risotto',
      description: 'Creamy Arborio rice cooked with wild mushrooms and finished with truffle oil',
      price: 18.99,
      image: '/images/menu/truffle-risotto.jpg',
      category: 'main',
      isSpecial: true,
      allergens: ['dairy', 'mushrooms'],
    },
    {
      id: '2',
      name: 'Beef Carpaccio',
      description: 'Thinly sliced raw beef with arugula, capers, and parmesan',
      price: 12.99,
      image: '/images/menu/beef-carpaccio.jpg',
      category: 'appetizer',
      allergens: ['beef', 'dairy'],
    },
    {
      id: '3',
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla ice cream',
      price: 9.99,
      image: '/images/menu/chocolate-souffle.jpg',
      category: 'dessert',
      allergens: ['dairy', 'eggs', 'gluten'],
    },
    {
      id: '4',
      name: 'Signature Martini',
      description: 'Our signature martini with premium vodka and a twist of lemon',
      price: 12.99,
      image: '/images/menu/signature-martini.jpg',
      category: 'drink',
    },
    {
      id: '5',
      name: 'Seared Scallops',
      description: 'Fresh scallops seared to perfection with a citrus beurre blanc',
      price: 24.99,
      image: '/images/menu/seared-scallops.jpg',
      category: 'main',
      isSpecial: true,
      allergens: ['shellfish', 'dairy'],
    },
    {
      id: '6',
      name: 'Artisan Cheese Plate',
      description: 'Selection of fine cheeses with honey, nuts, and artisan crackers',
      price: 16.99,
      image: '/images/menu/artisan-cheese-plate.jpg',
      category: 'appetizer',
      allergens: ['dairy', 'nuts', 'gluten'],
    },
    // Adding new items
    {
      id: '9',
      name: 'Pan-Seared Salmon',
      description: 'Fresh Atlantic salmon with lemon herb butter sauce and seasonal vegetables',
      price: 26.99,
      image: '/images/menu/pan-seared-salmon.jpg',
      category: 'main',
      allergens: ['fish', 'dairy'],
    },
    {
      id: '10',
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil with balsamic reduction',
      price: 11.99,
      image: '/images/menu/caprese-salad.jpg',
      category: 'appetizer',
      allergens: ['dairy'],
    },
    {
      id: '11',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
      price: 8.99,
      image: '/images/menu/tiramisu.jpg',
      category: 'dessert',
      allergens: ['dairy', 'eggs', 'gluten'],
    },
    {
      id: '12',
      name: 'Craft Old Fashioned',
      description: 'Premium bourbon with aromatic bitters and a touch of maple syrup',
      price: 14.99,
      image: '/images/menu/craft-old-fashioned.jpg',
      category: 'drink',
    },
    {
      id: '13',
      name: 'Grilled Octopus',
      description: 'Tender octopus with olive oil, lemon, and Mediterranean herbs',
      price: 19.99,
      image: '/images/menu/grilled-octopus.jpg',
      category: 'appetizer',
      allergens: ['seafood'],
    },
    {
      id: '14',
      name: 'Classic Mojito',
      description: 'Fresh mint, lime, rum, and soda water',
      price: 11.99,
      image: '/images/menu/classic-mojito.jpg',
      category: 'drink',
    },
    {
      id: '15',
      name: 'New York Cheesecake',
      description: 'Rich and creamy cheesecake with berry compote',
      price: 9.99,
      image: '/images/menu/new-york-cheesecake.jpg',
      category: 'dessert',
      allergens: ['dairy', 'eggs', 'gluten'],
    }
  ],
  categories: ['appetizer', 'main', 'dessert', 'drink'],
  isLoading: false,
  error: null
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setMenuItems, 
  addMenuItem, 
  updateMenuItem, 
  removeMenuItem, 
  setLoading, 
  setError 
} = menuSlice.actions;
export default menuSlice.reducer;

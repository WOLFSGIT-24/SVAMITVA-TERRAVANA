import { create } from 'zustand';

export interface CartItem {
  id: string;
  collectionId: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface AddToCartInput {
  collectionId: string;
  itemId: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  addingItemId: string | null;
  isCheckingOut: boolean;
  error: string | null;
}

interface CartActions {
  addToCart: (input: AddToCartInput) => Promise<void>;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

type CartStore = CartState & { actions: CartActions };

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  isLoading: false,
  addingItemId: null,
  isCheckingOut: false,
  error: null,

  actions: {
    addToCart: async (input) => {
      set({ addingItemId: input.itemId });
      // No ecommerce provider — stub
      console.warn('addToCart: ecommerce provider not configured.');
      set({ addingItemId: null });
    },

    removeFromCart: (item) => {
      set((state) => ({ items: state.items.filter((i) => i.id !== item.id) }));
    },

    updateQuantity: (item, quantity) => {
      if (quantity <= 0) {
        set((state) => ({ items: state.items.filter((i) => i.id !== item.id) }));
      } else {
        set((state) => ({
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity } : i)),
        }));
      }
    },

    clearCart: () => set({ items: [] }),

    checkout: async () => {
      console.warn('checkout: ecommerce provider not configured.');
    },

    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    openCart:   () => set({ isOpen: true }),
    closeCart:  () => set({ isOpen: false }),
  },
}));

export const useCart = () => {
  const store = useCartStore();
  const itemCount  = store.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    items: store.items,
    itemCount,
    totalPrice,
    isOpen: store.isOpen,
    isLoading: store.isLoading,
    addingItemId: store.addingItemId,
    isCheckingOut: store.isCheckingOut,
    error: store.error,
    actions: store.actions,
  };
};

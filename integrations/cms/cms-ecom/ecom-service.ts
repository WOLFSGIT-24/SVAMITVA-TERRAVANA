// Wix ecom removed — stub buyNow that logs a warning
export async function buyNow(
  _items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  console.warn('buyNow: ecommerce provider not configured.');
}

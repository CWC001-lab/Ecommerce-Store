"use client"

import { useState, useEffect } from "react"
import { Product, Size, Color } from "@/types"
import Button from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from "@/components/ui/modal"
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface SelectedVariant {
  variant: Product;
  quantity: number;
}

interface VariantSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variants: Product[];
  onAddToCart: (variants: SelectedVariant[]) => void;
  isInCart: boolean;
  onRemoveFromCart: () => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  isOpen,
  onClose,
  product,
  variants,
  onAddToCart,
  isInCart,
  onRemoveFromCart
}) => {
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selections, setSelections] = useState<SelectedVariant[]>([]);

  // Initialize with the main product or first variant
  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
      setSelectedSize(variants[0].size.id);
      setSelectedColor(variants[0].color.id);
    } else {
      setSelectedVariant(product);
      setSelectedSize(product.size.id);
      setSelectedColor(product.color.id);
    }
  }, [product, variants]);

  // Update selected variant when size or color changes
  useEffect(() => {
    if (selectedSize && selectedColor) {
      const variant = variants.find(v => 
        v.size.id === selectedSize && v.color.id === selectedColor
      );
      if (variant) {
        setSelectedVariant(variant);
      } else {
        // If exact combination doesn't exist, try to find the closest match
        // First try with the selected color and any size
        const colorVariant = variants.find(v => v.color.id === selectedColor);
        if (colorVariant) {
          setSelectedVariant(colorVariant);
          setSelectedSize(colorVariant.size.id);
        } else {
          // If color doesn't exist, try with the selected size and any color
          const sizeVariant = variants.find(v => v.size.id === selectedSize);
          if (sizeVariant) {
            setSelectedVariant(sizeVariant);
            setSelectedColor(sizeVariant.color.id);
          }
        }
      }
    }
  }, [selectedSize, selectedColor, variants]);

  const handleAddToSelection = () => {
    if (selectedVariant) {
      const existingSelection = selections.find(s => s.variant.id === selectedVariant.id);
      
      if (existingSelection) {
        // Update quantity if variant already selected
        setSelections(selections.map(s => 
          s.variant.id === selectedVariant.id 
            ? { ...s, quantity: s.quantity + quantity }
            : s
        ));
        toast.success(`Updated quantity for ${selectedVariant.color.name} ${selectedVariant.size.name}`);
      } else {
        // Add new selection
        setSelections([...selections, { variant: selectedVariant, quantity }]);
        toast.success(`Added ${selectedVariant.color.name} ${selectedVariant.size.name} to selection`);
      }
      
      // Reset quantity to 1 for next selection
      setQuantity(1);
    }
  };

  const handleRemoveFromSelection = (variantId: string) => {
    setSelections(selections.filter(s => s.variant.id !== variantId));
    toast.success("Removed from selection");
  };

  const handleContinueToCart = () => {
    if (selections.length > 0) {
      onAddToCart(selections);
      onClose();
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart();
    onClose();
  };

  // Get unique sizes and colors from variants
  const availableSizes = Array.from(new Set(variants.map(v => v.size.id)))
    .map(id => variants.find(v => v.size.id === id)?.size)
    .filter(Boolean) as Size[];

  const availableColors = Array.from(new Set(variants.map(v => v.color.id)))
    .map(id => variants.find(v => v.color.id === id)?.color)
    .filter(Boolean) as Color[];

  // Helper functions to check availability
  const isSizeAvailable = (sizeId: string) => {
    return variants.some(v => v.size.id === sizeId);
  };

  const isColorAvailable = (colorId: string) => {
    return variants.some(v => v.color.id === colorId);
  };

  const isCombinationAvailable = (sizeId: string, colorId: string) => {
    return variants.some(v => v.size.id === sizeId && v.color.id === colorId);
  };

  const getAvailableColorsForSize = (sizeId: string) => {
    return variants
      .filter(v => v.size.id === sizeId)
      .map(v => v.color)
      .filter((color, index, self) => self.findIndex(c => c.id === color.id) === index);
  };

  const getAvailableSizesForColor = (colorId: string) => {
    return variants
      .filter(v => v.color.id === colorId)
      .map(v => v.size)
      .filter((size, index, self) => self.findIndex(s => s.id === size.id) === index);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-none sm:rounded-2xl shadow-lg overflow-hidden h-full sm:h-auto max-h-screen sm:max-h-[90vh] flex flex-col">
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Product Info */}
          <div className="text-center border-b border-gray-200 dark:border-slate-700 pb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">Choose Your Style</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Select size and color options</p>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 px-2">{product.name}</h3>
            {selectedVariant && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ₦{parseFloat(selectedVariant.price).toLocaleString()}
                </span>
                {availableSizes.length > 1 || availableColors.length > 1 ? (
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                    {availableSizes.length * availableColors.length} options
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Size Selection */}
          {availableSizes.length > 1 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Size
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2">
                {availableSizes.map((size) => {
                  const isExactMatch = selectedColor && isCombinationAvailable(size.id, selectedColor);
                  
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`px-3 py-3 sm:py-2 rounded-lg border transition-all duration-200 font-medium text-sm touch-manipulation min-h-[44px] sm:min-h-0 ${
                        selectedSize === size.id
                          ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : isExactMatch
                          ? 'border-gray-400 dark:border-slate-500 bg-gray-50 dark:bg-slate-600 text-gray-800 dark:text-gray-200'
                          : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800'
                      }`}
                    >
                    {size.name}
                      {isExactMatch && selectedColor && (
                        <span className="ml-1 text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {availableColors.length > 1 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Color
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableColors.map((color) => {
                  const isExactMatch = selectedSize && isCombinationAvailable(selectedSize, color.id);
                  
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative px-3 py-3 sm:py-2 rounded-lg border transition-all duration-200 font-medium text-sm touch-manipulation min-h-[44px] sm:min-h-0 ${
                        selectedColor === color.id
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-slate-600'
                          : isExactMatch
                          ? 'border-gray-400 dark:border-slate-500 bg-gray-50 dark:bg-slate-600 text-gray-800 dark:text-gray-200'
                          : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <div 
                          className="w-4 h-4 sm:w-3 sm:h-3 rounded-full border border-gray-300 flex-shrink-0"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs sm:text-xs truncate">{color.name}</span>
                        {isExactMatch && selectedSize && (
                          <span className="text-xs flex-shrink-0">✓</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Helpful Message */}
          {(selectedSize || selectedColor) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Options with ✓ are exact matches. You can select any combination - we&apos;ll find the best available match for you.
              </p>
            </div>
          )}

          {/* Selected Variant Summary */}
          {selectedVariant && (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Size:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedVariant.size.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Color:</span>
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: selectedVariant.color.value }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{selectedVariant.color.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ₦{parseFloat(selectedVariant.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          {selectedVariant && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-x-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                  <button
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[48px] sm:min-h-0"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors text-slate-700 dark:text-slate-300 touch-manipulation min-h-[48px] sm:min-h-0"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              {quantity > 1 && (
                <div className="text-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total: ₦{(parseFloat(selectedVariant.price) * quantity).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* No Combination Available Message */}
          {selectedSize && selectedColor && !selectedVariant && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ This exact combination isn&apos;t available, but we&apos;ll find the closest match when you add to cart.
              </p>
            </div>
          )}

          {/* Selection List */}
          {selections.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Selections ({selections.length})
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selections.map((selection) => (
                  <div key={selection.variant.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: selection.variant.color.value }}
                      />
                      <div className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selection.variant.color.name} {selection.variant.size.name}
                        </span>
                        <div className="text-gray-500 dark:text-gray-400">
                          Qty: {selection.quantity} × ₦{parseFloat(selection.variant.price).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromSelection(selection.variant.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Total: ₦{selections.reduce((total, s) => total + (parseFloat(s.variant.price) * s.quantity), 0).toLocaleString()}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 pb-2 sm:pb-0">
            {isInCart ? (
              <Button 
                onClick={handleRemoveFromCart}
                className="flex-1 py-4 sm:py-3 text-base font-medium rounded-lg bg-gray-600 hover:bg-gray-700 text-white border-transparent touch-manipulation min-h-[48px] sm:min-h-0"
              >
                <Minus className="mr-2 h-4 w-4" />
                Remove from Cart
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleAddToSelection}
                  disabled={!selectedVariant}
                  className="flex-1 py-4 sm:py-3 text-base font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 disabled:text-gray-500 border-transparent touch-manipulation min-h-[48px] sm:min-h-0"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Selection
                </Button>
                {selections.length > 0 && (
                  <Button 
                    onClick={handleContinueToCart}
                    className="flex-1 py-4 sm:py-3 text-base font-medium rounded-lg bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent touch-manipulation min-h-[48px] sm:min-h-0"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Continue to Cart
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

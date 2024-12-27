import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  featured?: boolean;
  customizationGroups?: Array<{
    id: string;
    name: string;
    type: "single" | "multiple";
    required: boolean;
    options: Array<{
      id: string;
      name: string;
      price: number;
      available: boolean;
    }>;
  }>;
}

interface Special {
  id: string;
  title: string;
  description: string;
  discount: number;
}

interface StorePreviewProps {
  storeName?: string;
  rating?: number;
  isOpen?: boolean;
  address?: string;
  items?: MenuItem[];
  specials?: Special[];
}

const StorePreview = ({
  storeName = "Next Corner Plus",
  rating = 4.8,
  isOpen = true,
  address = "123 Food Truck Lane",
  items = [
    {
      id: "1",
      name: "Classic Burger",
      price: 9.99,
      description:
        "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop",
      featured: true,
      customizationGroups: [
        {
          id: "size",
          name: "Size",
          type: "single",
          required: true,
          options: [
            { id: "reg", name: "Regular", price: 0, available: true },
            { id: "large", name: "Large", price: 2, available: true },
          ],
        },
        {
          id: "toppings",
          name: "Extra Toppings",
          type: "multiple",
          required: false,
          options: [
            { id: "cheese", name: "Extra Cheese", price: 1, available: true },
            { id: "bacon", name: "Bacon", price: 2, available: true },
            { id: "avocado", name: "Avocado", price: 1.5, available: true },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Street Tacos",
      price: 7.99,
      description: "Three authentic street tacos with your choice of meat",
      imageUrl:
        "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=500&h=300&fit=crop",
      featured: true,
    },
  ],
  specials = [
    {
      id: "1",
      title: "Lunch Special",
      description: "Get 15% off on all orders between 11 AM - 2 PM",
      discount: 15,
    },
    {
      id: "2",
      title: "Happy Hour",
      description: "Buy any burger and get free fries, 4 PM - 6 PM",
      discount: 0,
    },
  ],
}) => {
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  const [customizations, setCustomizations] = React.useState<
    Record<string, string | string[]>
  >({});

  const featuredItems = items.filter((item) => item.featured);

  const handleCustomizationChange = (
    groupId: string,
    value: string | string[],
  ) => {
    setCustomizations((prev) => ({
      ...prev,
      [groupId]: value,
    }));
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    let total = selectedItem.price;

    selectedItem.customizationGroups?.forEach((group) => {
      if (group.type === "single") {
        const selectedOption = group.options.find(
          (opt) => opt.id === customizations[group.id],
        );
        if (selectedOption) total += selectedOption.price;
      } else {
        const selectedOptions = (customizations[group.id] as string[]) || [];
        selectedOptions.forEach((optId) => {
          const option = group.options.find((opt) => opt.id === optId);
          if (option) total += option.price;
        });
      }
    });

    return total;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{storeName}</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{isOpen ? "Open" : "Closed"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </div>
            </div>
          </div>
          <Badge variant={isOpen ? "success" : "destructive"}>
            {isOpen ? "OPEN" : "CLOSED"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {specials.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Today's Specials</h3>
            <div className="space-y-3">
              {specials.map((special) => (
                <div
                  key={special.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-yellow-800">
                        {special.title}
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {special.description}
                      </p>
                    </div>
                    {special.discount > 0 && (
                      <Badge className="bg-yellow-500">
                        {special.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4">Featured Items</h3>
        <div className="grid grid-cols-2 gap-4">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{item.name}</h4>
                  <span className="font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-gray-600">{selectedItem.description}</p>

                {selectedItem.customizationGroups?.map((group) => (
                  <div key={group.id} className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{group.name}</Label>
                      {group.required && (
                        <span className="text-sm text-red-500">Required</span>
                      )}
                    </div>

                    {group.type === "single" ? (
                      <RadioGroup
                        value={customizations[group.id] as string}
                        onValueChange={(value) =>
                          handleCustomizationChange(group.id, value)
                        }
                      >
                        {group.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.id}
                              id={`${group.id}-${option.id}`}
                            />
                            <Label
                              htmlFor={`${group.id}-${option.id}`}
                              className="flex-1"
                            >
                              {option.name}
                            </Label>
                            {option.price > 0 && (
                              <span className="text-sm text-gray-600">
                                +${option.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-2">
                        {group.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${group.id}-${option.id}`}
                              checked={(
                                (customizations[group.id] as string[]) || []
                              ).includes(option.id)}
                              onCheckedChange={(checked) => {
                                const current =
                                  (customizations[group.id] as string[]) || [];
                                handleCustomizationChange(
                                  group.id,
                                  checked
                                    ? [...current, option.id]
                                    : current.filter((id) => id !== option.id),
                                );
                              }}
                            />
                            <Label
                              htmlFor={`${group.id}-${option.id}`}
                              className="flex-1"
                            >
                              {option.name}
                            </Label>
                            {option.price > 0 && (
                              <span className="text-sm text-gray-600">
                                +${option.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full"
                  disabled={selectedItem.customizationGroups?.some(
                    (g) => g.required && !customizations[g.id],
                  )}
                >
                  Add to Order
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StorePreview;

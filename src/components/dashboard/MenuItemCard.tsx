import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Star } from "lucide-react";

interface MenuItemCardProps {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  available?: boolean;
  featured?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleAvailability?: (available: boolean) => void;
  onToggleFeatured?: (featured: boolean) => void;
}

const MenuItemCard = ({
  name = "Classic Burger",
  price = 9.99,
  description = "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
  imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop",
  available = true,
  featured = false,
  onEdit = () => {},
  onDelete = () => {},
  onToggleAvailability = () => {},
  onToggleFeatured = () => {},
}: MenuItemCardProps) => {
  return (
    <Card className="w-[230px] h-[280px] bg-white overflow-hidden">
      <div className="relative h-36">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant={featured ? "default" : "secondary"}
            size="sm"
            className={`h-8 ${featured ? "bg-yellow-500 hover:bg-yellow-600" : "bg-white/90 hover:bg-white"}`}
            onClick={() => onToggleFeatured(!featured)}
          >
            <Star className={`h-4 w-4 ${featured ? "fill-white" : ""}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 bg-white/90 hover:bg-red-500"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <span className="font-bold text-green-600">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {available ? "Available" : "Unavailable"}
        </span>
        <Switch checked={available} onCheckedChange={onToggleAvailability} />
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;

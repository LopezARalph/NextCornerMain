import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Plus, Search, GripVertical, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import MenuItemCard from "./MenuItemCard";
import EditItemDialog from "./EditItemDialog";
import EditCategoryDialog from "./EditCategoryDialog";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
  featured?: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

interface MenuManagerProps {
  initialCategories?: Category[];
  initialItems?: MenuItem[];
}

const MenuManager = ({
  initialCategories = [
    { id: "1", name: "Burgers" },
    { id: "2", name: "Wraps & Sandwiches" },
    { id: "3", name: "Sides" },
  ],
  initialItems = [
    {
      id: "1",
      name: "Classic Burger",
      price: 9.99,
      description:
        "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop",
      available: true,
      featured: true,
      categoryId: "1",
    },
    {
      id: "2",
      name: "Veggie Wrap",
      price: 7.99,
      description: "Fresh vegetables wrapped in a tortilla with hummus",
      imageUrl:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=300&fit=crop",
      available: true,
      featured: false,
      categoryId: "2",
    },
    {
      id: "3",
      name: "Street Tacos",
      price: 8.99,
      description: "Three authentic street tacos with your choice of meat",
      imageUrl:
        "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=500&h=300&fit=crop",
      available: false,
      featured: true,
      categoryId: "3",
    },
  ],
}: MenuManagerProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggingCategory, setDraggingCategory] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  // Dialog states
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDragStart = (categoryId: string) => {
    setDraggingCategory(categoryId);
  };

  const handleItemDragStart = (itemId: string) => {
    setDraggingItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    if (draggingCategory && draggingCategory !== targetCategoryId) {
      const newCategories = [...categories];
      const dragIndex = categories.findIndex((c) => c.id === draggingCategory);
      const dropIndex = categories.findIndex((c) => c.id === targetCategoryId);

      const [draggedCategory] = newCategories.splice(dragIndex, 1);
      newCategories.splice(dropIndex, 0, draggedCategory);

      setCategories(newCategories);
    }
  };

  const handleItemDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggingItem) {
      const newItems = items.map((item) =>
        item.id === draggingItem ? { ...item, categoryId } : item,
      );
      setItems(newItems);
      setDraggingItem(null);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setItemDialogOpen(true);
  };

  const handleEditItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setEditingItem(item);
      setItemDialogOpen(true);
    }
  };

  const handleSaveItem = (item: MenuItem) => {
    if (item.id) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems([
        ...items,
        { ...item, id: `item-${items.length + 1}`, available: true },
      ]);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = (category: Category) => {
    if (category.id) {
      setCategories(
        categories.map((c) => (c.id === category.id ? category : c)),
      );
    } else {
      setCategories([
        ...categories,
        { ...category, id: `category-${categories.length + 1}` },
      ]);
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Menu Management</CardTitle>
          <CardDescription>
            Featured items will appear first in your store
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              draggable
              onDragStart={() => handleDragStart(category.id)}
              onDragOver={(e) => handleDragOver(e, category.id)}
              onDrop={(e) => handleItemDrop(e, category.id)}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 cursor-move">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold flex-1">
                  {category.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditCategory(category)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems
                  .filter((item) => item.categoryId === category.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleItemDragStart(item.id)}
                    >
                      <MenuItemCard
                        {...item}
                        onEdit={() => handleEditItem(item.id)}
                        onDelete={() => handleDeleteItem(item.id)}
                        onToggleAvailability={(available) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id ? { ...i, available } : i,
                            ),
                          )
                        }
                        onToggleFeatured={(featured) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id ? { ...i, featured } : i,
                            ),
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <EditItemDialog
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        item={editingItem || undefined}
        categories={categories}
        onSave={handleSaveItem}
      />

      <EditCategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={editingCategory || undefined}
        onSave={handleSaveCategory}
      />
    </Card>
  );
};

export default MenuManager;

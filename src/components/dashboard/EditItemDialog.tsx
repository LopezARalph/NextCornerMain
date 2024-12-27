import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

interface CustomizationGroup {
  id: string;
  name: string;
  type: "single" | "multiple";
  required: boolean;
  options: CustomizationOption[];
}

interface EditItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: string;
    customizationGroups?: CustomizationGroup[];
  };
  categories: Array<{ id: string; name: string }>;
  onSave: (item: any) => void;
}

const EditItemDialog = ({
  open,
  onOpenChange,
  item = {
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    categoryId: "",
    customizationGroups: [],
  },
  categories,
  onSave,
}: EditItemDialogProps) => {
  const [formData, setFormData] = React.useState(item);
  const [newGroupName, setNewGroupName] = React.useState("");
  const [newOptionName, setNewOptionName] = React.useState("");
  const [newOptionPrice, setNewOptionPrice] = React.useState("0");

  React.useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const addCustomizationGroup = () => {
    if (!newGroupName) return;
    const newGroup: CustomizationGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      type: "single",
      required: false,
      options: [],
    };
    setFormData({
      ...formData,
      customizationGroups: [...(formData.customizationGroups || []), newGroup],
    });
    setNewGroupName("");
  };

  const addOption = (groupId: string) => {
    if (!newOptionName) return;
    const newOption: CustomizationOption = {
      id: `option-${Date.now()}`,
      name: newOptionName,
      price: parseFloat(newOptionPrice),
      available: true,
    };
    setFormData({
      ...formData,
      customizationGroups: formData.customizationGroups?.map((group) =>
        group.id === groupId
          ? { ...group, options: [...group.options, newOption] }
          : group,
      ),
    });
    setNewOptionName("");
    setNewOptionPrice("0");
  };

  const removeGroup = (groupId: string) => {
    setFormData({
      ...formData,
      customizationGroups: formData.customizationGroups?.filter(
        (group) => group.id !== groupId,
      ),
    });
  };

  const removeOption = (groupId: string, optionId: string) => {
    setFormData({
      ...formData,
      customizationGroups: formData.customizationGroups?.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.filter((opt) => opt.id !== optionId),
            }
          : group,
      ),
    });
  };

  const updateGroup = (
    groupId: string,
    updates: Partial<CustomizationGroup>,
  ) => {
    setFormData({
      ...formData,
      customizationGroups: formData.customizationGroups?.map((group) =>
        group.id === groupId ? { ...group, ...updates } : group,
      ),
    });
  };

  const updateOption = (
    groupId: string,
    optionId: string,
    updates: Partial<CustomizationOption>,
  ) => {
    setFormData({
      ...formData,
      customizationGroups: formData.customizationGroups?.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((opt) =>
                opt.id === optionId ? { ...opt, ...updates } : opt,
              ),
            }
          : group,
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{item.id ? "Edit" : "Add"} Menu Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Base Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Customization Options</h3>

              {/* Add new customization group */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="New group name (e.g., Size, Toppings)"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomizationGroup}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Existing customization groups */}
              <div className="space-y-4">
                {formData.customizationGroups?.map((group) => (
                  <div
                    key={group.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{group.name}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGroup(group.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label>Selection Type:</Label>
                        <Select
                          value={group.type}
                          onValueChange={(value: "single" | "multiple") =>
                            updateGroup(group.id, { type: value })
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">
                              Single Select
                            </SelectItem>
                            <SelectItem value="multiple">
                              Multi Select
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label>Required:</Label>
                        <Switch
                          checked={group.required}
                          onCheckedChange={(checked) =>
                            updateGroup(group.id, { required: checked })
                          }
                        />
                      </div>
                    </div>

                    {/* Add new option to group */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Option name"
                        value={newOptionName}
                        onChange={(e) => setNewOptionName(e.target.value)}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Extra price"
                        value={newOptionPrice}
                        onChange={(e) => setNewOptionPrice(e.target.value)}
                        className="w-24"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addOption(group.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {group.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={option.available}
                              onCheckedChange={(checked) =>
                                updateOption(group.id, option.id, {
                                  available: checked,
                                })
                              }
                            />
                            <span>{option.name}</span>
                            {option.price > 0 && (
                              <span className="text-sm text-gray-500">
                                +${option.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(group.id, option.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {item.id ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;

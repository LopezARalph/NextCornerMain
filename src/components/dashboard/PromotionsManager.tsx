import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Percent,
  Gift,
  Trophy,
  Bell,
  Calendar,
  Tag,
  Trash2,
} from "lucide-react";

interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  usageLimit?: number;
  usageCount: number;
  expiresAt?: string;
}

interface LoyaltyTier {
  name: string;
  pointsRequired: number;
  benefits: string[];
}

interface PromotionsManagerProps {
  discounts?: Discount[];
  loyaltyTiers?: LoyaltyTier[];
  onCreateDiscount?: (discount: Omit<Discount, "id" | "usageCount">) => void;
  onToggleDiscount?: (id: string, active: boolean) => void;
  onDeleteDiscount?: (id: string) => void;
}

const PromotionsManager = ({
  discounts = [
    {
      id: "1",
      code: "WELCOME",
      type: "percentage",
      value: 15,
      active: true,
      usageLimit: 100,
      usageCount: 45,
      expiresAt: "2024-04-01",
    },
    {
      id: "2",
      code: "SAVE10",
      type: "fixed",
      value: 10,
      active: true,
      usageCount: 23,
    },
  ],
  loyaltyTiers = [
    {
      name: "Bronze",
      pointsRequired: 0,
      benefits: ["Earn 1 point per $1 spent", "Birthday reward"],
    },
    {
      name: "Silver",
      pointsRequired: 100,
      benefits: [
        "Earn 1.5 points per $1 spent",
        "Free size upgrade",
        "Priority support",
      ],
    },
    {
      name: "Gold",
      pointsRequired: 500,
      benefits: [
        "Earn 2 points per $1 spent",
        "Free delivery",
        "Exclusive offers",
        "VIP support",
      ],
    },
  ],
  onCreateDiscount = () => {},
  onToggleDiscount = () => {},
  onDeleteDiscount = () => {},
}: PromotionsManagerProps) => {
  return (
    <Card className="w-[740px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Promotions & Loyalty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="discounts" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="discounts" className="flex items-center gap-2">
              <Tag className="h-4 w-4" /> Discount Codes
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Loyalty Program
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discounts" className="space-y-4">
            {/* Create New Discount */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Discount Code</Label>
                    <Input placeholder="e.g., SUMMER2024" />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount Value</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        className="flex-1"
                      />
                      <Button variant="outline" className="w-24">
                        <Percent className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Usage Limit</Label>
                    <Input type="number" placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <Button className="mt-4">
                  <Gift className="h-4 w-4 mr-2" /> Create Discount
                </Button>
              </CardContent>
            </Card>

            {/* Active Discounts */}
            <div className="space-y-3">
              {discounts.map((discount) => (
                <Card key={discount.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={discount.active}
                          onCheckedChange={(checked) =>
                            onToggleDiscount(discount.id, checked)
                          }
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{discount.code}</h4>
                            <Badge
                              variant={
                                discount.active ? "success" : "secondary"
                              }
                            >
                              {discount.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {discount.type === "percentage"
                              ? `${discount.value}% off`
                              : `$${discount.value} off`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Usage</p>
                          <p className="font-medium">
                            {discount.usageCount}
                            {discount.usageLimit
                              ? `/${discount.usageLimit}`
                              : ""}
                          </p>
                        </div>
                        {discount.expiresAt && (
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Expires</p>
                            <p className="font-medium">
                              {new Date(
                                discount.expiresAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => onDeleteDiscount(discount.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {loyaltyTiers.map((tier, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy
                        className={`h-5 w-5 ${index === 0 ? "text-orange-600" : index === 1 ? "text-gray-400" : "text-yellow-500"}`}
                      />
                      <h3 className="font-semibold">{tier.name}</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Points Required</p>
                        <p className="font-medium">{tier.pointsRequired}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Benefits</p>
                        <ul className="text-sm space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Gift className="h-3 w-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PromotionsManager;

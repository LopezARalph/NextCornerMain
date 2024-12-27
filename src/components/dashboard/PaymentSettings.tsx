import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, DollarSign, Wallet, Building2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "bank" | "card";
  name: string;
  last4: string;
  isDefault: boolean;
}

interface PaymentSettingsProps {
  paymentMethods?: PaymentMethod[];
  autoPayoutEnabled?: boolean;
  payoutThreshold?: number;
  payoutFrequency?: "daily" | "weekly" | "monthly";
  onAddPaymentMethod?: () => void;
  onRemovePaymentMethod?: (id: string) => void;
  onSetDefaultMethod?: (id: string) => void;
  onUpdatePayoutSettings?: (settings: any) => void;
}

const PaymentSettings = ({
  paymentMethods = [
    {
      id: "1",
      type: "bank",
      name: "Business Checking",
      last4: "4567",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Business Debit",
      last4: "8901",
      isDefault: false,
    },
  ],
  autoPayoutEnabled = true,
  payoutThreshold = 100,
  payoutFrequency = "weekly",
  onAddPaymentMethod = () => {},
  onRemovePaymentMethod = () => {},
  onSetDefaultMethod = () => {},
  onUpdatePayoutSettings = () => {},
}: PaymentSettingsProps) => {
  return (
    <Card className="w-[740px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Payment Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Methods Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <Button onClick={onAddPaymentMethod} variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {method.type === "bank" ? (
                    <Building2 className="h-5 w-5 text-blue-500" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-purple-500" />
                  )}
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">•••• {method.last4}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {method.isDefault ? (
                    <span className="text-sm text-green-600 font-medium">
                      Default
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSetDefaultMethod(method.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemovePaymentMethod(method.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Settings Section */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold">Payout Settings</h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Automatic Payouts</Label>
                <p className="text-sm text-gray-500">
                  Automatically transfer earnings to your default payment method
                </p>
              </div>
              <Switch
                checked={autoPayoutEnabled}
                onCheckedChange={(checked) =>
                  onUpdatePayoutSettings({ autoPayoutEnabled: checked })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Payout Threshold</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    value={payoutThreshold}
                    className="pl-9"
                    onChange={(e) =>
                      onUpdatePayoutSettings({
                        payoutThreshold: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payout Frequency</Label>
                <Select
                  value={payoutFrequency}
                  onValueChange={(value) =>
                    onUpdatePayoutSettings({ payoutFrequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Next Payout</p>
                  <p className="text-sm text-blue-600">
                    $1,234.56 scheduled for transfer on Monday, March 25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSettings;

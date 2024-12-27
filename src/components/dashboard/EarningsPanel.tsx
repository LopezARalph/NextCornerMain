import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Clock, Calendar } from "lucide-react";

interface EarningsPanelProps {
  dailyEarnings?: number;
  orderCount?: number;
  averageOrderValue?: number;
  recentOrders?: Array<{
    id: string;
    amount: number;
    time: string;
    items: number;
  }>;
}

const EarningsPanel = ({
  dailyEarnings = 458.5,
  orderCount = 23,
  averageOrderValue = 19.93,
  recentOrders = [
    { id: "ORD-001", amount: 25.99, time: "10:30 AM", items: 3 },
    { id: "ORD-002", amount: 15.5, time: "11:15 AM", items: 2 },
    { id: "ORD-003", amount: 32.75, time: "12:00 PM", items: 4 },
    { id: "ORD-004", amount: 18.25, time: "1:30 PM", items: 2 },
  ],
}: EarningsPanelProps) => {
  return (
    <Card className="w-[740px] h-[400px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Earnings Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Daily Earnings
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${dailyEarnings.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Orders Today
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">{orderCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">
                  Avg. Order Value
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${averageOrderValue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList>
            <TabsTrigger value="recent">Recent Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="flex items-center justify-center h-40 text-gray-500">
              Order history will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EarningsPanel;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  UtensilsCrossed,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  CreditCard,
} from "lucide-react";

interface InsightMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
}

interface PopularItem {
  name: string;
  quantity: number;
  revenue: number;
  trend: "up" | "down";
}

interface LocationMetric {
  address: string;
  orders: number;
  revenue: number;
  rating: number;
}

interface FeeBreakdown {
  type: string;
  amount: number;
  percentage: number;
  description: string;
}

interface InsightsPanelProps {
  metrics?: {
    revenue: InsightMetric[];
    orders: InsightMetric[];
    customers: InsightMetric[];
  };
  popularItems?: PopularItem[];
  topLocations?: LocationMetric[];
  peakHours?: Array<{ hour: string; orders: number }>;
  fees?: {
    monthly: FeeBreakdown[];
    total: number;
  };
}

const InsightsPanel = ({
  metrics = {
    revenue: [
      { label: "Today", value: "$458.50", change: 12.5, trend: "up" },
      { label: "This Week", value: "$3,245.75", change: 8.2, trend: "up" },
      { label: "This Month", value: "$12,458.50", change: -2.4, trend: "down" },
    ],
    orders: [
      { label: "Today", value: 23, change: 15.0, trend: "up" },
      { label: "This Week", value: 156, change: 5.5, trend: "up" },
      { label: "This Month", value: 648, change: 8.8, trend: "up" },
    ],
    customers: [
      { label: "New Today", value: 8, change: 25.0, trend: "up" },
      { label: "Returning", value: "68%", change: 5.0, trend: "up" },
      { label: "Avg Rating", value: 4.8, change: 0.2, trend: "up" },
    ],
  },
  popularItems = [
    { name: "Classic Burger", quantity: 145, revenue: 1450, trend: "up" },
    { name: "Street Tacos", quantity: 122, revenue: 915, trend: "up" },
    { name: "Loaded Fries", quantity: 98, revenue: 588, trend: "down" },
    { name: "Chicken Wings", quantity: 87, revenue: 783, trend: "up" },
  ],
  topLocations = [
    { address: "Downtown Food Park", orders: 245, revenue: 3675, rating: 4.8 },
    { address: "Waterfront Plaza", orders: 188, revenue: 2820, rating: 4.7 },
    { address: "Tech District", orders: 156, revenue: 2340, rating: 4.9 },
  ],
  peakHours = [
    { hour: "11:00", orders: 28 },
    { hour: "12:00", orders: 45 },
    { hour: "13:00", orders: 52 },
    { hour: "14:00", orders: 32 },
    { hour: "15:00", orders: 18 },
  ],
  fees = {
    monthly: [
      {
        type: "Platform Fee",
        amount: 249.99,
        percentage: 0,
        description: "Monthly subscription fee",
      },
      {
        type: "Transaction Fee",
        amount: 373.76,
        percentage: 2.9,
        description: "2.9% per transaction",
      },
      {
        type: "Payment Processing",
        amount: 124.59,
        percentage: 0.3,
        description: "$0.30 per transaction",
      },
      {
        type: "Premium Features",
        amount: 49.99,
        percentage: 0,
        description: "Analytics and insights",
      },
    ],
    total: 798.33,
  },
}: InsightsPanelProps) => {
  const renderMetricCard = (metric: InsightMetric) => (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
          </div>
          {metric.change && (
            <span
              className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(metric.change)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-[740px] h-[600px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Business Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earnings" className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-4">
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Revenue
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" /> Popular Items
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Top Locations
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Customers
            </TabsTrigger>
            <TabsTrigger value="fees" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" /> Fees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earnings" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {metrics.revenue.map((metric) => renderMetricCard(metric))}
            </div>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">Peak Hours</h4>
                <div className="h-[200px] w-full flex items-end justify-between gap-2">
                  {peakHours.map((hour) => (
                    <div
                      key={hour.hour}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-12 bg-blue-500 rounded-t"
                        style={{ height: `${(hour.orders / 52) * 200}px` }}
                      />
                      <span className="text-xs text-gray-600">{hour.hour}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.quantity} orders
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.revenue}</p>
                        <span
                          className={`flex items-center text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.trend === "up" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          Trending
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <Card key={index}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{location.address}</h4>
                        <p className="text-sm text-gray-600">
                          {location.orders} orders
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${location.revenue}</p>
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-sm text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">
                            {location.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {metrics.customers.map((metric) => renderMetricCard(metric))}
            </div>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">Customer Satisfaction</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">5★</span>
                    <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-[75%]" />
                    </div>
                    <span className="text-sm">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">4★</span>
                    <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-[20%]" />
                    </div>
                    <span className="text-sm">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">3★</span>
                    <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-[5%]" />
                    </div>
                    <span className="text-sm">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-semibold">Monthly Fees Breakdown</h4>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Fees</p>
                    <p className="text-2xl font-bold text-red-600">
                      ${fees.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {fees.monthly.map((fee, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <h5 className="font-medium">{fee.type}</h5>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {fee.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${fee.amount.toFixed(2)}
                        </p>
                        {fee.percentage > 0 && (
                          <p className="text-sm text-gray-600">
                            {fee.percentage}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;

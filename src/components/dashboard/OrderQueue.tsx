import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import OrderCard from "./OrderCard";
import { Bell, Clock, CheckCircle2, XCircle } from "lucide-react";

type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

interface OrderItem {
  name: string;
  quantity: number;
  specialInstructions?: string;
}

interface Order {
  orderId: string;
  customerName: string;
  orderTotal: number;
  items: OrderItem[];
  timeRemaining: number;
  status: OrderStatus;
  estimatedTime?: number;
  createdAt: Date;
}

interface OrderQueueProps {
  incomingOrders?: Order[];
  activeOrders?: Order[];
  completedOrders?: Order[];
  onAcceptOrder?: (orderId: string, estimatedTime: number) => void;
  onRejectOrder?: (orderId: string, reason: string) => void;
  onMarkReady?: (orderId: string) => void;
  onMarkCompleted?: (orderId: string) => void;
  onUpdateEstimatedTime?: (orderId: string, newTime: number) => void;
}

const generateOrderId = () =>
  `#${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

const OrderQueue = ({
  incomingOrders = [
    {
      orderId: generateOrderId(),
      customerName: "Alice S.",
      orderTotal: 18.99,
      items: [
        { name: "Hot Dog", quantity: 2, specialInstructions: "Extra mustard" },
        { name: "Fries", quantity: 1 },
      ],
      timeRemaining: 180,
      status: "pending",
      createdAt: new Date(),
    },
    {
      orderId: generateOrderId(),
      customerName: "Bob J.",
      orderTotal: 12.5,
      items: [
        { name: "Burger", quantity: 1, specialInstructions: "No onions" },
        { name: "Soda", quantity: 1 },
      ],
      timeRemaining: 120,
      status: "pending",
      createdAt: new Date(),
    },
  ],
  activeOrders = [
    {
      orderId: generateOrderId(),
      customerName: "Charlie B.",
      orderTotal: 27.99,
      items: [
        { name: "Pizza", quantity: 1 },
        { name: "Wings", quantity: 6, specialInstructions: "Extra spicy" },
      ],
      timeRemaining: 600,
      status: "preparing",
      estimatedTime: 15,
      createdAt: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ],
  completedOrders = [],
  onAcceptOrder = () => {},
  onRejectOrder = () => {},
  onMarkReady = () => {},
  onMarkCompleted = () => {},
  onUpdateEstimatedTime = () => {},
}: OrderQueueProps) => {
  const [selectedTab, setSelectedTab] = useState("incoming");

  return (
    <Card className="w-[740px] h-[500px] bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Order Queue</CardTitle>
          {incomingOrders.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              <Bell className="h-4 w-4 mr-1" />
              {incomingOrders.length} New
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              New ({incomingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Done ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="mt-0">
            <ScrollArea className="h-[350px]">
              <div className="flex flex-col gap-3 pr-4">
                {incomingOrders.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    {...order}
                    onAccept={onAcceptOrder}
                    onReject={onRejectOrder}
                    showActions={true}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <ScrollArea className="h-[350px]">
              <div className="flex flex-col gap-3 pr-4">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    {...order}
                    onMarkReady={onMarkReady}
                    onMarkCompleted={onMarkCompleted}
                    onUpdateEstimatedTime={onUpdateEstimatedTime}
                    showActions={true}
                    showTimer={true}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <ScrollArea className="h-[350px]">
              <div className="flex flex-col gap-3 pr-4">
                {completedOrders.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    {...order}
                    showActions={false}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderQueue;

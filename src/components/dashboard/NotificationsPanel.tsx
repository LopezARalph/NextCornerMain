import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Star, ShoppingBag, Gift } from "lucide-react";

type NotificationType = "order" | "chat" | "review" | "promo";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationsPanelProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationsPanel = ({
  notifications = [
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #123 has been placed",
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: "2",
      type: "chat",
      title: "New Message",
      message: "Customer has a question about their order",
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: "3",
      type: "review",
      title: "New Review",
      message: "A customer left a 5-star review",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onNotificationClick = () => {},
}: NotificationsPanelProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "promo":
        return <Gift className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-[400px] h-[600px] bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <ScrollArea className="h-[520px]">
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-colors ${notification.read ? "bg-white" : "bg-blue-50"}`}
                onClick={() => {
                  if (!notification.read) {
                    onMarkAsRead(notification.id);
                  }
                  onNotificationClick(notification);
                }}
              >
                <div
                  className={`rounded-full p-2 ${notification.read ? "bg-gray-100" : "bg-blue-100"}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default NotificationsPanel;

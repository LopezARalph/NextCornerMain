import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, MessageSquare, User } from "lucide-react";

type NotificationType = "order" | "chat" | "review" | "promo";

interface Message {
  id: string;
  text: string;
  sender: "vendor" | "customer";
  timestamp: Date;
  orderId?: string;
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface MessagingCenterProps {
  messages?: Message[];
  notifications?: Notification[];
  onSendMessage?: (message: string) => void;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const MessagingCenter = ({
  messages = [
    {
      id: "1",
      text: "Hi, I have a question about my order #123",
      sender: "customer",
      timestamp: new Date(Date.now() - 300000),
      orderId: "#123",
    },
  ],
  notifications = [
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #123 has been placed",
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
  ],
  onSendMessage = () => {},
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onNotificationClick = () => {},
}: MessagingCenterProps) => {
  const [newMessage, setNewMessage] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-[740px] h-[600px] bg-white">
      <CardHeader>
        <CardTitle>Messaging Center</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Chat
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4">
            <ScrollArea ref={scrollRef} className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.sender === "customer" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=customer" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${message.sender === "vendor" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          {message.orderId && (
                            <span className="text-xs font-medium block mb-1">
                              Order {message.orderId}
                            </span>
                          )}
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.sender === "vendor" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=vendor" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleSend} disabled={!newMessage.trim()}>
                Send
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <ScrollArea className="h-[400px]">
              <div className="pr-4 space-y-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mb-4"
                    onClick={onMarkAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${notification.read ? "bg-white" : "bg-blue-50"}`}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead(notification.id);
                      }
                      onNotificationClick(notification);
                    }}
                  >
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
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MessagingCenter;

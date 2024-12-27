import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "vendor" | "customer";
  timestamp: Date;
  orderId?: string;
}

interface ChatPanelProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const ChatPanel = ({
  messages = [
    {
      id: "1",
      text: "Hi, I have a question about my order #123",
      sender: "customer",
      timestamp: new Date(Date.now() - 300000),
      orderId: "#123",
    },
    {
      id: "2",
      text: "Of course! How can I help you?",
      sender: "vendor",
      timestamp: new Date(Date.now() - 240000),
      orderId: "#123",
    },
    {
      id: "3",
      text: "Can I add extra sauce to my order?",
      sender: "customer",
      timestamp: new Date(Date.now() - 180000),
      orderId: "#123",
    },
  ],
  onSendMessage = () => {},
}: ChatPanelProps) => {
  const [newMessage, setNewMessage] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
    <Card className="w-[400px] h-[600px] bg-white flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Customer Chat</CardTitle>
      </CardHeader>
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
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
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatPanel;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, User } from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  timestamp: Date;
  orderId: string;
  vendorReply?: string;
}

interface ReviewsPanelProps {
  reviews?: Review[];
  onReplyToReview?: (reviewId: string, reply: string) => void;
}

const ReviewsPanel = ({
  reviews = [
    {
      id: "1",
      customerName: "John D.",
      rating: 5,
      comment: "Amazing food and great service! Will definitely order again.",
      timestamp: new Date(Date.now() - 86400000),
      orderId: "#123",
    },
    {
      id: "2",
      customerName: "Sarah M.",
      rating: 4,
      comment:
        "Food was delicious but delivery took a bit longer than expected.",
      timestamp: new Date(Date.now() - 172800000),
      orderId: "#124",
      vendorReply:
        "Thank you for your feedback! We'll work on improving our delivery times.",
    },
  ],
  onReplyToReview = () => {},
}: ReviewsPanelProps) => {
  const [replyText, setReplyText] = React.useState<Record<string, string>>({});

  const handleReply = (reviewId: string) => {
    onReplyToReview(reviewId, replyText[reviewId]);
    setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
  };

  return (
    <Card className="w-[740px] h-[600px] bg-white">
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[520px]">
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.customerName}`}
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">
                          {review.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Order {review.orderId} •{" "}
                          {review.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600">{review.comment}</p>

                  {review.vendorReply && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=vendor" />
                          <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Your Reply</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.vendorReply}
                      </p>
                    </div>
                  )}

                  {!review.vendorReply && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText[review.id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [review.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        size="sm"
                        disabled={!replyText[review.id]?.trim()}
                        onClick={() => handleReply(review.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default ReviewsPanel;

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Timer, DollarSign, Clock, CheckCircle2, XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

interface OrderCardProps {
  orderId: string;
  customerName: string;
  orderTotal: number;
  items?: OrderItem[];
  timeRemaining: number;
  status: OrderStatus;
  estimatedTime?: number;
  createdAt: Date;
  showActions?: boolean;
  showTimer?: boolean;
  onAccept?: (orderId: string, estimatedTime: number) => void;
  onReject?: (orderId: string, reason: string) => void;
  onMarkReady?: (orderId: string) => void;
  onMarkCompleted?: (orderId: string) => void;
  onUpdateEstimatedTime?: (orderId: string, newTime: number) => void;
}

const REJECTION_REASONS = [
  { id: "too-busy", label: "Too busy - Kitchen at capacity" },
  { id: "out-of-stock", label: "Items out of stock" },
  { id: "closing-soon", label: "Closing soon" },
  { id: "technical-issues", label: "Technical/Equipment issues" },
  { id: "other", label: "Other" },
];

const OrderCard = ({
  orderId,
  customerName,
  orderTotal = 0,
  items = [],
  timeRemaining,
  status,
  estimatedTime,
  createdAt = new Date(),
  showActions = true,
  showTimer = false,
  onAccept,
  onReject,
  onMarkReady,
  onMarkCompleted,
  onUpdateEstimatedTime,
}: OrderCardProps) => {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [customTime, setCustomTime] = useState("15");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // Calculate suggested time based on order items and complexity
  const calculateSuggestedTime = () => {
    const totalItems =
      items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const baseTime = 10;
    const timePerItem = 3;
    return Math.ceil((baseTime + totalItems * timePerItem) / 5) * 5; // Round to nearest 5 minutes
  };

  const suggestedTime = calculateSuggestedTime();

  const TIME_OPTIONS = [
    {
      id: "suggested",
      label: `${suggestedTime} mins (Suggested)`,
      value: suggestedTime,
    },
    { id: "quick", label: "10 mins (Quick Order)", value: 10 },
    { id: "standard", label: "15 mins (Standard)", value: 15 },
    { id: "busy", label: "20 mins (Busy)", value: 20 },
    { id: "custom", label: "Custom", value: "custom" },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAccept = () => {
    const finalTime =
      selectedTime === "custom"
        ? parseInt(customTime)
        : TIME_OPTIONS.find((t) => t.id === selectedTime)?.value ||
          suggestedTime;
    onAccept?.(orderId, finalTime);
    setIsAcceptDialogOpen(false);
    setSelectedTime("");
    setCustomTime("15");
  };

  const handleReject = () => {
    const reason =
      selectedReason === "other"
        ? customReason
        : REJECTION_REASONS.find((r) => r.id === selectedReason)?.label || "";
    onReject?.(orderId, reason);
    setIsRejectDialogOpen(false);
    setSelectedReason("");
    setCustomReason("");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "preparing":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-blue-500"
          >
            <Timer className="h-3 w-3" /> Preparing
          </Badge>
        );
      case "ready":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-green-500"
          >
            <CheckCircle2 className="h-3 w-3" /> Ready
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Cancelled
          </Badge>
        );
    }
  };

  const getActionButtons = () => {
    if (!showActions) return null;

    switch (status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              Reject
            </Button>
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => setIsAcceptDialogOpen(true)}
            >
              Accept
            </Button>
          </div>
        );
      case "preparing":
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
              onClick={() =>
                onUpdateEstimatedTime?.(orderId, parseInt(customTime))
              }
            >
              <Timer className="h-4 w-4 mr-1" />
              Need More Time
            </Button>
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => onMarkReady?.(orderId)}
            >
              Mark Ready
            </Button>
          </div>
        );
      case "ready":
        return (
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => onMarkCompleted?.(orderId)}
          >
            Complete Order
          </Button>
        );
    }
  };

  return (
    <>
      <Card className="w-full p-4 bg-white hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">{orderId}</span>
                <span className="font-medium">{customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">${orderTotal.toFixed(2)}</span>
              </div>
              {showTimer && timeRemaining > 0 && (
                <div className="flex items-center gap-2 text-orange-500">
                  <Timer className="w-4 h-4" />
                  <span className="font-medium">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              {getStatusBadge()}
            </div>

            <div className="space-y-1">
              {items.map((item, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  {item.specialInstructions && (
                    <span className="text-gray-500 ml-2 text-xs italic">
                      ({item.specialInstructions})
                    </span>
                  )}
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-2">
                Ordered at {createdAt.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">{getActionButtons()}</div>
        </div>
      </Card>

      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
              {TIME_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>

            {selectedTime === "custom" && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="customTime">Custom time (minutes):</Label>
                <Input
                  id="customTime"
                  type="number"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  min="1"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAcceptDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              disabled={
                !selectedTime || (selectedTime === "custom" && !customTime)
              }
            >
              Accept Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
            >
              {REJECTION_REASONS.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label htmlFor={reason.id}>{reason.label}</Label>
                </div>
              ))}
            </RadioGroup>

            {selectedReason === "other" && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="customReason">Please specify:</Label>
                <Input
                  id="customReason"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Enter reason for rejection"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={
                !selectedReason || (selectedReason === "other" && !customReason)
              }
            >
              Reject Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;

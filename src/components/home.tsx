import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./dashboard/DashboardHeader";
import LocationManager from "./dashboard/LocationManager";
import MenuManager from "./dashboard/MenuManager";
import OrderQueue from "./dashboard/OrderQueue";
import InsightsPanel from "./dashboard/InsightsPanel";
import ProfileSettings from "./dashboard/ProfileSettings";
import PromotionsManager from "./dashboard/PromotionsManager";
import ChatPanel from "./dashboard/ChatPanel";
import ReviewsPanel from "./dashboard/ReviewsPanel";
import NotificationsPanel from "./dashboard/NotificationsPanel";
import HelpCenter from "./dashboard/HelpCenter";
import PaymentSettings from "./dashboard/PaymentSettings";
import {
  MapPin,
  UtensilsCrossed,
  Clock,
  DollarSign,
  User,
  Eye,
  MessageSquare,
  Gift,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StorePreview from "./store/StorePreview";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto py-6 px-4 lg:px-8">
        <PreviewButton />
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="w-full grid grid-cols-4 lg:grid-cols-7 gap-1">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-0">
            <div className="flex justify-center">
              <OrderQueue />
            </div>
          </TabsContent>

          <TabsContent value="menu" className="mt-0">
            <MenuManager />
          </TabsContent>

          <TabsContent value="location" className="mt-0">
            <div className="flex justify-center">
              <LocationManager />
            </div>
          </TabsContent>

          <TabsContent value="finance" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <InsightsPanel />
              <PaymentSettings />
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ChatPanel />
                <ReviewsPanel />
              </div>
              <NotificationsPanel />
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="mt-0">
            <div className="flex justify-center">
              <PromotionsManager />
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <ProfileSettings />
              <HelpCenter />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const PreviewButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="bg-card hover:bg-accent gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview Store
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <StorePreview />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;

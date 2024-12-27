import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Camera,
  Clock,
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

interface SocialMedia {
  platform: string;
  url: string;
}

interface ProfileSettingsProps {
  businessName?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  profileImage?: string;
  coverImage?: string;
  businessHours?: BusinessHours[];
  socialMedia?: SocialMedia[];
  cuisine?: string[];
  specialties?: string[];
  onSave?: (data: any) => void;
  onImageUpload?: (file: File, type: "profile" | "cover") => void;
}

const ProfileSettings = ({
  businessName = "Next Corner Plus",
  description = "Serving the best street food in town",
  phoneNumber = "(555) 123-4567",
  email = "contact@nextcornerplus.com",
  website = "www.nextcornerplus.com",
  address = "123 Food Truck Lane",
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=NC",
  coverImage = "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1200&h=400&fit=crop",
  businessHours = [
    { day: "Monday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Tuesday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Wednesday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Thursday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Friday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Saturday", open: "10:00", close: "15:00", isOpen: true },
    { day: "Sunday", open: "10:00", close: "15:00", isOpen: false },
  ],
  socialMedia = [
    { platform: "Instagram", url: "instagram.com/nextcornerplus" },
    { platform: "Facebook", url: "facebook.com/nextcornerplus" },
    { platform: "Twitter", url: "twitter.com/nextcornerplus" },
  ],
  cuisine = ["Street Food", "American", "Mexican"],
  specialties = ["Burgers", "Tacos", "Sandwiches"],
  onSave = () => console.log("Saving profile settings"),
  onImageUpload = () => console.log("Uploading image"),
}: ProfileSettingsProps) => {
  return (
    <Card className="w-[740px] h-[600px] bg-white overflow-y-auto">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
            <TabsTrigger value="media">Media & Links</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            {/* Cover Image */}
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4"
                onClick={() => document.getElementById("coverUpload")?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                id="coverUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImageUpload(file, "cover");
                }}
              />
            </div>

            {/* Profile Image and Basic Info */}
            <div className="flex gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover bg-gray-100"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2"
                  onClick={() =>
                    document.getElementById("profileUpload")?.click()
                  }
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  id="profileUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onImageUpload(file, "profile");
                  }}
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    defaultValue={businessName}
                    placeholder="Enter business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={description}
                    placeholder="Describe your business"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  defaultValue={phoneNumber}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={email}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Website
                </Label>
                <Input
                  id="website"
                  defaultValue={website}
                  placeholder="Enter website URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Address
                </Label>
                <Input
                  id="address"
                  defaultValue={address}
                  placeholder="Enter business address"
                />
              </div>
            </div>

            {/* Cuisine and Specialties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cuisine Types</Label>
                <Input
                  defaultValue={cuisine.join(", ")}
                  placeholder="Enter cuisine types, separated by commas"
                />
              </div>
              <div className="space-y-2">
                <Label>Specialties</Label>
                <Input
                  defaultValue={specialties.join(", ")}
                  placeholder="Enter your specialties, separated by commas"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Set your regular business hours. Customers will see these hours
                on your profile.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <h3 className="font-semibold">Business Hours</h3>
              </div>
              <div className="space-y-4 border rounded-lg p-4">
                {businessHours.map((hours) => (
                  <div
                    key={hours.day}
                    className="flex items-center justify-between"
                  >
                    <div className="w-24">
                      <Label>{hours.day}</Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="time"
                        defaultValue={hours.open}
                        className="w-32"
                        disabled={!hours.isOpen}
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        defaultValue={hours.close}
                        className="w-32"
                        disabled={!hours.isOpen}
                      />
                      <Switch defaultChecked={hours.isOpen} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Social Media Links</h3>
              {socialMedia.map((social, index) => (
                <div key={index} className="flex gap-4">
                  <Input
                    defaultValue={social.platform}
                    className="w-1/3"
                    placeholder="Platform"
                  />
                  <Input
                    defaultValue={social.url}
                    className="flex-1"
                    placeholder="URL"
                  />
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add Social Media Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button onClick={onSave} className="w-32">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, Navigation, Crosshair, History } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Location {
  lat: number;
  lng: number;
  address: string;
  timestamp: Date;
}

interface LocationManagerProps {
  isActive?: boolean;
  currentLocation?: Location;
  locationHistory?: Location[];
  onToggleActive?: (active: boolean) => void;
  onUpdateLocation?: (location: Location) => void;
}

const LocationManager = ({
  isActive = true,
  currentLocation = {
    lat: 40.7128,
    lng: -74.006,
    address: "123 Street Food Lane, New York, NY 10001",
    timestamp: new Date(),
  },
  locationHistory = [
    {
      lat: 40.7128,
      lng: -74.006,
      address: "123 Street Food Lane, New York, NY 10001",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      lat: 40.7135,
      lng: -74.009,
      address: "456 Food Court Ave, New York, NY 10001",
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
  onToggleActive = () => {},
  onUpdateLocation = () => {},
}: LocationManagerProps) => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsTracking(true);
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // In a real app, use a geocoding service like Google Maps Geocoding API
          const address = await reverseGeocode(latitude, longitude);
          const newLocation = {
            lat: latitude,
            lng: longitude,
            address,
            timestamp: new Date(),
          };
          onUpdateLocation(newLocation);
          setError("");
        } catch (error) {
          setError("Failed to get address from coordinates");
        }
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  };

  const updateCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          onUpdateLocation({
            lat: latitude,
            lng: longitude,
            address,
            timestamp: new Date(),
          });
          setError("");
        } catch (error) {
          setError("Failed to get address from coordinates");
        }
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
      },
    );
  };

  // Mock function - replace with actual geocoding service
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // In a real app, use Google Maps Geocoding API or similar service
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  return (
    <Card className="w-[740px] h-[400px] p-6 bg-white relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Location</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <Switch checked={isActive} onCheckedChange={onToggleActive} />
            <span
              className={`text-sm ${isActive ? "text-green-600" : "text-gray-600"}`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={updateCurrentLocation}
          >
            <Navigation className="w-4 h-4" />
            Update Location
          </Button>
          <Button
            variant={isTracking ? "destructive" : "default"}
            className="flex items-center gap-2"
            onClick={isTracking ? stopTracking : startTracking}
          >
            <Crosshair className="w-4 h-4" />
            {isTracking ? "Stop Tracking" : "Start Tracking"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative h-[220px] bg-gray-100 rounded-lg overflow-hidden mb-4">
        {/* Placeholder for map - in a real implementation, this would be a proper map component */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary text-white p-2 rounded-full animate-pulse">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <History className="w-4 h-4" />
          Location History
        </div>
        <div className="space-y-2 max-h-[80px] overflow-y-auto pr-2">
          {locationHistory.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{location.address}</span>
              </div>
              <span className="text-gray-500">
                {location.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium">{currentLocation.address}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Last updated: {currentLocation.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};

export default LocationManager;

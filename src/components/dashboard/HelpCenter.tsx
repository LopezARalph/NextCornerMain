import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  MessageCircle,
  Languages,
  Calendar,
  MapPin,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

interface HelpCenterProps {
  faqs?: FAQItem[];
  events?: Event[];
  onSubmitTicket?: (ticket: { subject: string; message: string }) => void;
  onLanguageChange?: (language: string) => void;
}

const HelpCenter = ({
  faqs = [
    {
      question: "How do I update my menu items?",
      answer:
        "Go to the Menu tab and click on the item you want to edit. You can update prices, descriptions, and availability.",
      category: "Menu Management",
    },
    {
      question: "How do refunds work?",
      answer:
        "Refunds can be processed through the Order Queue. Select the order and click the refund button.",
      category: "Orders",
    },
  ],
  events = [
    {
      id: "1",
      title: "Food Truck Festival",
      date: "2024-04-15",
      location: "Downtown Plaza",
      description: "Join us for the annual food truck festival!",
    },
  ],
  onSubmitTicket = () => {},
  onLanguageChange = () => {},
}: HelpCenterProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ticketSubject, setTicketSubject] = React.useState("");
  const [ticketMessage, setTicketMessage] = React.useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmitTicket = () => {
    onSubmitTicket({ subject: ticketSubject, message: ticketMessage });
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <Card className="w-[740px] h-[600px] bg-white">
      <CardHeader>
        <CardTitle>Help Center</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> FAQs
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Support
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Languages className="h-4 w-4" /> Language
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            <ScrollArea className="h-[400px] pr-4">
              <Accordion type="single" collapsible>
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <textarea
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Describe your issue..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSubmitTicket}
                disabled={!ticketSubject || !ticketMessage}
              >
                Submit Ticket
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                            <MapPin className="h-4 w-4 ml-2" />
                            {event.location}
                          </div>
                        </div>
                        <Button variant="outline">RSVP</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <div className="space-y-4">
              <Select onValueChange={onLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    Language settings will affect all text throughout the
                    application. Some user-generated content may remain in its
                    original language.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HelpCenter;

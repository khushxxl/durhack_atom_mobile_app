import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [allTickets, setallTickets] = useState([
    {
      ticketName: "Ticket 01",
      ticketDescription: "Test desc",
      data: {
        pass_percentage: "Pass",
        summary: {
          adviser_main_points:
            "Adviser reassures customer's concerns, suggests reviewing market value and costs, aligning with financial goals. Offers options and support in decision-making and securing the investment.",
          customer_main_points:
            "Customer is uneasy about their real estate investment due to market fluctuations, considering selling or holding. Feels overwhelmed as it is a significant part of their portfolio.",
          favorable_to: "adviser",
          tone_analysis:
            "Both parties maintain a supportive and reassuring tone throughout the conversation, with the adviser offering guidance and empathy towards the customer's concerns.",
        },
        transcript: [
          {
            role: "Customer",
            text: "Fine. I'm feeling quite uneasy about my investment in the real estate property. With the market going down, I'm not sure if it's still a good idea to hold on to it, adviser.",
          },
          {
            role: "Adviser",
            text: "I understand, and it's completely normal to understand this way, especially with the current market fluctuations. Let's go through your concerns and assess the situation carefully.",
          },
          {
            role: "Customer",
            text: "Client, I just worry that I might be losing value on it, and I'm not sure if I should consider selling or holding on for now, adviser.",
          },
          {
            role: "Adviser",
            text: "That's a valid concern. Let's start by reviewing the current market value of your property along with any costs you're incurring, then we can evaluate how this fits within your overall financial goals. Does that sound good, client?",
          },
          {
            role: "Customer",
            text: "Yes. That makes sense. I guess I've just felt overwhelmed because it's a big part of my portfolio adviser.",
          },
          {
            role: "Adviser",
            text: "It sounds like you're carrying a lot of responsibility with this investment, especially since it's a significant portion of your assets. I want to help you find a strategy that feels secure and aligns with your long-term objectives.",
          },
          {
            role: "Customer",
            text: "Client, I appreciate that. I just want to make the right decision, especially in such uncertain times. Adviser.",
          },
          {
            role: "Adviser",
            text: "Of course, let's look into some options together. We'll weigh the pros and cons of holding versus selling based on your comfort level. And I can also recommend some ways to diversify if that would help ease the risk, client.",
          },
          {
            role: "Customer",
            text: "Thank you. I feel a bit better knowing I have someone to talk through this with adviser.",
          },
          {
            role: "Adviser",
            text: "I'm glad to hear that. My goal is to support you in making informed choices with confidence. Let's schedule a follow-up after we review the numbers, and we'll keep adjusting as needed.",
          },
        ],
      },
    },
  ]);
  return (
    <AppContext.Provider value={{ allTickets, setallTickets }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

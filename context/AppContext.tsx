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
          advisor_main_points:
            "Advisor reassures customer's concerns, suggests reviewing market value and costs, aligning with financial goals. Offers options and support in decision-making and securing the investment.",
          customer_main_points:
            "Customer is uneasy about their real estate investment due to market fluctuations, considering selling or holding. Feels overwhelmed as it is a significant part of their portfolio.",
          favorable_to: "customer",
          tone_analysis:
            "Throughout the conversation, the tone exhibited a complex interplay of emotions and professional conduct. The customer's tone initially reflected anxiety and uncertainty, evidenced by their use of phrases expressing unease and overwhelm regarding their real estate investment. Their vocal patterns showed signs of stress when discussing market fluctuations and portfolio concentration. However, as the conversation progressed, their tone gradually shifted towards cautious optimism, particularly when receiving reassurance and structured guidance from the adviser. The adviser maintained a consistently calm, empathetic, and professional tone throughout the interaction. Their voice carried authority without being domineering, effectively balancing emotional support with practical guidance. The adviser's tone was particularly effective in moments of validation, using phrases like 'completely normal' and 'valid concern' to create a safe space for discussion. The overall tone evolved from one of anxiety to collaborative problem-solving, with both parties engaging in constructive dialogue. The adviser's measured responses and the customer's gradual relaxation in tone created a harmonious dynamic that facilitated productive discussion of complex financial decisions.",
          voice_biometrics: {
            stress_detected: true,
            breather_suggestion:
              "Consider pausing for a brief relaxation exercise when discussing portfolio concentration to reduce anxiety levels.",
          },
          bias_detector: {
            customer_bias: "Recency Bias",
            advisor_suggestion:
              "Frame discussion around long-term market patterns and historical recovery trends to help balance recent market concerns with broader perspective.",
          },
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

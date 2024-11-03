import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [allTickets, setallTickets] = useState([
    {
      ticketName: "Ticket 01",
      ticketDescription: "Test desc",
      audioURL:
        "https://drive.google.com/uc?export=download&id=1Z5XwKQ3G78kPND6Lw4vF9LOc1SRudFwQ",
      data: {
        pass_percentage: "30%",
        pass_fail_rating: "Fail",
        summary: {
          advisor_main_points:
            "Advisor reassures customer's concerns, suggests reviewing market value and costs, aligning with financial goals. Offers options and support in decision-making and securing the investment.",
          customer_main_points:
            "Customer is uneasy about their real estate investment due to market fluctuations, considering selling or holding. Feels overwhelmed as it is a significant part of their portfolio.",
          favorable_to: "customer",
          tone_analysis:
            "Throughout the conversation, the tone exhibited a complex interplay of emotions and professional conduct. The customer's tone initially reflected anxiety and uncertainty, evidenced by their use of phrases expressing unease and overwhelm regarding their real estate investment. Their vocal patterns showed signs of stress when discussing market fluctuations and portfolio concentration. However, as the conversation progressed, their tone gradually shifted towards cautious optimism, particularly when receiving reassurance and structured guidance from the advisor. The advisor maintained a consistently calm, empathetic, and professional tone throughout the interaction. Their voice carried authority without being domineering, effectively balancing emotional support with practical guidance. The advisor's tone was particularly effective in moments of validation, using phrases like 'completely normal' and 'valid concern' to create a safe space for discussion. The overall tone evolved from one of anxiety to collaborative problem-solving, with both parties engaging in constructive dialogue. The advisor's measured responses and the customer's gradual relaxation in tone created a harmonious dynamic that facilitated productive discussion of complex financial decisions.",
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
            text: "Fine. I'm feeling quite uneasy about my investment in the real estate property. With the market going down, I'm not sure if it's still a good idea to hold on to it, advisor.",
          },
          {
            role: "Advisor",
            text: "I understand, and it's completely normal to understand this way, especially with the current market fluctuations. Let's go through your concerns and assess the situation carefully.",
          },
          {
            role: "Customer",
            text: "Client, I just worry that I might be losing value on it, and I'm not sure if I should consider selling or holding on for now, advisor.",
          },
          {
            role: "Advisor",
            text: "That's a valid concern. Let's start by reviewing the current market value of your property along with any costs you're incurring, then we can evaluate how this fits within your overall financial goals. Does that sound good, client?",
          },
          {
            role: "Customer",
            text: "Yes. That makes sense. I guess I've just felt overwhelmed because it's a big part of my portfolio advisor.",
          },
          {
            role: "Advisor",
            text: "It sounds like you're carrying a lot of responsibility with this investment, especially since it's a significant portion of your assets. I want to help you find a strategy that feels secure and aligns with your long-term objectives.",
          },
          {
            role: "Customer",
            text: "Client, I appreciate that. I just want to make the right decision, especially in such uncertain times. Advisor.",
          },
          {
            role: "Advisor",
            text: "Of course, let's look into some options together. We'll weigh the pros and cons of holding versus selling based on your comfort level. And I can also recommend some ways to diversify if that would help ease the risk, client.",
          },
          {
            role: "Customer",
            text: "Thank you. I feel a bit better knowing I have someone to talk through this with advisor.",
          },
          {
            role: "Advisor",
            text: "I'm glad to hear that. My goal is to support you in making informed choices with confidence. Let's schedule a follow-up after we review the numbers, and we'll keep adjusting as needed.",
          },
          {
            role: "Customer",
            text: "Can you tell me more about the current market trends in real estate?",
          },
          {
            role: "Advisor",
            text: "The market has been showing some interesting patterns. While there's been some volatility, historical data suggests that real estate tends to recover well over longer periods.",
          },
          {
            role: "Customer",
            text: "What about the rental income potential? Should I consider that option?",
          },
          {
            role: "Advisor",
            text: "That's an excellent question. Rental income could provide a steady cash flow while waiting for market conditions to improve. Let's analyze the rental market in your area.",
          },
          {
            role: "Customer",
            text: "I'm concerned about the maintenance costs if I keep the property.",
          },
          {
            role: "Advisor",
            text: "We should definitely factor in maintenance costs. Let's create a detailed budget that includes all potential expenses.",
          },
          {
            role: "Customer",
            text: "What's your view on property management companies?",
          },
          {
            role: "Advisor",
            text: "Property management companies can be valuable if you want to maintain the investment without handling day-to-day operations. They typically charge 8-12% of rental income.",
          },
          {
            role: "Customer",
            text: "Could we look at some comparable properties in the area?",
          },
          {
            role: "Advisor",
            text: "Absolutely. I'll prepare a comparative market analysis for our next meeting to help you understand your property's position in the current market.",
          },
        ],
      },
    },
    {
      ticketName: "Ticket 02",
      ticketDescription: "Retirement Planning Discussion",
      audioURL:
        "https://drive.google.com/uc?export=download&id=18P2XmTO9L_PUlhjcUcy_i18lcb_7HQFB",
      data: {
        pass_percentage: "85%",
        pass_fail_rating: "Pass",
        summary: {
          advisor_main_points:
            "Advisor provides comprehensive retirement planning guidance, explains investment diversification, and discusses risk management strategies.",
          customer_main_points:
            "Customer expresses concerns about retirement savings adequacy and seeks guidance on investment allocation.",
          favorable_to: "advisor",
          tone_analysis:
            "The conversation maintained a professional yet warm tone throughout. The advisor demonstrated strong expertise while remaining approachable.",
          voice_biometrics: {
            stress_detected: false,
            breather_suggestion:
              "Continue maintaining calm and focused discussion approach.",
          },
          bias_detector: {
            customer_bias: "Loss Aversion",
            advisor_suggestion:
              "Focus on long-term benefits and historical market performance data.",
          },
        },
        transcript: [
          {
            role: "Customer",
            text: "I'm worried about my retirement savings. Am I on track?",
          },
          {
            role: "Advisor",
            text: "Let's review your current savings and retirement goals together to ensure you're well-positioned for the future.",
          },
          {
            role: "Customer",
            text: "What's a realistic retirement age for me given my current savings?",
          },
          {
            role: "Advisor",
            text: "Based on your current portfolio and savings rate, we can explore various scenarios. Let's look at different retirement ages and the lifestyle each would support.",
          },
          {
            role: "Customer",
            text: "Should I increase my 401(k) contributions?",
          },
          {
            role: "Advisor",
            text: "Given your income level and retirement goals, maximizing your 401(k) contributions could be beneficial, especially considering the employer match.",
          },
          {
            role: "Customer",
            text: "What about Social Security? When should I start taking it?",
          },
          {
            role: "Advisor",
            text: "The decision about when to take Social Security depends on several factors. Let's analyze the benefits of taking it at different ages.",
          },
          {
            role: "Customer",
            text: "I'm concerned about healthcare costs in retirement.",
          },
          {
            role: "Advisor",
            text: "Healthcare is a significant consideration. We should factor in Medicare costs and possibly look at long-term care insurance options.",
          },
          {
            role: "Customer",
            text: "What about inflation? How do we plan for that?",
          },
          {
            role: "Advisor",
            text: "We'll build inflation protection into your portfolio through diversification and investments that historically have kept pace with inflation.",
          },
          {
            role: "Customer",
            text: "Should I consider annuities as part of my retirement plan?",
          },
          {
            role: "Advisor",
            text: "Annuities can provide a steady income stream in retirement. Let's evaluate the different types and see if they fit your overall strategy.",
          },
          {
            role: "Customer",
            text: "What about my current investment mix? Is it too aggressive?",
          },
          {
            role: "Advisor",
            text: "We should review your risk tolerance and time horizon. Adjusting your investment mix to align with your retirement timeline is crucial.",
          },
          {
            role: "Customer",
            text: "How often should we review my retirement plan?",
          },
          {
            role: "Advisor",
            text: "Regular reviews are important. I recommend at least an annual review, but we can meet more frequently if there are significant changes in your life or the market.",
          },
        ],
      },
    },
    {
      ticketName: "Ticket 03",
      ticketDescription: "Investment Portfolio Review",
      audioURL:
        "https://drive.google.com/uc?export=download&id=1_q0V-6_gy5YUT5kGnhvBlLZnHw9LA8DC",
      data: {
        pass_percentage: "92%",
        pass_fail_rating: "Pass",
        summary: {
          advisor_main_points:
            "Advisor conducts thorough portfolio analysis and suggests rebalancing strategies.",
          customer_main_points:
            "Customer seeks portfolio optimization and risk assessment.",
          favorable_to: "advisor",
          tone_analysis:
            "Professional and data-driven discussion with clear communication of complex concepts.",
          voice_biometrics: {
            stress_detected: false,
            breather_suggestion: "Maintain current composed approach.",
          },
          bias_detector: {
            customer_bias: "Confirmation Bias",
            advisor_suggestion:
              "Present alternative viewpoints and diverse investment options.",
          },
        },
        transcript: [
          {
            role: "Customer",
            text: "Can we review my portfolio performance?",
          },
          {
            role: "Advisor",
            text: "I'll analyze your current allocations and suggest any necessary adjustments to optimize returns.",
          },
          {
            role: "Customer",
            text: "How often should I rebalance my portfolio?",
          },
          {
            role: "Advisor",
            text: "Rebalancing frequency depends on your investment strategy. Typically, once or twice a year is sufficient, but we can adjust based on market conditions.",
          },
          {
            role: "Customer",
            text: "What are the tax implications of rebalancing?",
          },
          {
            role: "Advisor",
            text: "Rebalancing can trigger capital gains taxes. We should consider tax-efficient strategies to minimize the impact.",
          },
          {
            role: "Customer",
            text: "Should I invest in international markets?",
          },
          {
            role: "Advisor",
            text: "Diversifying into international markets can reduce risk and enhance returns. Let's evaluate the options based on your risk tolerance.",
          },
          {
            role: "Customer",
            text: "What about sector-specific investments?",
          },
          {
            role: "Advisor",
            text: "Sector-specific investments can offer growth opportunities but also come with higher risk. We should balance them within your overall portfolio.",
          },
          {
            role: "Customer",
            text: "How do I know if my portfolio is too concentrated?",
          },
          {
            role: "Advisor",
            text: "We can analyze your holdings to ensure you're not overly exposed to any single asset or sector. Diversification is key to managing risk.",
          },
          {
            role: "Customer",
            text: "What are the benefits of index funds?",
          },
          {
            role: "Advisor",
            text: "Index funds offer broad market exposure with low fees. They can be a cost-effective way to achieve diversification.",
          },
          {
            role: "Customer",
            text: "Should I consider alternative investments?",
          },
          {
            role: "Advisor",
            text: "Alternative investments like real estate or commodities can provide diversification benefits. Let's discuss how they might fit into your strategy.",
          },
          {
            role: "Customer",
            text: "How do I stay informed about market trends?",
          },
          {
            role: "Advisor",
            text: "Regularly reviewing financial news and reports can help. I can also provide updates and insights during our meetings.",
          },
        ],
      },
    },
    {
      ticketName: "Ticket 04",
      ticketDescription: "Tax Planning Session",
      audioURL:
        "https://drive.google.com/uc?export=download&id=1lod8UCiQ5IWGIySUzXm_3cBlwHmMsxrt",
      data: {
        pass_percentage: "78%",
        pass_fail_rating: "Pass",
        summary: {
          advisor_main_points:
            "Advisor explains tax-efficient investment strategies and potential deductions.",
          customer_main_points:
            "Customer seeks to minimize tax liability and understand tax implications.",
          favorable_to: "both",
          tone_analysis:
            "Detailed and informative discussion with clear focus on educational aspects.",
          voice_biometrics: {
            stress_detected: true,
            breather_suggestion:
              "Take brief pauses when explaining complex tax concepts.",
          },
          bias_detector: {
            customer_bias: "Anchoring",
            advisor_suggestion: "Provide comprehensive tax planning scenarios.",
          },
        },
        transcript: [
          {
            role: "Customer",
            text: "How can I reduce my tax burden this year?",
          },
          {
            role: "Advisor",
            text: "Let's explore various tax-efficient strategies that align with your financial goals.",
          },
          {
            role: "Customer",
            text: "What are the benefits of tax-loss harvesting?",
          },
          {
            role: "Advisor",
            text: "Tax-loss harvesting can offset capital gains and reduce your taxable income. We can identify opportunities within your portfolio.",
          },
          {
            role: "Customer",
            text: "Should I consider a Roth conversion?",
          },
          {
            role: "Advisor",
            text: "Roth conversions can provide tax-free growth and withdrawals in retirement. Let's evaluate if it's a good fit for your situation.",
          },
          {
            role: "Customer",
            text: "What about charitable donations? How do they impact my taxes?",
          },
          {
            role: "Advisor",
            text: "Charitable donations can provide significant tax deductions. We can discuss strategies like donor-advised funds to maximize the benefits.",
          },
          {
            role: "Customer",
            text: "How do I handle taxes on my investment income?",
          },
          {
            role: "Advisor",
            text: "Investment income is taxed differently based on the type. We should review your income sources and implement tax-efficient strategies.",
          },
          {
            role: "Customer",
            text: "What are the implications of selling a property?",
          },
          {
            role: "Advisor",
            text: "Selling a property can trigger capital gains taxes. We should consider timing and any available exemptions or deductions.",
          },
          {
            role: "Customer",
            text: "How can I maximize my retirement account contributions?",
          },
          {
            role: "Advisor",
            text: "Maximizing contributions to tax-advantaged accounts like 401(k)s and IRAs can reduce your taxable income and grow your savings.",
          },
          {
            role: "Customer",
            text: "What about estate taxes? Should I be concerned?",
          },
          {
            role: "Advisor",
            text: "Estate taxes can significantly impact your heirs. We should discuss estate planning strategies to minimize the tax burden.",
          },
          {
            role: "Customer",
            text: "How do I stay updated on tax law changes?",
          },
          {
            role: "Advisor",
            text: "Tax laws can change frequently. I recommend working with a tax professional and staying informed through reliable financial news sources.",
          },
        ],
      },
    },
    {
      ticketName: "Ticket 05",
      ticketDescription: "Estate Planning Review",
      audioURL:
        "https://drive.google.com/uc?export=download&id=1WvkBZKvS6ElIfT1wsazx8vOEiRBrPFOd",
      data: {
        pass_percentage: "88%",
        pass_fail_rating: "Pass",
        summary: {
          advisor_main_points:
            "Advisor outlines estate planning options and succession strategies.",
          customer_main_points:
            "Customer seeks guidance on legacy planning and wealth transfer.",
          favorable_to: "advisor",
          tone_analysis:
            "Sensitive and professional handling of complex family and financial matters.",
          voice_biometrics: {
            stress_detected: false,
            breather_suggestion:
              "Continue empathetic approach to sensitive topics.",
          },
          bias_detector: {
            customer_bias: "Status Quo",
            advisor_suggestion:
              "Present modern estate planning alternatives and digital solutions.",
          },
        },
        transcript: [
          {
            role: "Customer",
            text: "I need help planning my estate and protecting my family's future.",
          },
          {
            role: "Advisor",
            text: "I'll guide you through creating a comprehensive estate plan that ensures your wishes are fulfilled.",
          },
          {
            role: "Customer",
            text: "What are the key components of an estate plan?",
          },
          {
            role: "Advisor",
            text: "An estate plan typically includes a will, power of attorney, healthcare directive, and possibly trusts. We can tailor it to your needs.",
          },
          {
            role: "Customer",
            text: "How do I choose an executor for my will?",
          },
          {
            role: "Advisor",
            text: "Choosing an executor is important. They should be trustworthy, organized, and capable of handling financial matters. We can discuss potential candidates.",
          },
          {
            role: "Customer",
            text: "What about my digital assets? How are they handled?",
          },
          {
            role: "Advisor",
            text: "Digital assets should be included in your estate plan. We can create a list of your online accounts and provide instructions for their management.",
          },
          {
            role: "Customer",
            text: "Should I consider setting up a trust?",
          },
          {
            role: "Advisor",
            text: "Trusts can offer benefits like avoiding probate and providing for minor children. Let's discuss the different types and see if they fit your goals.",
          },
          {
            role: "Customer",
            text: "How do I ensure my healthcare wishes are respected?",
          },
          {
            role: "Advisor",
            text: "A healthcare directive or living will can outline your medical preferences. We should also designate a healthcare proxy to make decisions on your behalf.",
          },
          {
            role: "Customer",
            text: "What about estate taxes? How can I minimize them?",
          },
          {
            role: "Advisor",
            text: "There are several strategies to minimize estate taxes, such as gifting during your lifetime and setting up trusts. We can explore these options.",
          },
          {
            role: "Customer",
            text: "How often should I update my estate plan?",
          },
          {
            role: "Advisor",
            text: "Regular updates are important, especially after major life events like marriage, divorce, or the birth of a child. I recommend reviewing it every few years.",
          },
          {
            role: "Customer",
            text: "What happens if I don't have an estate plan?",
          },
          {
            role: "Advisor",
            text: "Without an estate plan, state laws will determine how your assets are distributed, which may not align with your wishes. It's crucial to have a plan in place.",
          },
          {
            role: "Customer",
            text: "How do I communicate my estate plan to my family?",
          },
          {
            role: "Advisor",
            text: "Open communication is key. We can discuss the best ways to share your plan with your family to ensure everyone understands your wishes.",
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

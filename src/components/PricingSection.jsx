import React, { useState } from 'react';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? 19 : 25,
      description: "Perfect for individuals and small creators",
      features: ["5 social accounts", "30 posts/month", "Basic analytics", "Email support"],
      popular: false
    },
    {
      name: "Professional",
      price: isAnnual ? 49 : 65,
      description: "Best for growing businesses and agencies",
      features: ["25 social accounts", "Unlimited posts", "Advanced analytics", "Team collaboration", "Priority support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: isAnnual ? 99 : 125,
      description: "For large teams and organizations",
      features: ["Unlimited accounts", "White label options", "Custom integrations", "Dedicated manager", "SLA guarantee"],
      popular: false
    }
  ];

  return (
    <div id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that's right for your business. No hidden fees.
          </p>
          <div className="flex items-center justify-center">
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isAnnual ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Annual</span>
            {isAnnual && <span className="ml-2 text-sm text-green-600 font-medium">Save 25%</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-xl shadow-sm border-2 ${plan.popular ? 'border-blue-600' : 'border-gray-200'} p-8`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-full">Most Popular</span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                {isAnnual && <p className="text-sm text-gray-500 mt-1">Billed annually</p>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

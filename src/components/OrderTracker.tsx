import React from 'react';
import { cn } from "@/lib/utils";
import { ClipboardCheck, ChefHat, Bike, PackageCheck, Check } from 'lucide-react';

// Define the possible statuses for type safety
export type OrderStatus = 'confirmed' | 'kitchen' | 'delivery' | 'delivered';

// Define the props for the component
interface OrderTrackerProps {
  /** The current status of the order */
  currentStatus: OrderStatus;
}

// Define the steps of the tracker for easy mapping
const steps = [
  { id: 'confirmed' as OrderStatus, label: 'Order Confirmed', icon: ClipboardCheck },
  { id: 'kitchen' as OrderStatus, label: 'In the Kitchen', icon: ChefHat },
  { id: 'delivery' as OrderStatus, label: 'Out for Delivery', icon: Bike },
  { id: 'delivered' as OrderStatus, label: 'Delivered', icon: PackageCheck },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isLastStep = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle, Icon, and Label */}
              <div className="flex flex-col items-center text-center w-1/4">
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500",
                    {
                      "bg-green-600 border-green-600 text-white": isCompleted,
                      "bg-blue-600 border-blue-600 text-white animate-pulse": isActive,
                      "bg-gray-100 border-gray-300 text-gray-400": !isCompleted && !isActive,
                    }
                  )}
                  aria-label={step.label}
                >
                  {isCompleted ? <Check className="w-7 h-7" /> : <step.icon className="w-6 h-6" />}
                </div>
                <p className={cn(
                  "text-xs sm:text-sm mt-2 font-semibold transition-colors duration-500",
                  {
                    "text-blue-600": isActive,
                    "text-gray-800": isCompleted,
                    "text-gray-500": !isCompleted && !isActive,
                  }
                )}>
                  {step.label}
                </p>
              </div>

              {/* Connecting Line */}
              {!isLastStep && (
                <div className="flex-1 mt-6">
                   <div
                    className={cn(
                      "h-1 w-full transition-all duration-500 delay-200",
                      isCompleted ? "bg-green-600" : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface ServiceSelectProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
  disabled?: boolean;
}

function ServiceSelect({ selectedService, onServiceChange, disabled }: ServiceSelectProps) {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/stocks', {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      });
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-12">
        <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center">
        Failed to load services. Please try again later.
      </div>
    );
  }

  return (
    <select
      value={selectedService}
      onChange={(e) => onServiceChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50"
    >
      <option value="">Select a service</option>
      {services?.map((service: string) => (
        <option key={service} value={service}>
          {service.charAt(0).toUpperCase() + service.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default ServiceSelect;

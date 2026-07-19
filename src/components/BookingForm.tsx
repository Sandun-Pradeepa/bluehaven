import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, Phone, Users, Home, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface BookingFormProps {
  destinationId: string;
  destinationTitle: string;
  hotelOptions: string[];
  selectedHotel: string;
  onSuccess: (booking: any) => void;
}

export default function BookingForm({
  destinationId,
  destinationTitle,
  hotelOptions,
  selectedHotel,
  onSuccess
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    tourDate: '',
    tourType: 'Solo',
    hotelOption: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Pre-fill selected hotel when it changes
  useEffect(() => {
    if (selectedHotel) {
      setFormData(prev => ({ ...prev, hotelOption: selectedHotel }));
    } else if (hotelOptions && hotelOptions.length > 0) {
      setFormData(prev => ({ ...prev, hotelOption: hotelOptions[0] }));
    }
  }, [selectedHotel, hotelOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Basic Validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.tourDate || !formData.hotelOption) {
      setError('Please fill in all required fields marked with an asterisk (*).');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          destinationId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm booking. Please try again.');
      }

      setSuccessMsg(`Your booking for ${destinationTitle} is confirmed!`);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        tourDate: '',
        tourType: 'Solo',
        hotelOption: hotelOptions[0] || '',
        specialRequests: ''
      });

      onSuccess(data.booking);
    } catch (err: any) {
      setError(err.message || 'Server connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-800">
          Book Your <span className="text-sky-500">{destinationTitle.replace(', Sri Lanka', '')}</span> Tour With BlueHaven
        </h3>
        <p className="text-slate-500 text-sm mt-2">
          Secure your premium local experiences, travel insurance, and boutique hotels in one go.
        </p>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start space-x-3"
        >
          <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base">Booking Confirmed Successfully!</h4>
            <p className="text-sm mt-1 text-emerald-700">{successMsg}</p>
            <p className="text-xs mt-2 text-emerald-600/80 font-mono">
              Confirmation receipt has been registered. Our travel concierge will connect with you via email shortly.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error Notification */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start space-x-3"
        >
          <AlertCircle className="h-6 w-6 text-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base">Unable to Proceed</h4>
            <p className="text-sm mt-1 text-rose-700">{error}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Hasini Muthumala"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="hasini@example.com"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Phone className="h-5 w-5" />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+94 77 123 4567"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Tour Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tour Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Calendar className="h-5 w-5" />
              </span>
              <input
                type="date"
                name="tourDate"
                required
                value={formData.tourDate}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Tour Type Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tour Type <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Users className="h-5 w-5" />
              </span>
              <select
                name="tourType"
                required
                value={formData.tourType}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all appearance-none"
              >
                <option value="Solo">Solo (1 Traveler)</option>
                <option value="Couple">Couple (2 Travelers)</option>
                <option value="Family">Family (3+ Travelers)</option>
              </select>
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                ▼
              </span>
            </div>
          </div>

          {/* Hotel Option Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Hotel Option <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Home className="h-5 w-5" />
              </span>
              <select
                name="hotelOption"
                required
                value={formData.hotelOption}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all appearance-none"
              >
                <option value="" disabled>Select a premium hotel option</option>
                {hotelOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Special Requests & Customizations
          </label>
          <div className="relative">
            <span className="absolute top-3 left-3.5 text-slate-400">
              <MessageSquare className="h-5 w-5" />
            </span>
            <textarea
              name="specialRequests"
              rows={4}
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="e.g., Dietary requirements, airport transfers, room preferences, extra tour guide requirements..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        {/* Confirm Booking Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-sky-100 hover:shadow-sky-200 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming Booking...</span>
              </span>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

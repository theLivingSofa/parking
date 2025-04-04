import React, { useState } from 'react';
import { Scan as QrScanner, UserPlus, LogIn, LogOut, Info } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import QRScanner from './components/QRScanner';
import StatusCheck from './components/StatusCheck';

function App() {
  const [activeTab, setActiveTab] = useState('register');

  const tabs = [
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'checkin', label: 'Check In', icon: LogIn },
    { id: 'checkout', label: 'Check Out', icon: LogOut },
    { id: 'status', label: 'Status', icon: Info },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'register':
        return <RegistrationForm />;
      case 'checkin':
        return <QRScanner type="checkin" />;
      case 'checkout':
        return <QRScanner type="checkout" />;
      case 'status':
        return <StatusCheck />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <QrScanner className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Parking System</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-4 text-center border-b-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mx-auto h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
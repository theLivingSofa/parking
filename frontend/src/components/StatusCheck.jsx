import React, { useState } from 'react';
import axios from 'axios';
import { Camera, XCircle } from 'lucide-react';
import QrScanner from 'react-qr-scanner';

function StatusCheck() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = async (result) => {
    console.log(result)
    if (result) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/status`, { qrcodeUrl: result.text });
        setStatus(response.data.status);
        setError('');
        setScanning(false);
      } catch (err) {
        console.log(err);
        
        setError(err.response?.data?.message || 'An error occurred');
        setStatus(null);
      }
    }
  };

  const handleError = (error) => {
    setError('Error accessing camera: ' + error.message);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6">
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Camera className="h-5 w-5 mr-2" />
            Start Scanning
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setScanning(false)}
              className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
            >
              <XCircle className="h-6 w-6 text-gray-600" />
            </button>
            <div className="overflow-hidden rounded-lg">
              <QrScanner
                constraints={{
                  video: { facingMode: 'environment' }
                }}
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>
        )}

        {status && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">User Status</h3>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{status.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="text-sm text-gray-900">{status.p_no}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">License Number</dt>
                <dd className="text-sm text-gray-900">{status.l_no}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Check-in Time</dt>
                <dd className="text-sm text-gray-900">
                  {status.checkIn ? new Date(status.checkIn).toLocaleString() : 'Not checked in'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Check-out Time</dt>
                <dd className="text-sm text-gray-900">
                  {status.checkOut ? new Date(status.checkOut).toLocaleString() : 'Not checked out'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className={`text-sm font-medium ${status.status ? 'text-green-600' : 'text-red-600'}`}>
                  {status.status ? 'Checked In' : 'Checked Out'}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          {scanning ? 'Point your camera at a QR code to scan' : 'Click the button to start scanning'}
        </div>
      </div>
    </div>
  );
}

export default StatusCheck;
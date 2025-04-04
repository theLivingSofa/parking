import React, { useState } from 'react';
import axios from 'axios';
import { Camera, XCircle } from 'lucide-react';
import QrScanner from 'react-qr-scanner';

function QRScanner({ type }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = async (result) => {
    if (result) {
      try {
        const endpoint = type === 'checkin' ? `${import.meta.env.VITE_BACKEND_URL}/api/checkin` : `${import.meta.env.VITE_BACKEND_URL}/api/checkout`;
        const response = await axios.post(endpoint, { qrcodeUrl: result.text });
        console.log(response)
        setMessage(response.data.message);
        if (response.data.rate) {
          setMessage(`${response.data.message} - Parking fee: ${response.data.rate}rs`);
        }
        setError('');
        setScanning(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setMessage('');
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

        {message && (
          <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md">{message}</div>
        )}

        <div className="text-center text-sm text-gray-500">
          {scanning ? 'Point your camera at a QR code to scan' : 'Click the button to start scanning'}
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
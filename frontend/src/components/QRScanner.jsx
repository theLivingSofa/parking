// import React, { useState } from 'react';
// import axios from 'axios';
// import { Camera, XCircle } from 'lucide-react';
// import QrScanner from 'react-qr-scanner';

// function QRScanner({ type }) {
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [scanning, setScanning] = useState(false);

//   const handleScan = async (result) => {
//     if (result) {
//       try {
//         const endpoint = type === 'checkin' ? `${import.meta.env.VITE_BACKEND_URL}/api/checkin` : `${import.meta.env.VITE_BACKEND_URL}/api/checkout`;
//         const response = await axios.post(endpoint, { qrcodeUrl: result.text });
//         console.log(response)
//         setMessage(response.data.message);
//         if (response.data.rate) {
//           setMessage(`${response.data.message} - Parking fee: ${response.data.rate}rs`);
//         }
//         setError('');
//         setScanning(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'An error occurred');
//         setMessage('');
//       }
//     }
//   };

//   const handleError = (error) => {
//     setError('Error accessing camera: ' + error.message);
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="space-y-6">
//         {!scanning ? (
//           <button
//             onClick={() => setScanning(true)}
//             className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <Camera className="h-5 w-5 mr-2" />
//             Start Scanning
//           </button>
//         ) : (
//           <div className="relative">
//             <button
//               onClick={() => setScanning(false)}
//               className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
//             >
//               <XCircle className="h-6 w-6 text-gray-600" />
//             </button>
//             <div className="overflow-hidden rounded-lg">
//               <QrScanner
//                 constraints={{
//                   video: { facingMode: 'environment' }
//                 }}
//                 onScan={handleScan}
//                 onError={handleError}
//                 style={{ width: '100%' }}
//               />
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>
//         )}

//         {message && (
//           <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md">{message}</div>
//         )}

//         <div className="text-center text-sm text-gray-500">
//           {scanning ? 'Point your camera at a QR code to scan' : 'Click the button to start scanning'}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QRScanner;

import React, { useState } from 'react';
import axios from 'axios';
import { Camera, XCircle, RefreshCcw } from 'lucide-react';
import QrScanner from 'react-qr-scanner';

function QRScanner({ type }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleScan = async (result) => {
    if (result && !hasScanned) {
      setHasScanned(true); // prevent further scans until reset

      try {
        const endpoint =
          type === 'checkin'
            ? `${import.meta.env.VITE_BACKEND_URL}/api/checkin`
            : type === 'checkout'
            ? `${import.meta.env.VITE_BACKEND_URL}/api/checkout`
            : `${import.meta.env.VITE_BACKEND_URL}/api/status`;

        const response = await axios.post(endpoint, { qrcodeUrl: result.text });

        if (response.data.rate) {
          setMessage(`${response.data.message} - Parking fee: ₹${response.data.rate.toFixed(2)}`);
        } else if (response.data.status !== undefined) {
          const user = response.data.status;
          setMessage(
            `User: ${user.name}\nStatus: ${user.status ? 'Checked In' : 'Checked Out'}`
          );
        } else {
          setMessage(response.data.message || 'Action completed.');
        }

        setError('');
        setScanning(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setMessage('');
        setScanning(false);
      }
    }
  };

  const handleError = (error) => {
    setError('Error accessing camera: ' + error.message);
  };

  const resetScanner = () => {
    setHasScanned(false);
    setMessage('');
    setError('');
    setScanning(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6">
        {!scanning ? (
          <button
            onClick={() => {
              setHasScanned(false);
              setScanning(true);
              setMessage('');
              setError('');
            }}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
                constraints={{ video: { facingMode: 'environment' } }}
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md whitespace-pre-wrap">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md whitespace-pre-wrap">
            {message}
          </div>
        )}

        {hasScanned && (
          <button
            onClick={resetScanner}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Scan Another QR
          </button>
        )}

        <div className="text-center text-sm text-gray-500">
          {scanning
            ? 'Point your camera at a QR code to scan'
            : 'Click the button to start scanning'}
        </div>
      </div>
    </div>
  );
}

export default QRScanner;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Camera, XCircle } from 'lucide-react';
// import QrScanner from 'react-qr-scanner';

// function StatusCheck() {
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState('');
//   const [scanning, setScanning] = useState(false);

//   const handleScan = async (result) => {
//     console.log(result)
//     if (result) {
//       try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/status`, { qrcodeUrl: result.text });
//         setStatus(response.data.status);
//         setError('');
//         setScanning(false);
//       } catch (err) {
//         console.log(err);
        
//         setError(err.response?.data?.message || 'An error occurred');
//         setStatus(null);
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

//         {status && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-md">
//             <h3 className="text-lg font-medium text-gray-900">User Status</h3>
//             <dl className="mt-2 space-y-2">
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Name</dt>
//                 <dd className="text-sm text-gray-900">{status.name}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
//                 <dd className="text-sm text-gray-900">{status.p_no}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">License Number</dt>
//                 <dd className="text-sm text-gray-900">{status.l_no}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Check-in Time</dt>
//                 <dd className="text-sm text-gray-900">
//                   {status.checkIn ? new Date(status.checkIn).toLocaleString() : 'Not checked in'}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Check-out Time</dt>
//                 <dd className="text-sm text-gray-900">
//                   {status.checkOut ? new Date(status.checkOut).toLocaleString() : 'Not checked out'}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Status</dt>
//                 <dd className={`text-sm font-medium ${status.status ? 'text-green-600' : 'text-red-600'}`}>
//                   {status.status ? 'Checked In' : 'Checked Out'}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         )}

//         <div className="text-center text-sm text-gray-500">
//           {scanning ? 'Point your camera at a QR code to scan' : 'Click the button to start scanning'}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StatusCheck;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Camera, XCircle } from 'lucide-react';
// import QrScanner from 'react-qr-scanner';

// function StatusCheck() {
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleScan = async (result) => {
//     if (result?.text) {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/status`,
//           { qrcodeUrl: result.text }
//         );
//         setStatus(response.data);
//       } catch (err) {
//         console.error(err);
//         setStatus(null);
//         setError(err.response?.data?.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//         setScanning(false);
//       }
//     }
//   };

//   const handleError = (error) => {
//     setError('Camera access error: ' + error.message);
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       {!scanning ? (
//         <button
//           onClick={() => setScanning(true)}
//           className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Camera className="h-5 w-5 mr-2" />
//           Start Scanning
//         </button>
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => setScanning(false)}
//             className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
//           >
//             <XCircle className="h-6 w-6 text-gray-600" />
//           </button>
//           <div className="overflow-hidden rounded-lg">
//             <QrScanner
//               constraints={{ video: { facingMode: 'environment' } }}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: '100%' }}
//             />
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="text-sm text-blue-600 text-center">Fetching status...</div>
//       )}

//       {error && (
//         <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>
//       )}

//       {status && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <h3 className="text-lg font-medium text-gray-900">User Status</h3>
//           <dl className="mt-2 space-y-2">
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Name</dt>
//               <dd className="text-sm text-gray-900">{status.name}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
//               <dd className="text-sm text-gray-900">{status.phone}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">License Number</dt>
//               <dd className="text-sm text-gray-900">{status.license_plate}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Current Check-in</dt>
//               <dd className="text-sm text-gray-900">
//                 {status.currentCheckIn
//                   ? new Date(status.currentCheckIn).toLocaleString()
//                   : 'Not checked in'}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Status</dt>
//               <dd
//                 className={`text-sm font-medium ${
//                   status.isParked ? 'text-green-600' : 'text-red-600'
//                 }`}
//               >
//                 {status.isParked ? 'Checked In' : 'Checked Out'}
//               </dd>
//             </div>
//           </dl>

//           {status.logs?.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-md font-semibold text-gray-700">Visit History</h4>
//               <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
//                 {status.logs.map((log, idx) => (
//                   <li key={idx}>
//                     In: {new Date(log.checkIn).toLocaleString()} → Out:{' '}
//                     {log.checkOut ? new Date(log.checkOut).toLocaleString() : 'N/A'} 
//                     ({log.duration?.toFixed(2) ?? '0'} hrs, ₹{log.amount ?? 0})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="text-center text-sm text-gray-500">
//         {scanning
//           ? 'Point your camera at a QR code to scan'
//           : 'Click the button to start scanning'}
//       </div>
//     </div>
//   );
// }

// export default StatusCheck;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Camera, XCircle } from 'lucide-react';
// import QrScanner from 'react-qr-scanner';

// function StatusCheck() {
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [manualPlate, setManualPlate] = useState('');

//   const handleScan = async (result) => {
//     if (result?.text) {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/status`,
//           { qrcodeUrl: result.text }
//         );
//         setStatus(response.data);
//       } catch (err) {
//         console.error(err);
//         setStatus(null);
//         setError(err.response?.data?.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//         setScanning(false);
//       }
//     }
//   };

//   const handleError = (error) => {
//     setError('Camera access error: ' + error.message);
//   };

//   const handleManualCheck = async () => {
//     if (!manualPlate.trim()) return;
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/status`,
//         { l_no: manualPlate.trim().toUpperCase() }
//       );
//       setStatus(response.data);
//     } catch (err) {
//       console.error(err);
//       setStatus(null);
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       {/* Manual License Plate Entry */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter License Plate"
//           value={manualPlate}
//           onChange={(e) => setManualPlate(e.target.value)}
//           className="flex-1 px-3 py-2 border rounded-md text-sm"
//         />
//         <button
//           onClick={handleManualCheck}
//           className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
//         >
//           Check
//         </button>
//       </div>

//       {/* QR Scanner */}
//       {!scanning ? (
//         <button
//           onClick={() => setScanning(true)}
//           className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Camera className="h-5 w-5 mr-2" />
//           Start Scanning
//         </button>
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => setScanning(false)}
//             className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
//           >
//             <XCircle className="h-6 w-6 text-gray-600" />
//           </button>
//           <div className="overflow-hidden rounded-lg">
//             <QrScanner
//               constraints={{ video: { facingMode: 'environment' } }}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: '100%' }}
//             />
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="text-sm text-blue-600 text-center">Fetching status...</div>
//       )}

//       {error && (
//         <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>
//       )}

//       {status && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <h3 className="text-lg font-medium text-gray-900">User Status</h3>
//           <dl className="mt-2 space-y-2">
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Name</dt>
//               <dd className="text-sm text-gray-900">{status.name}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
//               <dd className="text-sm text-gray-900">{status.phone}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">License Number</dt>
//               <dd className="text-sm text-gray-900">{status.license_plate}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Current Check-in</dt>
//               <dd className="text-sm text-gray-900">
//                 {status.currentCheckIn
//                   ? new Date(status.currentCheckIn).toLocaleString()
//                   : 'Not checked in'}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Status</dt>
//               <dd
//                 className={`text-sm font-medium ${
//                   status.isParked ? 'text-green-600' : 'text-red-600'
//                 }`}
//               >
//                 {status.isParked ? 'Checked In' : 'Checked Out'}
//               </dd>
//             </div>
//           </dl>

//           {status.logs?.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-md font-semibold text-gray-700">Visit History</h4>
//               <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
//                 {status.logs.map((log, idx) => (
//                   <li key={idx}>
//                     In: {new Date(log.checkIn).toLocaleString()} → Out:{' '}
//                     {log.checkOut ? new Date(log.checkOut).toLocaleString() : 'N/A'}
//                     {log.duration?.toFixed(2) ?? '0'} hrs
//                     {log.amount ? ` — ₹${log.amount}` : ''}

//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="text-center text-sm text-gray-500">
//         {scanning
//           ? 'Point your camera at a QR code to scan'
//           : 'You can also check by entering a license plate above'}
//       </div>
//     </div>
//   );
// }

// export default StatusCheck;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Camera, XCircle } from 'lucide-react';
// import QrScanner from 'react-qr-scanner';

// function StatusCheck() {
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [manualPlate, setManualPlate] = useState('');

//   const handleScan = async (result) => {
//     if (result?.text) {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/status`,
//           { qrcodeUrl: result.text }
//         );
//         setStatus(response.data);
//       } catch (err) {
//         console.error(err);
//         setStatus(null);
//         setError(err.response?.data?.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//         setScanning(false);
//       }
//     }
//   };

//   const handleError = (error) => {
//     setError('Camera access error: ' + error.message);
//   };

//   const handleManualCheck = async () => {
//     const upperCasePlate = manualPlate.trim().toUpperCase();
//     if (!upperCasePlate) return;

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/status`,
//         { l_no: upperCasePlate }
//       );
//       setStatus(response.data);
//     } catch (err) {
//       console.error(err);
//       setStatus(null);
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       {/* Manual License Plate Entry */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter License Plate"
//           value={manualPlate}
//           onChange={(e) => setManualPlate(e.target.value.toUpperCase())}
//           className="flex-1 px-3 py-2 border rounded-md text-sm uppercase"
//         />
//         <button
//           onClick={handleManualCheck}
//           className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
//         >
//           Check
//         </button>
//       </div>

//       {/* QR Scanner */}
//       {!scanning ? (
//         <button
//           onClick={() => setScanning(true)}
//           className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Camera className="h-5 w-5 mr-2" />
//           Start Scanning
//         </button>
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => setScanning(false)}
//             className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
//           >
//             <XCircle className="h-6 w-6 text-gray-600" />
//           </button>
//           <div className="overflow-hidden rounded-lg">
//             <QrScanner
//               constraints={{ video: { facingMode: 'environment' } }}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: '100%' }}
//             />
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="text-sm text-blue-600 text-center">Fetching status...</div>
//       )}

//       {error && (
//         <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>
//       )}

//       {status && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <h3 className="text-lg font-medium text-gray-900">User Status</h3>
//           <dl className="mt-2 space-y-2">
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Name</dt>
//               <dd className="text-sm text-gray-900">{status.name}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
//               <dd className="text-sm text-gray-900">{status.phone}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">License Number</dt>
//               <dd className="text-sm text-gray-900">{status.license_plate}</dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Current Check-in</dt>
//               <dd className="text-sm text-gray-900">
//                 {status.currentCheckIn
//                   ? new Date(status.currentCheckIn).toLocaleString()
//                   : 'Not checked in'}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-sm font-medium text-gray-500">Status</dt>
//               <dd
//                 className={`text-sm font-medium ${
//                   status.isParked ? 'text-green-600' : 'text-red-600'
//                 }`}
//               >
//                 {status.isParked ? 'Checked In' : 'Checked Out'}
//               </dd>
//             </div>
//           </dl>

//           {status.logs?.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-md font-semibold text-gray-700">Visit History</h4>
//               <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
//                 {status.logs.map((log, idx) => (
//                   <li key={idx}>
//                     In: {new Date(log.checkIn).toLocaleString()} → Out:{' '}
//                     {log.checkOut ? new Date(log.checkOut).toLocaleString() : 'N/A'}
//                     {' — '}
//                     {log.duration?.toFixed(2) ?? '0'} hrs
//                     {log.amount ? ` — ₹${log.amount}` : ''}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="text-center text-sm text-gray-500">
//         {scanning
//           ? 'Point your camera at a QR code to scan'
//           : 'You can also check by entering a license plate above'}
//       </div>
//     </div>
//   );
// }

// export default StatusCheck;

import React, { useState } from 'react';
import axios from 'axios';
import { Camera, XCircle } from 'lucide-react';
import QrScanner from 'react-qr-scanner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function StatusCheck() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualPlate, setManualPlate] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const handleScan = async (result) => {
    if (result?.text) {
      await fetchStatus({ qrcodeUrl: result.text });
      setScanning(false);
    }
  };

  const handleManualCheck = async () => {
    const upperCasePlate = manualPlate.trim().toUpperCase();
    if (!upperCasePlate) return;
    await fetchStatus({ l_no: upperCasePlate });
  };

  const fetchStatus = async (payload) => {
    setLoading(true);
    setError('');
    setFilteredLogs([]);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/status`, payload);
      setStatus(response.data);
    } catch (err) {
      console.error(err);
      setStatus(null);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchLogsByDate = async () => {
    if (!status?.license_plate) return;
    const payload = { l_no: status.license_plate };

    if (fromDate && toDate) {
      payload.from = fromDate.toISOString();
      payload.to = toDate.toISOString();
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/status`, payload);
      setFilteredLogs(response.data.logs || []);
    } catch (err) {
      console.error(err);
      setError('Could not fetch logs.');
      setFilteredLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    setError('Camera access error: ' + error.message);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 px-4">
      {/* Manual Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter License Plate"
          value={manualPlate}
          onChange={(e) => setManualPlate(e.target.value.toUpperCase())}
          className="flex-1 px-3 py-2 border rounded-md text-sm uppercase"
        />
        <button
          onClick={handleManualCheck}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
        >
          Check
        </button>
      </div>

      {/* QR Scanner */}
      {!scanning ? (
        <button
          onClick={() => setScanning(true)}
          className="w-full flex justify-center items-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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

      {/* Status Details */}
      {loading && <div className="text-center text-sm text-blue-600">Loading...</div>}

      {error && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">{error}</div>}

      {status && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">User Status</h3>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{status.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="text-sm text-gray-900">{status.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">License Number</dt>
                <dd className="text-sm text-gray-900">{status.license_plate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Check-in</dt>
                <dd className="text-sm text-gray-900">
                  {status.currentCheckIn
                    ? new Date(status.currentCheckIn).toLocaleString()
                    : 'Not checked in'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd
                  className={`text-sm font-medium ${
                    status.isParked ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status.isParked ? 'Checked In' : 'Checked Out'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Latest Log */}
          {filteredLogs.length === 0 && status.logs?.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-700">Latest Log</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
                <li>
                  In: {new Date(status.logs[0].checkIn).toLocaleString()} → Out:{' '}
                  {status.logs[0].checkOut
                    ? new Date(status.logs[0].checkOut).toLocaleString()
                    : 'N/A'}{' '}
                  — {status.logs[0].duration?.toFixed(2) ?? '0'} hrs
                  {status.logs[0].amount ? ` — ₹${status.logs[0].amount}` : ''}
                </li>
              </ul>
            </div>
          )}

          {/* Date Range Picker */}
          <div className="space-y-2">
            <h4 className="text-md font-semibold text-gray-700">Search Logs by Date</h4>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
              <div className="flex flex-col text-sm flex-1">
                <label className="mb-1 text-gray-600">From:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  className="border px-3 py-1 rounded-md text-sm"
                  maxDate={new Date()}
                  placeholderText="Start Date"
                />
              </div>

              <div className="flex flex-col text-sm flex-1">
                <label className="mb-1 text-gray-600">To:</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  className="border px-3 py-1 rounded-md text-sm"
                  maxDate={new Date()}
                  placeholderText="End Date"
                />
              </div>

              <button
                onClick={fetchLogsByDate}
                className="sm:self-end px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </div>

          {/* Filtered Logs */}
          {filteredLogs.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-700">Logs in Selected Range</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
                {filteredLogs.map((log, idx) => (
                  <li key={idx}>
                    In: {new Date(log.checkIn).toLocaleString()} → Out:{' '}
                    {log.checkOut ? new Date(log.checkOut).toLocaleString() : 'N/A'} —{' '}
                    {log.duration?.toFixed(2) ?? '0'} hrs
                    {log.amount ? ` — ₹${log.amount}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        {scanning
          ? 'Point your camera at a QR code to scan'
          : 'You can also check by entering a license plate above'}
      </div>
    </div>
  );
}

export default StatusCheck;


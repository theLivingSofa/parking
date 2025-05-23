// import React, { useState } from 'react';
// import axios from 'axios';
// import { QRCodeSVG } from 'qrcode.react';
// import { Download, UserPlus, Phone, Car } from 'lucide-react';

// function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     p_no: '',
//     l_no: ''
//   });
//   const [qrCode, setQrCode] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData);
//       const response = await axios.post("https://parking-production-735c.up.railway.app/api/register", formData);

//       console.log("response",response)
//       setQrCode(response.data.user.qrcodeUrl);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const downloadQR = () => {
//     if (!qrCode) return;
  
//     const downloadLink = document.createElement('a');
//     downloadLink.href = qrCode;
//     downloadLink.download = `qr-code-${formData.name}.png`;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="p-8">
//         <div className="flex items-center justify-center mb-6">
//           <UserPlus className="h-10 w-10 text-indigo-600" />
//           <h2 className="ml-3 text-2xl font-bold text-gray-900">Vehicle Registration</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   placeholder="Eg. John Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="p_no" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="p_no"
//                   id="p_no"
//                   required
//                   value={formData.p_no}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   placeholder="Eg. 9876543210"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="l_no" className="block text-sm font-medium text-gray-700 mb-1">
//                 License Number
//               </label>
//               <div className="relative">
//                 <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="l_no"
//                   id="l_no"
//                   required
//                   value={formData.l_no}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   placeholder="Eg. MH12AB1234"
//                 />
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="p-4 bg-red-50 rounded-lg">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//           >
//             <UserPlus className="h-5 w-5 mr-2" />
//             Register Vehicle
//           </button>
//         </form>

//         {qrCode && (
//           <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Your QR Code</h3>
//             <div className="inline-block p-4 bg-white rounded-lg shadow-md mb-4">
//             <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
//             </div>
//             <button
//               onClick={downloadQR}
//               className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//             >
//               <Download className="h-5 w-5 mr-2" />
//               Download QR Code
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RegistrationForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Download, UserPlus, Phone, Car } from 'lucide-react';

// function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     p_no: '',
//     l_no: ''
//   });

//   const [qrCode, setQrCode] = useState(null);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: name === 'name' || name === 'l_no' ? value.toUpperCase() : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://parking-production-735c.up.railway.app/api/register", formData);
//       setQrCode(response.data.user.qrcodeUrl);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };

//   const downloadQR = () => {
//     if (!qrCode) return;

//     const downloadLink = document.createElement('a');
//     downloadLink.href = qrCode;
//     downloadLink.download = `qr-code-${formData.name}.png`;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="p-8">
//         <div className="flex items-center justify-center mb-6">
//           <UserPlus className="h-10 w-10 text-indigo-600" />
//           <h2 className="ml-3 text-2xl font-bold text-gray-900">Vehicle Registration</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             {/* Name Field */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 uppercase"
//                   placeholder="Eg. JOHN DOE"
//                 />
//               </div>
//             </div>

//             {/* Phone Number Field */}
//             <div>
//               <label htmlFor="p_no" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="p_no"
//                   id="p_no"
//                   required
//                   value={formData.p_no}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   placeholder="Eg. 9876543210"
//                 />
//               </div>
//             </div>

//             {/* License Number Field */}
//             <div>
//               <label htmlFor="l_no" className="block text-sm font-medium text-gray-700 mb-1">
//                 License Number
//               </label>
//               <div className="relative">
//                 <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="l_no"
//                   id="l_no"
//                   required
//                   value={formData.l_no}
//                   onChange={handleChange}
//                   className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 uppercase"
//                   placeholder="Eg. MH12AB1234"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Error Handling */}
//           {error && (
//             <div className="p-4 bg-red-50 rounded-lg">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//           >
//             <UserPlus className="h-5 w-5 mr-2" />
//             Register Vehicle
//           </button>
//         </form>

//         {/* QR Code Display */}
//         {qrCode && (
//           <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Your QR Code</h3>
//             <div className="inline-block p-4 bg-white rounded-lg shadow-md mb-4">
//               <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
//             </div>
//             <button
//               onClick={downloadQR}
//               className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//             >
//               <Download className="h-5 w-5 mr-2" />
//               Download QR Code
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RegistrationForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Download, UserPlus, Phone, Car } from 'lucide-react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    p_no: '',
    l_no: ''
  });

  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'name' || name === 'l_no' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const licenseRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
  if (!licenseRegex.test(formData.l_no)) {
    setError("License plate must be in format AB12AB1234");
    return;
  }

    try {
      const response = await axios.post("https://parking-production-735c.up.railway.app/api/register", formData);
      setQrCode(response.data.user.qrcodeUrl);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const downloadLink = document.createElement('a');
    downloadLink.href = qrCode;
    downloadLink.download = `qr-code-${formData.l_no}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const printQR = () => {
    const printWindow = window.open('', '', 'width=300,height=300');
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            @page {
              size: 80mm 80mm;
              margin: 0;
            }
  
            html, body {
              margin: 0;
              padding: 0;
              width: 80mm;
              height: 80mm;
            }
  
            body {
              display: flex;
              justify-content: center;
              align-items: center;
            }
  
            img {
              width: 100%;
              height: auto;
              max-width: 80mm;
              max-height: 80mm;
              display: block;
            }
          </style>
        </head>
        <body>
          <img src="${qrCode}" alt="QR Code" />
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus();
  
    // Delay to ensure QR is loaded before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };
  
  

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="h-10 w-10 text-indigo-600" />
          <h2 className="ml-3 text-2xl font-bold text-gray-900">Vehicle Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 uppercase"
                  placeholder="Eg. Ayush Agrawal"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="p_no" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="p_no"
                  id="p_no"
                  required
                  value={formData.p_no}
                  onChange={handleChange}
                  className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="EG. 9876543210"
                />
              </div>
            </div>

            {/* License Number Field */}
            <div>
              <label htmlFor="l_no" className="block text-sm font-medium text-gray-700 mb-1">
                License Number
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="l_no"
                  id="l_no"
                  required
                  value={formData.l_no}
                  onChange={handleChange}
                  className="pl-10 p-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 uppercase"
                  placeholder="Eg. MH12AB1234"
                />
              </div>
            </div>
          </div>

          {/* Error Handling */}
          {error && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Register Vehicle
          </button>
        </form>

        {/* QR Code Display */}
        {qrCode && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your QR Code</h3>
            <div className="inline-block p-4 bg-white rounded-lg shadow-md mb-4">
              <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
            </div>
            <button
              onClick={downloadQR}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download QR Code
            </button>

            {/* 🖨 Print Button */}
            <button
              onClick={printQR}
              className="w-full mt-3 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              🖨 Print QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;

import { useState } from 'react';
import BillForm from '../BillForm';

export default function BillFormExample() {
  const [formData, setFormData] = useState({
    brandTemplate: 'indianoil',
    stationName: 'Bharat Petroleum',
    stationLocation: 'BANGALORE 73',
    stationCode: '73',
    phoneNumber: '+91 1234567890',
    receiptNumber: '3294',
    nozzleNumber: 'NO1',
    productType: 'Petrol',
    presetType: 'Amount',
    ratePerLitre: 106.34,
    volume: 11,
    amount: 1170,
    atotCode: '',
    vtotCode: '',
    vehicleNumber: '',
    mobileNumber: '',
    billDate: new Date().toISOString().split('T')[0],
    billTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    gstTin: '',
    txnNumber: '',
    attendant: 'Not Available',
    welcomeMessage: 'WELCOMES YOU',
    footerMessage: 'Thank You! Visit Again'
  });

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateCodes = () => {
    const atot = Math.floor(Math.random() * 900000) + 100000;
    const vtot = Math.floor(Math.random() * 900000) + 100000;
    setFormData(prev => ({
      ...prev,
      atotCode: atot.toString(),
      vtotCode: vtot.toString()
    }));
  };

  return (
    <div className="max-w-2xl">
      <BillForm 
        formData={formData} 
        onFormChange={handleFormChange}
        onGenerateCodes={handleGenerateCodes}
      />
    </div>
  );
}

import { useState, useRef } from 'react';
import BillForm from '@/components/BillForm';
import ReceiptPreview from '@/components/ReceiptPreview';
import ActionBar from '@/components/ActionBar';

export default function Home() {
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    brandTemplate: 'bharat',
    stationName: 'Bharat Petroleum',
    stationLocation: 'BANGALORE 73',
    stationCode: '73',
    phoneNumber: 'NO: 12345',
    receiptNumber: '3294',
    nozzleNumber: 'NO1',
    fipNumber: '',
    productType: 'Petrol',
    presetType: 'Amount',
    ratePerLitre: 106.34,
    volume: 11,
    amount: 1170,
    atotCode: '',
    vtotCode: '',
    vehicleNumber: '',
    mobileNumber: '',
    customerName: '',
    billDate: new Date().toISOString().split('T')[0],
    billTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    cstNumber: '',
    lstNumber: '',
    vatNumber: '',
    gstTin: '',
    txnNumber: '',
    attendant: 'Not Available',
    fccNumber: 'Not Available',
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `fuel-bill-${formData.receiptNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download feature requires additional setup. Use Print instead.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form?')) {
      setFormData({
        brandTemplate: 'bharat',
        stationName: 'Bharat Petroleum',
        stationLocation: 'BANGALORE 73',
        stationCode: '73',
        phoneNumber: 'NO: 12345',
        receiptNumber: '3294',
        nozzleNumber: 'NO1',
        fipNumber: '',
        productType: 'Petrol',
        presetType: 'Amount',
        ratePerLitre: 106.34,
        volume: 11,
        amount: 1170,
        atotCode: '',
        vtotCode: '',
        vehicleNumber: '',
        mobileNumber: '',
        customerName: '',
        billDate: new Date().toISOString().split('T')[0],
        billTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        cstNumber: '',
        lstNumber: '',
        vatNumber: '',
        gstTin: '',
        txnNumber: '',
        attendant: 'Not Available',
        fccNumber: 'Not Available',
        welcomeMessage: 'WELCOMES YOU',
        footerMessage: 'Thank You! Visit Again'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ActionBar 
        onPrint={handlePrint}
        onDownload={handleDownload}
        onReset={handleReset}
      />
      
      <div className="grid lg:grid-cols-2 gap-6 p-6">
        <div className="lg:max-h-[calc(100vh-120px)] overflow-y-auto">
          <BillForm 
            formData={formData} 
            onFormChange={handleFormChange}
            onGenerateCodes={handleGenerateCodes}
          />
        </div>
        
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] overflow-y-auto">
          <ReceiptPreview ref={receiptRef} formData={formData} />
        </div>
      </div>
    </div>
  );
}

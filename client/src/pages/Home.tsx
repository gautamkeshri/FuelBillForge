import { useState, useRef, useEffect } from 'react';
import BillForm from '@/components/BillForm';
import ReceiptPreview from '@/components/ReceiptPreview';
import ActionBar from '@/components/ActionBar';

export default function Home() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [customLogo, setCustomLogo] = useState<string>('');
  
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
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate based on preset type
      if (field === 'ratePerLitre' || field === 'volume' || field === 'amount') {
        if (prev.presetType === 'Amount' && (field === 'ratePerLitre' || field === 'amount')) {
          // Calculate volume when amount or rate changes
          const rate = field === 'ratePerLitre' ? value : prev.ratePerLitre;
          const amt = field === 'amount' ? value : prev.amount;
          if (rate > 0) {
            newData.volume = parseFloat((amt / rate).toFixed(2));
          }
        } else if (prev.presetType === 'Litres' && (field === 'ratePerLitre' || field === 'volume')) {
          // Calculate amount when volume or rate changes
          const rate = field === 'ratePerLitre' ? value : prev.ratePerLitre;
          const vol = field === 'volume' ? value : prev.volume;
          newData.amount = parseFloat((rate * vol).toFixed(2));
        }
      }

      // Update brand-specific values when template changes
      if (field === 'brandTemplate') {
        const brandDefaults: Record<string, any> = {
          indianoil: {
            stationName: 'Indian Oil',
            welcomeMessage: 'WELCOMES YOU'
          },
          bharat: {
            stationName: 'Bharat Petroleum',
            welcomeMessage: 'WELCOMES YOU'
          },
          hp: {
            stationName: 'HP Oil',
            welcomeMessage: 'WELCOMES YOU'
          },
          essar: {
            stationName: 'Essar Oil',
            welcomeMessage: 'WELCOMES YOU'
          }
        };
        
        if (brandDefaults[value] && value !== 'custom') {
          Object.assign(newData, brandDefaults[value]);
        }
      }
      
      return newData;
    });
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

  // Auto-generate transaction codes on mount
  useEffect(() => {
    handleGenerateCodes();
  }, []);

  const handleLogoUpload = (logoUrl: string) => {
    setCustomLogo(logoUrl);
  };

  const handleLogoRemove = () => {
    setCustomLogo('');
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
        scale: 3,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `fuel-bill-${formData.receiptNumber || 'receipt'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download receipt. Please use the Print option instead.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form?')) {
      const atot = Math.floor(Math.random() * 900000) + 100000;
      const vtot = Math.floor(Math.random() * 900000) + 100000;
      
      setFormData({
        brandTemplate: 'bharat',
        stationName: 'Bharat Petroleum',
        stationLocation: 'BANGALORE 73',
        stationCode: '73',
        phoneNumber: 'NO: 12345',
        receiptNumber: String(Math.floor(Math.random() * 9000) + 1000),
        nozzleNumber: 'NO1',
        fipNumber: '',
        productType: 'Petrol',
        presetType: 'Amount',
        ratePerLitre: 106.34,
        volume: 11,
        amount: 1170,
        atotCode: atot.toString(),
        vtotCode: vtot.toString(),
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
      setCustomLogo('');
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
            customLogo={customLogo}
            onLogoUpload={handleLogoUpload}
            onLogoRemove={handleLogoRemove}
          />
        </div>
        
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] overflow-y-auto">
          <ReceiptPreview ref={receiptRef} formData={formData} customLogo={customLogo} />
        </div>
      </div>
    </div>
  );
}

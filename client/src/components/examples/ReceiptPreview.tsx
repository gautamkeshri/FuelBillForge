import ReceiptPreview from '../ReceiptPreview';

export default function ReceiptPreviewExample() {
  const sampleData = {
    brandTemplate: 'indianoil',
    stationName: 'Bharat Petroleum',
    stationLocation: 'BANGALORE 73',
    stationCode: '73',
    phoneNumber: 'NO: 12345',
    receiptNumber: '3294',
    nozzleNumber: 'NO1',
    productType: 'Petrol',
    presetType: 'Amount',
    ratePerLitre: 106.34,
    volume: 11,
    amount: 1170,
    atotCode: '123456',
    vtotCode: '654321',
    vehicleNumber: '',
    mobileNumber: '',
    billDate: '2025-10-15',
    billTime: '13:43',
    gstTin: '',
    txnNumber: '',
    attendant: 'Not Available',
    welcomeMessage: 'WELCOMES YOU',
    footerMessage: 'Thank You! Visit Again'
  };

  return <ReceiptPreview formData={sampleData} />;
}

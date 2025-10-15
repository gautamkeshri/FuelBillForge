import { z } from "zod";

export const fuelBillSchema = z.object({
  // Branding
  brandTemplate: z.enum(['indianoil', 'bharat', 'hp', 'essar', 'custom']),
  customLogo: z.string().optional(),
  welcomeMessage: z.string().default('WELCOMES YOU'),
  
  // Station Info
  stationName: z.string(),
  stationLocation: z.string(),
  stationCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  
  // Bill Details
  receiptNumber: z.string(),
  localId: z.string().optional(),
  fipNumber: z.string().optional(),
  nozzleNumber: z.string().optional(),
  productType: z.enum(['Petrol', 'Diesel', 'CNG']),
  presetType: z.enum(['Amount', 'Litres']),
  ratePerLitre: z.number(),
  volume: z.number(),
  amount: z.number(),
  
  // Transaction Codes
  atotCode: z.string(),
  vtotCode: z.string(),
  
  // Customer Info
  vehicleNumber: z.string().optional(),
  mobileNumber: z.string().optional(),
  customerName: z.string().optional(),
  
  // Date/Time
  billDate: z.string(),
  billTime: z.string(),
  
  // Regulatory
  cstNumber: z.string().optional(),
  lstNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  gstTin: z.string().optional(),
  txnNumber: z.string().optional(),
  attendant: z.string().default('Not Available'),
  fccNumber: z.string().default('Not Available'),
  
  // Footer
  footerMessage: z.string().default('Thank You! Visit Again'),
});

export type FuelBill = z.infer<typeof fuelBillSchema>;

export const brandTemplates = {
  indianoil: {
    name: 'Indian Oil',
    color: '14 85% 50%',
    logo: 'indianoil'
  },
  bharat: {
    name: 'Bharat Petroleum',
    color: '140 65% 42%',
    logo: 'bharat'
  },
  hp: {
    name: 'HP Oil',
    color: '0 85% 45%',
    logo: 'hp'
  },
  essar: {
    name: 'Essar Oil',
    color: '220 70% 50%',
    logo: 'essar'
  },
  custom: {
    name: 'Custom',
    color: '14 85% 50%',
    logo: 'custom'
  }
};

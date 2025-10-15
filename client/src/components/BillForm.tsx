import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, RefreshCw, X } from "lucide-react";
import BrandSelector from "./BrandSelector";

interface BillFormProps {
  formData: any;
  onFormChange: (field: string, value: any) => void;
  onGenerateCodes: () => void;
  customLogo?: string;
  onLogoUpload?: (logoUrl: string) => void;
  onLogoRemove?: () => void;
}

export default function BillForm({ 
  formData, 
  onFormChange, 
  onGenerateCodes,
  customLogo,
  onLogoUpload,
  onLogoRemove 
}: BillFormProps) {
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onLogoUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoUpload(reader.result as string);
        onFormChange('brandTemplate', 'custom');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold">Bill Generator</h2>
      
      <BrandSelector 
        selectedBrand={formData.brandTemplate} 
        onBrandChange={(brand) => onFormChange('brandTemplate', brand)} 
      />

      {formData.brandTemplate === 'custom' && (
        <Card className="p-4 space-y-3">
          <h3 className="font-medium text-sm">Custom Logo</h3>
          
          {customLogo ? (
            <div className="flex items-center gap-3">
              <img src={customLogo} alt="Custom logo" className="w-16 h-16 object-contain" />
              <Button 
                onClick={onLogoRemove} 
                variant="outline" 
                size="sm"
                data-testid="button-remove-logo"
              >
                <X className="w-4 h-4 mr-2" />
                Remove Logo
              </Button>
            </div>
          ) : (
            <div>
              <Label htmlFor="logoUpload" className="cursor-pointer">
                <div className="border-2 border-dashed rounded-md p-6 text-center hover-elevate active-elevate-2 transition-all">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload logo</p>
                </div>
                <Input
                  id="logoUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                  data-testid="input-logo-upload"
                />
              </Label>
            </div>
          )}
        </Card>
      )}

      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-sm">Station Information</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="stationName" className="text-sm">Station Name</Label>
            <Input
              id="stationName"
              data-testid="input-station-name"
              value={formData.stationName}
              onChange={(e) => onFormChange('stationName', e.target.value)}
              placeholder="Bharat Petroleum"
            />
          </div>

          <div>
            <Label htmlFor="stationLocation" className="text-sm">Location</Label>
            <Input
              id="stationLocation"
              data-testid="input-station-location"
              value={formData.stationLocation}
              onChange={(e) => onFormChange('stationLocation', e.target.value)}
              placeholder="BANGALORE 73"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="stationCode" className="text-sm">Station Code</Label>
              <Input
                id="stationCode"
                data-testid="input-station-code"
                value={formData.stationCode}
                onChange={(e) => onFormChange('stationCode', e.target.value)}
                placeholder="73"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm">Phone Number</Label>
              <Input
                id="phoneNumber"
                data-testid="input-phone-number"
                value={formData.phoneNumber}
                onChange={(e) => onFormChange('phoneNumber', e.target.value)}
                placeholder="+91 1234567890"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-sm">Bill Details</h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="receiptNumber" className="text-sm">Receipt Number</Label>
              <Input
                id="receiptNumber"
                data-testid="input-receipt-number"
                value={formData.receiptNumber}
                onChange={(e) => onFormChange('receiptNumber', e.target.value)}
                placeholder="3294"
              />
            </div>

            <div>
              <Label htmlFor="localId" className="text-sm">Local ID</Label>
              <Input
                id="localId"
                data-testid="input-local-id"
                value={formData.localId}
                onChange={(e) => onFormChange('localId', e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fipNumber" className="text-sm">FIP Number</Label>
              <Input
                id="fipNumber"
                data-testid="input-fip-number"
                value={formData.fipNumber}
                onChange={(e) => onFormChange('fipNumber', e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="nozzleNumber" className="text-sm">Nozzle</Label>
              <Input
                id="nozzleNumber"
                data-testid="input-nozzle-number"
                value={formData.nozzleNumber}
                onChange={(e) => onFormChange('nozzleNumber', e.target.value)}
                placeholder="NO1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="productType" className="text-sm">Fuel Type</Label>
              <Select value={formData.productType} onValueChange={(value) => onFormChange('productType', value)}>
                <SelectTrigger id="productType" data-testid="select-product-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="presetType" className="text-sm">Preset Type</Label>
              <Select value={formData.presetType} onValueChange={(value) => onFormChange('presetType', value)}>
                <SelectTrigger id="presetType" data-testid="select-preset-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amount">Amount</SelectItem>
                  <SelectItem value="Litres">Litres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="ratePerLitre" className="text-sm">Rate/L</Label>
              <Input
                id="ratePerLitre"
                data-testid="input-rate"
                type="number"
                step="0.01"
                value={formData.ratePerLitre}
                onChange={(e) => onFormChange('ratePerLitre', parseFloat(e.target.value) || 0)}
                placeholder="106.34"
              />
            </div>

            <div>
              <Label htmlFor="volume" className="text-sm">Volume (L)</Label>
              <Input
                id="volume"
                data-testid="input-volume"
                type="number"
                step="0.01"
                value={formData.volume}
                onChange={(e) => onFormChange('volume', parseFloat(e.target.value) || 0)}
                placeholder="11"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm">Amount (₹)</Label>
              <Input
                id="amount"
                data-testid="input-amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => onFormChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="1170"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="atotCode" className="text-sm">ATOT Code</Label>
              <Input
                id="atotCode"
                data-testid="input-atot"
                value={formData.atotCode}
                onChange={(e) => onFormChange('atotCode', e.target.value)}
                placeholder="Auto-generated"
              />
            </div>

            <div>
              <Label htmlFor="vtotCode" className="text-sm">VTOT Code</Label>
              <Input
                id="vtotCode"
                data-testid="input-vtot"
                value={formData.vtotCode}
                onChange={(e) => onFormChange('vtotCode', e.target.value)}
                placeholder="Auto-generated"
              />
            </div>
          </div>

          <Button 
            onClick={onGenerateCodes} 
            variant="outline" 
            size="sm" 
            className="w-full"
            data-testid="button-generate-codes"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Transaction Codes
          </Button>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-sm">Customer Information</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="vehicleNumber" className="text-sm">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              data-testid="input-vehicle-number"
              value={formData.vehicleNumber}
              onChange={(e) => onFormChange('vehicleNumber', e.target.value)}
              placeholder="KA01AB1234"
            />
          </div>

          <div>
            <Label htmlFor="mobileNumber" className="text-sm">Mobile Number</Label>
            <Input
              id="mobileNumber"
              data-testid="input-mobile-number"
              value={formData.mobileNumber}
              onChange={(e) => onFormChange('mobileNumber', e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-sm">Date & Time</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="billDate" className="text-sm">Date</Label>
            <Input
              id="billDate"
              data-testid="input-bill-date"
              type="date"
              value={formData.billDate}
              onChange={(e) => onFormChange('billDate', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="billTime" className="text-sm">Time</Label>
            <Input
              id="billTime"
              data-testid="input-bill-time"
              type="time"
              value={formData.billTime}
              onChange={(e) => onFormChange('billTime', e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-sm">Regulatory Details (Optional)</h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cstNumber" className="text-sm">CSI Number</Label>
              <Input
                id="cstNumber"
                data-testid="input-cst-number"
                value={formData.cstNumber}
                onChange={(e) => onFormChange('cstNumber', e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="lstNumber" className="text-sm">LST Number</Label>
              <Input
                id="lstNumber"
                data-testid="input-lst-number"
                value={formData.lstNumber}
                onChange={(e) => onFormChange('lstNumber', e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vatNumber" className="text-sm">VAT Number</Label>
              <Input
                id="vatNumber"
                data-testid="input-vat-number"
                value={formData.vatNumber}
                onChange={(e) => onFormChange('vatNumber', e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="attendant" className="text-sm">Attendant ID</Label>
              <Input
                id="attendant"
                data-testid="input-attendant"
                value={formData.attendant}
                onChange={(e) => onFormChange('attendant', e.target.value)}
                placeholder="Not Available"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fccDate" className="text-sm">FCC Date</Label>
              <Input
                id="fccDate"
                data-testid="input-fcc-date"
                type="date"
                value={formData.fccDate}
                onChange={(e) => onFormChange('fccDate', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="fccTime" className="text-sm">FCC Time</Label>
              <Input
                id="fccTime"
                data-testid="input-fcc-time"
                type="time"
                value={formData.fccTime}
                onChange={(e) => onFormChange('fccTime', e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="font-medium text-sm">Customize Messages</h3>
        
        <div>
          <Label htmlFor="welcomeMessage" className="text-sm">Welcome Message</Label>
          <Input
            id="welcomeMessage"
            data-testid="input-welcome-message"
            value={formData.welcomeMessage}
            onChange={(e) => onFormChange('welcomeMessage', e.target.value)}
            placeholder="WELCOMES YOU"
          />
        </div>

        <div>
          <Label htmlFor="footerMessage" className="text-sm">Footer Message</Label>
          <Textarea
            id="footerMessage"
            data-testid="input-footer-message"
            value={formData.footerMessage}
            onChange={(e) => onFormChange('footerMessage', e.target.value)}
            placeholder="Thank You! Visit Again"
            rows={2}
          />
        </div>
      </Card>
    </div>
  );
}

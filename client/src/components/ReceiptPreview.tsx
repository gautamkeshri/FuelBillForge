import { forwardRef } from 'react';
import indianOilLogo from '@assets/stock_images/pump-logo-indian-oil.webp';
import bharatLogo from '@assets/stock_images/pump-logo-bharat-petroleum.webp';
import hpLogo from '@assets/stock_images/pump-logo-hp.webp';
import essarLogo from '@assets/stock_images/pump-logo-essar-oil.webp';

interface ReceiptPreviewProps {
  formData: any;
  customLogo?: string;
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ formData, customLogo }, ref) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getBrandLogo = () => {
    const logoMap: Record<string, string> = {
      indianoil: indianOilLogo,
      bharat: bharatLogo,
      hp: hpLogo,
      essar: essarLogo,
    };
    return logoMap[formData.brandTemplate];
  };

  const displayLogo = formData.brandTemplate === 'custom' ? customLogo : getBrandLogo();

  // Common Header Component
  const renderHeader = () => (
    <div className="receipt-header">
      {displayLogo && (
        <img src={displayLogo} alt="Brand Logo" className="w-20 h-20 mx-auto mb-2 object-contain" />
      )}
      <div className="text-lg font-bold tracking-wide">{formData.stationName}</div>
      <div className="mt-1 text-[20px] font-bold">{formData.welcomeMessage}</div>
      <div className="divider-line"></div>
      {formData.stationLocation && (
        <div className="text-xs mt-2">{formData.stationLocation}</div>
      )}
      {formData.stationCode && (
        <div className="text-xs">{formData.stationCode}</div>
      )}
    </div>
  );

  // Indian Oil Template - Standard Layout
  const renderIndianOilTemplate = () => (
    <>
      <div className="receipt-section">
        <div className="receipt-line">
          <span>TEL NO:</span>
          <span>{formData.phoneNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>RECEIPT NO:</span>
          <span>{formData.receiptNumber}</span>
        </div>
        <div className="receipt-line">
          <span>FCC ID:</span>
          <span>{formData.localId || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>FIP NO:</span>
          <span>{formData.fipNumber || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>NOZZLE NO:</span>
          <span>{formData.nozzleNumber || 'NO1'}</span>
        </div>
        <div className="receipt-line">
          <span>PRODUCT:</span>
          <span>{formData.productType}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>PRESET TYPE:</span>
          <span>{formData.presetType}</span>
        </div>
        <div className="receipt-line">
          <span>RATE/L:</span>
          <span>Rs. {formData.ratePerLitre.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>VOLUME:</span>
          <span>{formData.volume.toFixed(2)} L</span>
        </div>
        <div className="receipt-line receipt-amount">
          <span>AMOUNT:</span>
          <span>Rs. {formData.amount.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>ATOT:</span>
          <span>{formData.atotCode || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>VTOT:</span>
          <span>{formData.vtotCode || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>VEHICLE NO:</span>
          <span>{formData.vehicleNumber || 'Not Entered'}</span>
        </div>
        <div className="receipt-line">
          <span>MOBILE NO:</span>
          <span>{formData.mobileNumber || 'Not Entered'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>DATE:</span>
          <span>{formatDate(formData.billDate)}</span>
        </div>
        <div className="receipt-line">
          <span>TIME:</span>
          <span>{formData.billTime}</span>
        </div>
      </div>

      {renderRegulatoryInfo(true)}
    </>
  );

  // Bharat Petroleum Template - Product First
  const renderBharatTemplate = () => (
    <>
      <div className="receipt-section">
        <div className="receipt-line">
          <span>DATE:</span>
          <span>{formatDate(formData.billDate)}</span>
        </div>
        <div className="receipt-line">
          <span>TIME:</span>
          <span>{formData.billTime}</span>
        </div>
        <div className="receipt-line">
          <span>TEL NO:</span>
          <span>{formData.phoneNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>PRODUCT:</span>
          <span>{formData.productType}</span>
        </div>
        <div className="receipt-line">
          <span>NOZZLE NO:</span>
          <span>{formData.nozzleNumber || 'NO1'}</span>
        </div>
        <div className="receipt-line">
          <span>RECEIPT NO:</span>
          <span>{formData.receiptNumber}</span>
        </div>
        <div className="receipt-line">
          <span>LOCAL ID:</span>
          <span>{formData.localId || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>FIP NO:</span>
          <span>{formData.fipNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>RATE/L:</span>
          <span>Rs. {formData.ratePerLitre.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>VOLUME:</span>
          <span>{formData.volume.toFixed(2)} L</span>
        </div>
        <div className="receipt-line receipt-amount">
          <span>AMOUNT:</span>
          <span>Rs. {formData.amount.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>PRESET TYPE:</span>
          <span>{formData.presetType}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>ATOT:</span>
          <span>{formData.atotCode || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>VTOT:</span>
          <span>{formData.vtotCode || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>VEHICLE NO:</span>
          <span>{formData.vehicleNumber || 'Not Entered'}</span>
        </div>
        <div className="receipt-line">
          <span>MOBILE NO:</span>
          <span>{formData.mobileNumber || 'Not Entered'}</span>
        </div>
      </div>

      {renderRegulatoryInfo()}
    </>
  );

  // HP Oil Template - Customer Info Early
  const renderHPTemplate = () => (
    <>
      <div className="receipt-section">
        <div className="receipt-line">
          <span>RECEIPT NO:</span>
          <span>{formData.receiptNumber}</span>
        </div>
        <div className="receipt-line">
          <span>LOCAL ID:</span>
          <span>{formData.localId || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>TEL NO:</span>
          <span>{formData.phoneNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>VEHICLE NO:</span>
          <span>{formData.vehicleNumber || 'Not Entered'}</span>
        </div>
        <div className="receipt-line">
          <span>MOBILE NO:</span>
          <span>{formData.mobileNumber || 'Not Entered'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>PRODUCT:</span>
          <span>{formData.productType}</span>
        </div>
        <div className="receipt-line">
          <span>NOZZLE NO:</span>
          <span>{formData.nozzleNumber || 'NO1'}</span>
        </div>
        <div className="receipt-line">
          <span>FIP NO:</span>
          <span>{formData.fipNumber || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>PRESET TYPE:</span>
          <span>{formData.presetType}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>RATE/L:</span>
          <span>Rs. {formData.ratePerLitre.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>VOLUME:</span>
          <span>{formData.volume.toFixed(2)} L</span>
        </div>
        <div className="receipt-line receipt-amount">
          <span>AMOUNT:</span>
          <span>Rs. {formData.amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>ATOT:</span>
          <span>{formData.atotCode || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>VTOT:</span>
          <span>{formData.vtotCode || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>DATE:</span>
          <span>{formatDate(formData.billDate)}</span>
        </div>
        <div className="receipt-line">
          <span>TIME:</span>
          <span>{formData.billTime}</span>
        </div>
      </div>

      {renderRegulatoryInfo()}
    </>
  );

  // Essar Oil Template - Date/Time at Top
  const renderEssarTemplate = () => (
    <>
      <div className="receipt-section">
        <div className="receipt-line">
          <span>DATE:</span>
          <span>{formatDate(formData.billDate)}</span>
        </div>
        <div className="receipt-line">
          <span>TIME:</span>
          <span>{formData.billTime}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>RECEIPT NO:</span>
          <span>{formData.receiptNumber}</span>
        </div>
        <div className="receipt-line">
          <span>LOCAL ID:</span>
          <span>{formData.localId || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>FIP NO:</span>
          <span>{formData.fipNumber || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>TEL NO:</span>
          <span>{formData.phoneNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>PRODUCT:</span>
          <span>{formData.productType}</span>
        </div>
        <div className="receipt-line">
          <span>NOZZLE NO:</span>
          <span>{formData.nozzleNumber || 'NO1'}</span>
        </div>
        <div className="receipt-line">
          <span>VEHICLE NO:</span>
          <span>{formData.vehicleNumber || 'Not Entered'}</span>
        </div>
        <div className="receipt-line">
          <span>MOBILE NO:</span>
          <span>{formData.mobileNumber || 'Not Entered'}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>PRESET TYPE:</span>
          <span>{formData.presetType}</span>
        </div>
        <div className="receipt-line">
          <span>RATE/L:</span>
          <span>Rs. {formData.ratePerLitre.toFixed(2)}</span>
        </div>
        <div className="receipt-line">
          <span>VOLUME:</span>
          <span>{formData.volume.toFixed(2)} L</span>
        </div>
        <div className="receipt-line receipt-amount">
          <span>AMOUNT:</span>
          <span>Rs. {formData.amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="receipt-section">
        <div className="receipt-line">
          <span>ATOT:</span>
          <span>{formData.atotCode || 'N/A'}</span>
        </div>
        <div className="receipt-line">
          <span>VTOT:</span>
          <span>{formData.vtotCode || 'N/A'}</span>
        </div>
      </div>

      {renderRegulatoryInfo()}
    </>
  );

  // Regulatory Information Component (shared)
  const renderRegulatoryInfo = (alwaysShow: boolean = false) => {
    if (alwaysShow) {
      // IndianOil: Always show all fields with "Not Available" as default
      return (
        <div className="receipt-section text-[9px]">
          <div className="receipt-line">
            <span>CST NO:</span>
            <span>{formData.cstNumber || 'Not Available'}</span>
          </div>
          <div className="receipt-line">
            <span>LST NO:</span>
            <span>{formData.lstNumber || 'Not Available'}</span>
          </div>
          <div className="receipt-line">
            <span>VAT NO:</span>
            <span>{formData.vatNumber || 'Not Available'}</span>
          </div>
          <div className="receipt-line">
            <span>ATTENDANT ID:</span>
            <span>{formData.attendant || 'Not Available'}</span>
          </div>
          <div className="receipt-line">
            <span>FCC DATE:</span>
            <span>{formData.fccDate || 'Not Available'}</span>
          </div>
          <div className="receipt-line">
            <span>FCC TIME:</span>
            <span>{formData.fccTime || 'Not Available'}</span>
          </div>
        </div>
      );
    }

    // Other brands: Conditional rendering (only show if values exist)
    return (
      <div className="receipt-section text-[9px]">
        {formData.cstNumber && (
          <div className="receipt-line">
            <span>CST NO:</span>
            <span>{formData.cstNumber}</span>
          </div>
        )}
        {formData.lstNumber && (
          <div className="receipt-line">
            <span>LST NO:</span>
            <span>{formData.lstNumber}</span>
          </div>
        )}
        {formData.vatNumber && (
          <div className="receipt-line">
            <span>VAT NO:</span>
            <span>{formData.vatNumber}</span>
          </div>
        )}
        {formData.attendant && (
          <div className="receipt-line">
            <span>ATTENDANT ID:</span>
            <span>{formData.attendant}</span>
          </div>
        )}
        {formData.fccDate && (
          <div className="receipt-line">
            <span>FCC DATE:</span>
            <span>{formData.fccDate}</span>
          </div>
        )}
        {formData.fccTime && (
          <div className="receipt-line">
            <span>FCC TIME:</span>
            <span>{formData.fccTime}</span>
          </div>
        )}
      </div>
    );
  };

  // Footer Component (shared)
  const renderFooter = () => (
    <div className="receipt-footer">
      <div className="text-[11px] font-bold tracking-wide">
        {formData.footerMessage.split('\n').map((line: string, i: number) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );

  // Select template based on brand
  const renderTemplate = () => {
    switch (formData.brandTemplate) {
      case 'indianoil':
        return renderIndianOilTemplate();
      case 'bharat':
        return renderBharatTemplate();
      case 'hp':
        return renderHPTemplate();
      case 'essar':
        return renderEssarTemplate();
      case 'custom':
      default:
        return renderIndianOilTemplate(); // Default to Indian Oil layout for custom
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <div className="receipt-paper">
        <div 
          ref={ref}
          className="receipt-content"
          data-testid="receipt-preview"
        >
          {/* Torn Paper Top */}
          <div className="torn-top"></div>

          {/* Header */}
          {renderHeader()}

          {/* Brand-specific Template */}
          {renderTemplate()}

          {/* Footer */}
          {renderFooter()}

          {/* Torn Paper Bottom */}
          <div className="torn-bottom"></div>
        </div>
      </div>

      <style>{`
        .receipt-paper {
          width: 300px;
          background: #f8f8f8;
          border-radius: 3px;
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 10px 30px rgba(0, 0, 0, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .receipt-content {
          font-family: 'Courier New', Courier, monospace;
          background: #ffffff;
          color: #000000;
          padding: 20px 16px;
          font-size: 11px;
          line-height: 1.5;
          position: relative;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 0, 0, 0.015) 1px,
              rgba(0, 0, 0, 0.015) 2px
            );
        }

        .receipt-header {
          text-align: center;
          margin-bottom: 12px;
          padding-bottom: 10px;
        }

        .divider-line {
          width: 100%;
          height: 1px;
          background: #000;
          margin: 8px 0 4px 0;
        }

        .receipt-section {
          margin-bottom: 10px;
          padding-bottom: 8px;
        }

        .receipt-section:last-of-type {
          border-bottom: none;
        }

        .receipt-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
          font-size: 11px;
        }

        .receipt-totals {
          font-weight: 700;
        }

        .receipt-amount {
          font-size: 14px;
          font-weight: 400;
          margin-top: 4px;
          padding-top: 4px;
        }

        .receipt-footer {
          text-align: center;
          margin-top: 12px;
          padding-top: 10px;
          border-top: 2px solid #000;
        }

        .torn-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(
            -45deg,
            transparent 33.33%,
            #f8f8f8 33.33%,
            #f8f8f8 66.66%,
            transparent 66.66%
          );
          background-size: 8px 6px;
          background-repeat: repeat-x;
        }

        .torn-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(
            45deg,
            transparent 33.33%,
            #f8f8f8 33.33%,
            #f8f8f8 66.66%,
            transparent 66.66%
          );
          background-size: 8px 6px;
          background-repeat: repeat-x;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-paper {
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: none;
            background: white;
            border-radius: 0;
          }
          .receipt-paper,
          .receipt-paper * {
            visibility: visible;
          }
          .receipt-content {
            background: white;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
});

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;

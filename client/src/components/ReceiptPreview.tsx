import { forwardRef } from 'react';

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

  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <div className="receipt-paper">
        <div 
          ref={ref}
          className="receipt-content"
          data-testid="receipt-preview"
        >
          {/* Zigzag Top Border */}
          <div className="zigzag-top"></div>

          {/* Logo + Fuel Brand + Welcome Message */}
          <div className="receipt-header">
            {customLogo && formData.brandTemplate === 'custom' && (
              <img src={customLogo} alt="Logo" className="w-20 h-20 mx-auto mb-2 object-contain" />
            )}
            <div className="text-lg font-bold tracking-wide">{formData.stationName}</div>
            <div className="mt-1 text-[20px] font-bold">{formData.welcomeMessage}</div>
            {formData.stationLocation && (
              <div className="text-xs mt-2">{formData.stationLocation}</div>
            )}
            {formData.stationCode && (
              <div className="text-xs">{formData.stationCode}</div>
            )}
          </div>

          {/* Station Information */}
          <div className="receipt-section">
            <div className="receipt-line">
              <span>TEL NO:</span>
              <span>{formData.phoneNumber || 'N/A'}</span>
            </div>
          </div>

          {/* Receipt Details */}
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
              <span>NOZZLE NO:</span>
              <span>{formData.nozzleNumber || 'NO1'}</span>
            </div>
            <div className="receipt-line">
              <span>PRODUCT:</span>
              <span>{formData.productType}</span>
            </div>
          </div>

          {/* Transaction Details */}
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

          {/* Vehicle & Mobile */}
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

          {/* Date & Time */}
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

          {/* Regulatory Information */}
          <div className="receipt-section text-[9px]">
            {formData.cstNumber && (
              <div className="receipt-line">
                <span>CSI NO:</span>
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

          {/* Footer */}
          <div className="receipt-footer">
            <div className="text-[11px] font-bold tracking-wide">
              {formData.footerMessage.split('\n').map((line: string, i: number) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* Zigzag Bottom Border */}
          <div className="zigzag-bottom"></div>
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
          border-bottom: 2px solid #000;
        }

        .receipt-section {
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.4);
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
          border-bottom: 2px solid #000;
        }

        .receipt-amount {
          font-size: 14px;
          font-weight: 700;
          margin-top: 4px;
          padding-top: 4px;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
        }

        .receipt-footer {
          text-align: center;
          margin-top: 12px;
          padding-top: 10px;
          border-top: 2px solid #000;
        }

        .zigzag-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: 
            linear-gradient(135deg, #fff 25%, transparent 25%),
            linear-gradient(225deg, #fff 25%, transparent 25%);
          background-size: 10px 10px;
          background-position: 0 0, 5px 0;
        }

        .zigzag-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: 
            linear-gradient(45deg, #fff 25%, transparent 25%),
            linear-gradient(-45deg, #fff 25%, transparent 25%);
          background-size: 10px 10px;
          background-position: 0 0, 5px 0;
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

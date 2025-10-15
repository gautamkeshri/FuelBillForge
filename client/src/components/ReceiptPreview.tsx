import { forwardRef } from 'react';

interface ReceiptPreviewProps {
  formData: any;
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ formData }, ref) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex items-center justify-center p-6 bg-muted/30">
      <div 
        ref={ref}
        className="receipt-container bg-white text-black font-mono text-xs leading-relaxed shadow-lg"
        style={{ 
          width: '300px',
          padding: '16px 12px',
          position: 'relative'
        }}
        data-testid="receipt-preview"
      >
        {/* Zigzag Top Border */}
        <div className="zigzag-top"></div>

        {/* Brand Logo/Header */}
        <div className="text-center mb-3 pb-2 border-b border-black">
          <div className="text-lg font-bold mb-1">{formData.stationName}</div>
          <div className="text-xs">{formData.welcomeMessage}</div>
        </div>

        {/* Station Info */}
        <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60">
          <div className="flex justify-between">
            <span>TEL NO:</span>
            <span>{formData.phoneNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>RECEIPT NO:</span>
            <span>{formData.receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>FIP NO:</span>
            <span>{formData.fipNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>NOZZLE:</span>
            <span>{formData.nozzleNumber || 'NO1'}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60">
          <div className="flex justify-between">
            <span>PRODUCT:</span>
            <span>{formData.productType}</span>
          </div>
          <div className="flex justify-between">
            <span>PRESET TYPE:</span>
            <span>{formData.presetType}</span>
          </div>
          <div className="flex justify-between">
            <span>CUSTOMER NAME:</span>
            <span>{formData.customerName || 'N/A'}</span>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60">
          <div className="flex justify-between">
            <span>DATE:</span>
            <span>{formatDate(formData.billDate)}</span>
          </div>
          <div className="flex justify-between">
            <span>TIME:</span>
            <span>{formData.billTime}</span>
          </div>
          <div className="flex justify-between">
            <span>LST NO:</span>
            <span>{formData.lstNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>ATTENDANT NO:</span>
            <span>{formData.attendant}</span>
          </div>
        </div>

        {/* Bill Calculation */}
        <div className="space-y-1 mb-3 pb-2 border-b border-black font-bold">
          <div className="flex justify-between">
            <span>RATE/L:</span>
            <span>Rs. {formData.ratePerLitre.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VOLUME:</span>
            <span>{formData.volume.toFixed(2)} L</span>
          </div>
          <div className="flex justify-between text-base">
            <span>AMOUNT:</span>
            <span>Rs. {formData.amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Transaction Codes */}
        <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60">
          <div className="flex justify-between">
            <span>VTOT:</span>
            <span>{formData.vtotCode || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>ATOT:</span>
            <span>{formData.atotCode || 'N/A'}</span>
          </div>
        </div>

        {/* Vehicle & Mobile */}
        <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60">
          <div className="flex justify-between">
            <span>VEH TYPE:</span>
            <span>{formData.productType}</span>
          </div>
          <div className="flex justify-between">
            <span>VEH NO:</span>
            <span>{formData.vehicleNumber || 'Not Entered'}</span>
          </div>
          <div className="flex justify-between">
            <span>CUSTOMER MOBILE:</span>
            <span>{formData.mobileNumber || 'Not Entered'}</span>
          </div>
        </div>

        {/* Regulatory Info */}
        {(formData.gstTin || formData.txnNumber) && (
          <div className="space-y-1 mb-3 pb-2 border-b border-dashed border-black/60 text-[10px]">
            {formData.gstTin && (
              <div className="flex justify-between">
                <span>GST TIN:</span>
                <span>{formData.gstTin}</span>
              </div>
            )}
            {formData.txnNumber && (
              <div className="flex justify-between">
                <span>TXN NO:</span>
                <span>{formData.txnNumber}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-3 pt-2 border-t border-black">
          <div className="text-xs font-bold">
            {formData.footerMessage.split('\n').map((line: string, i: number) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>

        {/* Zigzag Bottom Border */}
        <div className="zigzag-bottom"></div>
      </div>

      <style>{`
        .receipt-container {
          font-family: 'Courier New', Courier, monospace;
        }

        .zigzag-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(135deg, #fff 25%, transparent 25%),
                      linear-gradient(225deg, #fff 25%, transparent 25%);
          background-size: 8px 8px;
          background-position: 0 0, 4px 0;
        }

        .zigzag-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(45deg, #fff 25%, transparent 25%),
                      linear-gradient(-45deg, #fff 25%, transparent 25%);
          background-size: 8px 8px;
          background-position: 0 0, 4px 0;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-container, .receipt-container * {
            visibility: visible;
          }
          .receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
});

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;

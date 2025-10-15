import ActionBar from '../ActionBar';

export default function ActionBarExample() {
  const handlePrint = () => console.log('Print triggered');
  const handleDownload = () => console.log('Download triggered');
  const handleReset = () => console.log('Reset triggered');

  return (
    <ActionBar 
      onPrint={handlePrint}
      onDownload={handleDownload}
      onReset={handleReset}
    />
  );
}

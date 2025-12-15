import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface JsonEditorProps {
  formData: any;
  onJsonChange: (data: any) => void;
}

export default function JsonEditor({ formData, onJsonChange }: JsonEditorProps) {
  const [jsonValue, setJsonValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync form data to JSON display
  useEffect(() => {
    setJsonValue(JSON.stringify(formData, null, 2));
  }, [formData]);

  const handleJsonEdit = (value: string) => {
    setJsonValue(value);

    try {
      const parsed = JSON.parse(value);
      setError(null);
      onJsonChange(parsed);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">JSON Data Editor</Label>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
        <textarea
          value={jsonValue}
          onChange={(e) => handleJsonEdit(e.target.value)}
          className="w-full h-64 p-3 font-mono text-xs border rounded-md bg-slate-50 dark:bg-slate-900"
          placeholder="JSON data will appear here..."
          spellCheck={false}
        />
      </div>
    </Card>
  );
}

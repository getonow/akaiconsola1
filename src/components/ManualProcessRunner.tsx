import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Loader2 } from 'lucide-react';

const processes = [
  'Benchmark 1',
  'Benchmark 2',
  'Benchmark 3',
  'Benchmark 4',
  'Market Index 1',
  'Market Index 2',
  'Market Index 3',
  'Contracts 1'
];

const API_URL = "https://akaiconsola1-backend.onrender.com/api/procurement-analysis";

const ManualProcessRunner: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState('');
  const [parameters, setParameters] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleExecute = async () => {
    if (!selectedProcess) return;

    setIsRunning(true);
    setOutput(`Starting ${selectedProcess}...\n`);

    if (selectedProcess === 'Benchmark 1') {
      // Call the new procurement analysis API for Benchmark 1
      try {
        setOutput(prev => prev + 'Initiating AI-powered procurement analysis...\n');
        setOutput(prev => prev + 'Analyzing market index data for June 2025...\n');
        
// ... inside the handleExecute function
const response = await fetch('https://akaiconsola1-backend.onrender.com/api/procurement-analysis', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ analysis_type: 'full' }),
});
// ...
        
        const data = await response.json();
        
        if (response.ok) {
          setOutput(prev => prev + 'Analysis complete!\n\n');
          setOutput(prev => prev + `Summary: ${data.summary}\n\n`);
          
          if (data.opportunities && data.opportunities.length > 0) {
            setOutput(prev => prev + 'Opportunities Found:\n');
            data.opportunities.forEach((opportunity: any, index: number) => {
              setOutput(prev => prev + `\n${index + 1}. ${opportunity.type} Opportunity:\n`);
              setOutput(prev => prev + `   Part Number: ${opportunity.part_number}\n`);
              setOutput(prev => prev + `   Current Supplier: ${opportunity.current_supplier}\n`);
              setOutput(prev => prev + `   Price & Trend: ${opportunity.current_price_and_trend}\n`);
              setOutput(prev => prev + `   Description: ${opportunity.description}\n`);
            });
          } else {
            setOutput(prev => prev + 'No cost-saving opportunities found in the current analysis.\n');
          }
          
          setOutput(prev => prev + `\nAnalysis completed at: ${data.analysis_timestamp}\n`);
          setOutput(prev => prev + 'Process completed successfully.');
        } else {
          setOutput(prev => prev + `Error: ${data.detail || 'Analysis failed'}\nProcess completed.`);
        }
      } catch (err: any) {
        setOutput(prev => prev + `Error: ${err.message}\nProcess completed.`);
      }
      setIsRunning(false);
    } else {
      // Simulate process execution for other processes
      setTimeout(() => {
        if (selectedProcess.includes('Benchmark')) {
          setOutput(prev => prev + 'Analyzing benchmark data...\n');
        } else if (selectedProcess.includes('Market Index')) {
          setOutput(prev => prev + 'Fetching market index data...\n');
        } else if (selectedProcess.includes('Contracts')) {
          setOutput(prev => prev + 'Processing contract data...\n');
        }
      }, 1000);

      setTimeout(() => {
        setOutput(prev => prev + 'Running analysis algorithms...\n');
      }, 2000);

      setTimeout(() => {
        setOutput(prev => prev + `${selectedProcess} analysis complete.\n`);
        setOutput(prev => prev + 'Results generated successfully.\n');
        setOutput(prev => prev + 'Process completed.');
        setIsRunning(false);
      }, 3500);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Manual Process Execution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="process-select">Select Process</Label>
          <Select value={selectedProcess} onValueChange={setSelectedProcess}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a process to execute" />
            </SelectTrigger>
            <SelectContent>
              {processes.map((process) => (
                <SelectItem key={process} value={process}>
                  {process}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parameters">Parameters/Prompts</Label>
          <Input
            id="parameters"
            placeholder={
              selectedProcess === "Benchmark 1"
                ? "Enter 'full' to run complete procurement analysis..."
                : "Enter parameters or prompts for the process..."
            }
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            disabled={!selectedProcess}
          />
        </div>

        <Button
          onClick={handleExecute}
          disabled={isRunning || !selectedProcess || (selectedProcess === "Benchmark 1" && !parameters)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Execute
            </>
          )}
        </Button>

        <div className="space-y-2">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            placeholder="Process output will appear here..."
            value={output}
            readOnly
            rows={12}
            className="font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualProcessRunner;
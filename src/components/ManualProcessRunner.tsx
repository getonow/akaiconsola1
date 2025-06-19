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

const API_URL = "https://akaiconsola1-backend.onrender.com/api/benchmark1";

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
      // Call the backend API for Benchmark 1
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ part_number: parameters }),
        });
        const data = await response.json();
        if (response.ok && data.status === "found") {
          setOutput(
            prev =>
              prev +
              "Part found!\n" +
              JSON.stringify(data.data, null, 2) +
              "\nProcess completed."
          );
        } else {
          setOutput(prev => prev + "Part not found.\nProcess completed.");
        }
      } catch (err: any) {
        setOutput(prev => prev + "Error: " + err.message + "\nProcess completed.");
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
                ? "Enter part number..."
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
            rows={8}
            className="font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualProcessRunner;
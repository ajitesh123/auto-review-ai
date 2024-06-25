import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Dashboard = () => {
  const [reviewResult, setReviewResult] = useState('');
  const [selfReviewResult, setSelfReviewResult] = useState('');

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    // TODO: Implement API call to /generate_review
    setReviewResult('Review generated successfully!');
  };

  const handleSelfReviewSubmit = async (event) => {
    event.preventDefault();
    // TODO: Implement API call to /generate_self_review
    setSelfReviewResult('Self-review generated successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Review Dashboard</h1>
      <Tabs defaultValue="review" className="w-full">
        <TabsList>
          <TabsTrigger value="review">Generate Review</TabsTrigger>
          <TabsTrigger value="self-review">Generate Self-Review</TabsTrigger>
        </TabsList>
        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Generate Review</CardTitle>
              <CardDescription>Fill in the details to generate a review.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReviewSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="your-role">Your Role</Label>
                    <Input id="your-role" placeholder="Enter your role" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="candidate-role">Candidate Role</Label>
                    <Input id="candidate-role" placeholder="Enter candidate's role" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="perf-question">Performance Question</Label>
                    <Input id="perf-question" placeholder="Enter performance question" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="your-review">Your Review</Label>
                    <Textarea id="your-review" placeholder="Enter your review" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="llm-type">LLM Type</Label>
                    <Select>
                      <SelectTrigger id="llm-type">
                        <SelectValue placeholder="Select LLM type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" placeholder="Enter your API key" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="model-size">Model Size</Label>
                    <Input id="model-size" placeholder="Enter model size" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Generate Review</Button>
            </CardFooter>
          </Card>
          {reviewResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Generated Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reviewResult}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="self-review">
          <Card>
            <CardHeader>
              <CardTitle>Generate Self-Review</CardTitle>
              <CardDescription>Fill in the details to generate a self-review.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSelfReviewSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="text-dump">Text Dump</Label>
                    <Textarea id="text-dump" placeholder="Enter text dump" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="questions">Questions</Label>
                    <Textarea id="questions" placeholder="Enter questions" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Enter instructions" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="llm-type-self">LLM Type</Label>
                    <Select>
                      <SelectTrigger id="llm-type-self">
                        <SelectValue placeholder="Select LLM type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="api-key-self">API Key</Label>
                    <Input id="api-key-self" type="password" placeholder="Enter your API key" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="model-size-self">Model Size</Label>
                    <Input id="model-size-self" placeholder="Enter model size" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Generate Self-Review</Button>
            </CardFooter>
          </Card>
          {selfReviewResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Generated Self-Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selfReviewResult}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useOptimization } from '@/context/OptimizationContext'

export function ResumeForm() {
  const [apiKey, setApiKey] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [requirements, setRequirements] = useState('')
  const { isLoading, generateOptimization } = useOptimization()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generateOptimization(apiKey, jobRole, requirements)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gemini API Key</label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Role</label>
        <Input
          id="jobRole"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          required
          className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Requirements</label>
        <Textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
          className="w-full h-32 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
        disabled={isLoading}
      >
        {isLoading ? 'Optimizing...' : 'Optimize Resume'}
      </Button>
    </form>
  )
}


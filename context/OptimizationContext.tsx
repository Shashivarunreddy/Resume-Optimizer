"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"

interface SavedResult {
  id: string;
  content: string;
}

interface OptimizationContextType {
  optimizationResult: string | null
  setOptimizationResult: (result: string | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  generateOptimization: (apiKey: string, jobRole: string, requirements: string) => Promise<void>
  savedResults: SavedResult[]
  saveResult: (result: string) => void
  deleteResult: (id: string) => void
  showSavedResults: boolean
  setShowSavedResults: (show: boolean) => void
}

const OptimizationContext = createContext<OptimizationContextType | undefined>(undefined)

export function OptimizationProvider({ children }: { children: ReactNode }) {
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [savedResults, setSavedResults] = useState<SavedResult[]>([])
  const [showSavedResults, setShowSavedResults] = useState(false)

  const generateOptimization = async (apiKey: string, jobRole: string, requirements: string) => {
    setIsLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const prompt = `
        As an AI assistant specializing in resume optimization, your task is to create an ATS-friendly resume summary and list of key skills based on the following job information:

        Job Role: ${jobRole}
        Company Requirements: ${requirements}

        Please provide:
        1. A concise, ATS-optimized resume summary (3-4 sentences) tailored to the job role and requirements.
        2. A list of 8-10 key skills that match the job requirements and are likely to pass ATS screening. Categorize these skills into:
           - Programming Languages
           - Technologies
           - Web Development
           - Other relevant categories as needed

        Format the output as follows:
        Summary:
        [Resume summary here]

        Key Skills:
        Programming Languages:
        - Skill 1
        - Skill 2

        Technologies:
        - Skill 3
        - Skill 4

        Web Development:
        - Skill 5
        - Skill 6

        [Other Categories]:
        - Skill 7
        - Skill 8
      `

      const result = await model.generateContent(prompt)
      const output = result.response.text()
      setOptimizationResult(output)
    } catch (error) {
      console.error('Error optimizing resume:', error)
      setOptimizationResult('Failed to optimize resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const saveResult = (result: string) => {
    const newResult: SavedResult = {
      id: Date.now().toString(),
      content: result
    }
    setSavedResults(prev => [...prev, newResult])
  }

  const deleteResult = (id: string) => {
    setSavedResults(prev => prev.filter(result => result.id !== id))
  }

  return (
    <OptimizationContext.Provider 
      value={{ 
        optimizationResult, 
        setOptimizationResult, 
        isLoading, 
        setIsLoading, 
        generateOptimization,
        savedResults,
        saveResult,
        deleteResult,
        showSavedResults,
        setShowSavedResults
      }}
    >
      {children}
    </OptimizationContext.Provider>
  )
}

export function useOptimization() {
  const context = useContext(OptimizationContext)
  if (context === undefined) {
    throw new Error('useOptimization must be used within an OptimizationProvider')
  }
  return context
}


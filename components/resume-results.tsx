"use client"


import { useOptimization } from '@/context/OptimizationContext'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ResumeResults() {
  const { optimizationResult, isLoading, saveResult } = useOptimization()
  const { toast } = useToast()

  if (!optimizationResult) {
    return null
  }

  const handleSave = () => {
    if (optimizationResult) {
      saveResult(optimizationResult)
      toast({
        title: "Result Saved",
        description: "Your optimization result has been saved successfully.",
      })
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Optimization Results</h2>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-wrap mb-4 text-gray-800 dark:text-gray-200">
        {optimizationResult}
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
        >
          Save Result
        </Button>
      </div>
    </div>
  )
}


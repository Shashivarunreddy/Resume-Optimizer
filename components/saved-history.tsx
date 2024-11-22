"use client"

import { useOptimization } from '@/context/OptimizationContext'
import { Button } from "@/components/ui/button"
import { Trash2, Save } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SavedHistory() {
  const { savedResults, deleteResult, showSavedResults, setShowSavedResults } = useOptimization()

  return (
    <>
      <Button
        onClick={() => setShowSavedResults(!showSavedResults)}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
      >
        <Save className="mr-2 h-4 w-4" />
        Saved Results ({savedResults.length})
      </Button>

      <Dialog open={showSavedResults} onOpenChange={setShowSavedResults}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Saved Results</DialogTitle>
          </DialogHeader>
          {savedResults.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No saved results yet.</p>
          ) : (
            savedResults.map((result) => (
              <div key={result.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 relative">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                  {result.content}
                </pre>
                <Button
                  onClick={() => deleteResult(result.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            ))
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}


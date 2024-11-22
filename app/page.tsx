import { ResumeForm } from '@/components/resume-form'
import { ResumeResults } from '@/components/resume-results'
import { SavedHistory } from '@/components/saved-history'
import { OptimizationProvider } from '@/context/OptimizationContext'
import { ModeToggle } from '@/components/mode-toggle'


export default function Home() {
  return (
    <OptimizationProvider>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Resume Optimizer</h1>
            <div className="flex items-center space-x-4">
              <SavedHistory />
              <ModeToggle />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <ResumeForm />
              <ResumeResults />
            </div>
          </div>
        </div>
      </main>
    </OptimizationProvider>
  )
}


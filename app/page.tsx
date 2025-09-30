import { Hero } from '@/components/layout/Hero'
import { Features } from '@/components/layout/Features'
import { CTA } from '@/components/layout/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 主要展示区域 */}
      <Hero />
      
      {/* 功能特色展示 */}
      <Features />
      
      {/* 行动号召区域 */}
      <CTA />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 装饰图标 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* 主标题 */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            准备好开始您的
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              AI驱动体验
            </span>
            了吗？
          </h2>

          {/* 副标题 */}
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            加入我们的社区，体验前所未有的智能交互，让AI助手和聊天室为您的工作和生活带来更多便利。
          </p>

          {/* 行动按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>免费注册</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/chat">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                立即体验聊天室
              </Button>
            </Link>
          </motion.div>

          {/* 特色提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-purple-100"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">免费使用</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm">无需信用卡</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm">即时启用</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

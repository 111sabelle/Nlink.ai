'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Bot, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" />
      
      {/* 动态背景元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 标题 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="block">欢迎来到</span>
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Nlink.ai
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            集成AI智能助手和实时聊天室的现代化品牌官网，
            <br className="hidden sm:block" />
            为您提供前所未有的交互体验
          </p>

          {/* 特色标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200"
            >
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">AI智能助手</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200"
            >
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">实时聊天室</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">现代化设计</span>
            </motion.div>
          </div>

          {/* 行动按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <span>开始体验</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/chat">
              <Button variant="outline" size="lg" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                进入聊天室
              </Button>
            </Link>
          </motion.div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

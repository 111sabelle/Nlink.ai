'use client'

import { motion } from 'framer-motion'
import { Bot, MessageCircle, Shield, Zap, Users, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI智能助手',
    description: '24/7在线的AI助手，为您提供智能问答和个性化服务，让沟通更高效便捷。',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: MessageCircle,
    title: '实时聊天室',
    description: '支持多人实时聊天，文件分享，表情互动，打造活跃的社区氛围。',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '采用企业级安全标准，端到端加密，保护您的隐私和数据安全。',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Zap,
    title: '极速响应',
    description: '优化的服务器架构，毫秒级响应时间，为您提供流畅的使用体验。',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: Users,
    title: '用户友好',
    description: '直观的界面设计，简单易用的操作流程，让每个人都能轻松上手。',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: Sparkles,
    title: '持续创新',
    description: '不断迭代更新，加入最新的AI技术和功能，为您带来前沿体验。',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            为什么选择
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Nlink.ai</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于为您提供最优质的AI驱动的交互体验，让技术真正服务于人
          </p>
        </motion.div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* 图标 */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* 描述 */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* 悬浮效果装饰 */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>还有更多功能正在开发中...</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

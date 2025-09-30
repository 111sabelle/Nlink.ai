import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold">Nlink.ai</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Nlink.ai 致力于为用户提供最先进的AI驱动交互体验，通过智能助手和实时聊天功能，让沟通变得更加高效和便捷。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@nlink.ai" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-400 hover:text-white transition-colors">
                  聊天室
                </Link>
              </li>
              <li>
                <Link href="/ai-agent" className="text-gray-400 hover:text-white transition-colors">
                  AI助手
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 支持与帮助 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">支持与帮助</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部分割线和版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nlink.ai. 保留所有权利。
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-2 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Nlink.ai Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

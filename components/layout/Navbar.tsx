'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, MessageCircle, Bot } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Nlink.ai</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              首页
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>聊天室</span>
            </Link>
            <Link href="/ai-agent" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1">
              <Bot size={16} />
              <span>AI助手</span>
            </Link>
            
            {/* User Menu */}
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">欢迎, {session.user?.name || session.user?.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>退出</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">登录</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">注册</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/chat" 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={16} />
                <span>聊天室</span>
              </Link>
              <Link 
                href="/ai-agent" 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1"
                onClick={() => setIsOpen(false)}
              >
                <Bot size={16} />
                <span>AI助手</span>
              </Link>
              
              {session ? (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-2">欢迎, {session.user?.name || session.user?.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>退出</span>
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">登录</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">注册</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

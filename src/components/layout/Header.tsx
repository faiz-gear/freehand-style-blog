"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-hand-thin relative mb-6 border-b py-4">
      <div className="container-hand flex items-center justify-between">
        <div className="logo">
          <Link
            href="/"
            className="font-handwriting-primary rotate-hand-slight-left text-3xl"
          >
            <span className="inline-block transform transition-transform hover:scale-110">
              Lyle的随笔涂鸦：思想的自由表达
            </span>
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <NavLink href="/">首页</NavLink>
            </li>
            <li>
              <NavLink href="/about">关于</NavLink>
            </li>
            <li>
              <NavLink href="/skills">技能</NavLink>
            </li>
            <li>
              <NavLink href="/projects">项目</NavLink>
            </li>
            <li>
              <NavLink href="/blog">博客</NavLink>
            </li>
          </ul>
        </nav>

        {/* 移动导航按钮 */}
        <button
          className="btn-hand block px-2 py-1 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-primary"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* 移动导航菜单 */}
        {isMenuOpen && (
          <div
            className="bg-paper-primary border-hand-thin shadow-hand absolute left-0 right-0 top-full z-50 p-4 md:hidden"
            style={{
              backgroundColor: "var(--color-paper-primary)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                  首页
                </NavLink>
              </li>
              <li>
                <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                  关于
                </NavLink>
              </li>
              <li>
                <NavLink href="/skills" onClick={() => setIsMenuOpen(false)}>
                  技能
                </NavLink>
              </li>
              <li>
                <NavLink href="/projects" onClick={() => setIsMenuOpen(false)}>
                  项目
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog" onClick={() => setIsMenuOpen(false)}>
                  博客
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="nav-hand font-handwriting-casual hover:text-accent-blue-dark text-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

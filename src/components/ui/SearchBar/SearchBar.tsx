"use client"

import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent, MouseEvent } from 'react'
import '@/styles/components/ui/SearchBar.scss';

interface SearchBarProps {
  onSubmit: (searchValue: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isFocused) {
      onSubmit(searchValue)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClick = (e: MouseEvent) => {
    if (!isFocused) {
      e.preventDefault() // Prevent form submission when collapsed
      setIsFocused(true)
      inputRef.current?.focus()
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`search-wrapper ${isFocused ? 'focused' : ''}`} onClick={handleClick}>
      <input
        ref={inputRef}
        autoComplete="off"
        id="input"
        type="search"
        placeholder="Search 'Top Comedy Movies'"
        value={searchValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button type="submit" className="search-button" aria-label="Search">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}

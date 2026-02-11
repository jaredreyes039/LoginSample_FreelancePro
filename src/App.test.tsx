import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.tsx'

describe('APP:Login', () => {
	test('renders', () => {
		render(<App />)
		expect(screen.getByText('Learn React')).toBeDefined()
	})
})

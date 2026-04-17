import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.tsx'

// Check frontend renders at all
describe('APP:Login', () => {
	test('renders', () => {
		render(<App />)
		expect(screen.getByText('FreelancePro')).toBeDefined()
	})
})


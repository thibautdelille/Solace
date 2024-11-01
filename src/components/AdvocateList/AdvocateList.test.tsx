import { render, screen } from '@/test/test-utils';
import { AdvocateList } from './AdvocateList';
import { describe, it, vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock the API hook
vi.mock('@/api/getAdvocates', () => ({
  useGetAdvocates: vi.fn(() => ({
    data: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        city: 'New York',
        degree: 'Ph.D.',
        specialties: ['Anxiety', 'Depression'],
        yearsOfExperience: 10,
        phoneNumber: '123-456-7890',
      },
    ],
  })),
}));

describe('AdvocateList', () => {
  it('renders the table with correct columns', () => {
    render(<AdvocateList />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.getByText('Specialties')).toBeInTheDocument();
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });

  it('displays advocate data correctly', () => {
    render(<AdvocateList />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('ANXIETY')).toBeInTheDocument();
    expect(screen.getByText('DEPRESSION')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<AdvocateList />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDatabase } from '@/context/DatabaseContext';
import { useToolkit } from '@/context/ToolkitContext';
import ToolkitList from '@/app/toolkit/components/ToolList';

// Mock the required contexts
jest.mock('@/context/DatabaseContext', () => ({
  useDatabase: jest.fn(),
}));

jest.mock('@/context/ToolkitContext', () => ({
  useToolkit: jest.fn(),
}));

describe('ToolkitList', () => {
  let mockDatabase: any; // Define the variable
  let mockToolkitContext: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Initialize mocks
    mockDatabase = {
      getFromDb: jest.fn(),
      deleteFromDb: jest.fn(),
    };

    mockToolkitContext = {
      selectedCategories: [],
    };

    (useDatabase as jest.Mock).mockReturnValue(mockDatabase);
    (useToolkit as jest.Mock).mockReturnValue(mockToolkitContext);
  });

  it('renders the component and fetches data', async () => {
    mockDatabase.getFromDb.mockResolvedValueOnce([
      {
        toJSON: () => ({
          id: '1',
          name: 'Tool 1',
          categories: ['cat1'],
          checked: false,
          infoUrl: 'http://example.com',
          imageUrl: 'http://example.com/image.jpg',
        }),
      },
    ]);

    render(<ToolkitList />);

    await waitFor(() => {
      expect(screen.getByText('Tool 1')).toBeInTheDocument();
    });
  });

  // Add other test cases as needed
});
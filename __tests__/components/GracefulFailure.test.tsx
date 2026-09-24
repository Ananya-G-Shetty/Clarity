import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UploadDropzone } from '@/components/UploadDropzone';

describe('Graceful Failure UI Tests', () => {
  it('displays user-facing error state and does not crash when an unsupported file type is uploaded', async () => {
    const handleLoaded = jest.fn();
    render(<UploadDropzone onDocumentLoaded={handleLoaded} />);

    const invalidFile = new File(['fake binary content'], 'unsupported_script.sh', {
      type: 'application/x-sh',
    });

    const input = screen.getByLabelText(/Upload legal contract file/i);

    fireEvent.change(input, { target: { files: [invalidFile] } });

    // Expect an explicit error alert
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(/Unsupported file type/i);
    expect(handleLoaded).not.toHaveBeenCalled();
  });

  it('displays error when file exceeds 5MB size limit', async () => {
    const handleLoaded = jest.fn();
    render(<UploadDropzone onDocumentLoaded={handleLoaded} />);

    // Create a 6MB mock file
    const largeContent = new Uint8Array(6 * 1024 * 1024);
    const oversizedFile = new File([largeContent], 'huge_contract.pdf', {
      type: 'application/pdf',
    });

    const input = screen.getByLabelText(/Upload legal contract file/i);

    fireEvent.change(input, { target: { files: [oversizedFile] } });

    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(/exceeds the 5.0 MB maximum limit/i);
    expect(handleLoaded).not.toHaveBeenCalled();
  });
});

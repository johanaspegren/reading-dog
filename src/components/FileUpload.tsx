import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { FileUploadData } from '../types';

interface FileUploadProps {
  onFileUpload: (data: FileUploadData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        file.type === "text/plain") {
      const text = await file.text();
      onFileUpload({
        text,
        metadata: {
          name: file.name,
          type: file.type,
          author: "",
          year: "",
          genre: "",
          difficulty: "medium"
        }
      });
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your file here, or{' '}
        <label className="cursor-pointer text-blue-500 hover:text-blue-600">
          browse
          <input
            type="file"
            className="hidden"
            accept=".docx,.txt"
            onChange={handleChange}
          />
        </label>
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supports DOCX and TXT files
      </p>
    </div>
  );
};

export default FileUpload;
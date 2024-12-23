'use client'

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="common-box" {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>파일을 여기에 드롭하세요...</p> :
            <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>
        }
      </div>
      <div>
        <h2>드롭된 파일:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px'
  }
};

export default FileDropzone;
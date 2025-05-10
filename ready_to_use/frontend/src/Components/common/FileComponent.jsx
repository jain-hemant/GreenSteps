import { downloadFile, uploadFile } from '##/src/utility/file.utility';
import React, { useState } from 'react';

const FileComponent = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const { value } = await uploadFile(file);
        if (value) {
            alert(`File uploaded successfully: ${value}`);
        } else {
            alert('File upload failed');
        }
        console.log('File uploaded successfully:', value);
        localStorage.setItem('filePath', value);
        alert('Upload clicked');
        // Implement upload logic here
    };

    const handleDownload = async () => {
        const url = localStorage.getItem('filePath');
        if (!url) {
            alert('No file path found in local storage');
            return;
        }
        await downloadFile(url);

        alert('Download clicked');

        // Implement download logic here
    };

    return (
        <div style={{ padding: 20 }}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button style={{ margin: '10px' }} onClick={handleUpload}>
                Upload
            </button>
            <button onClick={handleDownload}>
                Download
            </button>
        </div>
    );
};

export default FileComponent;

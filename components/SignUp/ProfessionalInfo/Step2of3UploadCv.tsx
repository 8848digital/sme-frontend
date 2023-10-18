import React, { useState } from 'react'

const Step2of3UploadCv = () => {
    const [selectedFile, setSelectedFile] = useState<any>('');

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDeleteFile = () => {
        setSelectedFile('');
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="text-center" style={{ marginTop: '150px' }}>
                        <h1>Step 2 of 3</h1>
                        <h3>Professional Information</h3>
                    </div>
                    <div className='mt-5 text-center'>
                        <form>
                            <div className="mb-3 file-input-wrapper">
                                <label htmlFor="cvUpload" className="file-input-button">
                                    Upload CV
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="cvUpload"
                                    name="cv"
                                    accept=".pdf, .doc, .docx"
                                    onChange={handleFileChange}
                                />
                                {selectedFile ? (
                                    <div className="file-attachment">
                                        <a
                                            href={URL.createObjectURL(selectedFile)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={selectedFile.name}
                                            className="file-attachment-link"
                                        >
                                            {selectedFile.name}
                                        </a>

                                    </div>
                                ) : (
                                    <div className="file-attachment-link">No file chosen</div>
                                )}
                            </div>

                            {/* Add more form fields for professional information here */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2of3UploadCv;
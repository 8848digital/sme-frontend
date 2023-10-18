import React, { useState } from 'react'

const EnterBio = () => {
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
            <div className="row" style={{marginTop:'150px'}}>
                <div className="col-12">
                    <div className="text-center">
                        <h1>Enter Your Bio Here</h1>
                        <h3></h3>
                    </div>
                    <div className='mt-5'>
                        <div className="mb-3">
                            {/* <label htmlFor="exampleFormControlTextarea1" className="form-label">E</label> */}
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterBio;
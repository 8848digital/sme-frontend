import Link from "next/link";

const Step1EnterEmail = ({ formData, onFormDataChange }:any) => {
    // Handle the form field change
    const handleEmailChange = (e:any) => {
        const email = e.target.value;

        // Call the parent's (WizardMaster's) onFormDataChange to update the formData
        onFormDataChange('email', email);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    
                    <div className="col-12">
                        <div className='text-center' style={{marginTop:'150px'}}>
                            <h1>Step 1 of 3</h1>
                            <h3>Personal Information</h3>
                            <div className='mt-4 d-flex align-items-center justify-content-center'>
                                <input
                                    className="form-control w-75 me-2 input-filed-height"
                                    type="email"
                                    placeholder='Enter Email ...'
                                    value={formData.email} // Bind value to the Redux state
                                    onChange={handleEmailChange} // Handle change and update state
                                />
                                {/* <button type='button' className='btn btn-secondary background'>Send</button> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-12">
                        <div className='text-end'>
                        
                            <Link href='/step2-varification-code' className='btn btn-next'>Next</Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};
export default Step1EnterEmail
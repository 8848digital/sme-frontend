import Link from 'next/link';
import React from 'react';

const ActiveContractCard = ({ filteredContractsActiveUnsigned }: any) => {
    console.log('job contract active in card', filteredContractsActiveUnsigned);
    return (
        <>
            <div className="col-12" >
                <table className="table table-bordered">
                    <thead className="p-2">
                        <tr className="">
                            <th>Project Name</th>
                            {/* <th className="text-center">Status</th> */}
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {filteredContractsActiveUnsigned && filteredContractsActiveUnsigned.length > 0 ? (
                        filteredContractsActiveUnsigned.map((data: any, index: any) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>
                                            <h2>{data?.custom_project_name}</h2>
                                        </td>
                                        {/* <td className="text-center">
                                            <h2>{data?.status}</h2>
                                        </td> */}
                                        <td className="text-center">

                                            <Link className='color' href={data?.contract_pdf_url} target='_blank'> View Full</Link>

                                        </td>
                                    </tr>
                                </tbody>

                            );
                        })
                    ) : <div className='text-center'>
                        <p>'No Data Available'</p>
                    </div>}
                </table>
            </div>
        </>
    );
};

export default ActiveContractCard;

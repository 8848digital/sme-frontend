
import Link from 'next/link';
import React from 'react'

const InactiveContractCard = ({ filteredContractsInactive }: any) => {
    console.log('job contract inactive in card', filteredContractsInactive);
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
                {filteredContractsInactive && filteredContractsInactive.length > 0 ? (
                    filteredContractsInactive.map((data: any, index: any) => {
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
                                            <Link href={data?.contract_pdf_url} target="_blank">
                                                <button
                                                    className="btn btn-later"
                                                    style={{ width: "auto" }}
                                                // onClick={handleReadContractClick}
                                                >
                                                View Full
                                                </button>
                                            </Link>

                                            <Link className='color' href={data?.contract_pdf_url} target='_blank'> </Link>

                                        </td>
                                </tr>
                            </tbody>

                        );
                    })
                ) : <div className='text-center'>
                <p>No Data Available</p>
            </div>}
            </table>
        </div>
        </>
    )
}

export default InactiveContractCard
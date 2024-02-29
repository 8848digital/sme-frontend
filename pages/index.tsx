import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import LandingPage from '@/components/LandingPage/LandingPage'
import { CONSTANTS } from '@/services/config/api-config'
import MetaTag from '@/services/api/general_api/meta-tag-api'
import Header from '@/components/Header'

export default function Home(fetchedDataFromServer: any) {
  return (
    <>
    <Header meta_data={fetchedDataFromServer} />
    <LandingPage/> 
    </>
  )
}
export async function getServerSideProps(context: any) {
  let fetchedDataFromServer: any = {};
  const method = "get_sme_meta_tags";
  const version = "v1";
  const entity = "seo";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split("?")[0]}`;

  let meta_data: any = await MetaTag(
    `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&page_name=${url}`
  );
  if (
    meta_data?.status === 200 &&
    meta_data?.data?.message?.msg === "success" &&
    meta_data?.data?.message?.data !== null
  ) {
    fetchedDataFromServer = meta_data?.data?.message?.data;
  } else {
    fetchedDataFromServer = {};
  }

  return { props: fetchedDataFromServer };
}
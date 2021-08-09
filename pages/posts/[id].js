import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import Head from "next/head";
import Date from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date}/>
    
    </Layout>
  );
}

export async function getStaticPaths() {
  // return list of all possible 'id' value
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // fect data for post using Id.

  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

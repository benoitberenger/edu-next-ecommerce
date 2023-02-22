import Layout from "../../components/Layout";
import Title from "../../components/Title";

export default function BlogPost({article}){
    return (
        <Layout>
            <Title>{article.attributes.Title}</Title>

            <p>{article.attributes.Content}</p>
        </Layout>
    )
}

export async function getStaticProps(context){
    console.log(context);
    const slug = context.params.url;

    // 'blogArticles(filters: {Slug: {eq: "premier-article"}}) {'

    const query = `
    query {
        blogArticles(filters: {Slug: {eq: "${slug}"}}) {
          data {
            id
            attributes {
              Title
              Date
              Slug
              Content
            }
          }
        }
      }` 

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query, 
        variables: {
            slug: slug
        }})  
  }

  const response = await fetch('http://localhost:1337/graphql', options)   
  const responseJson = await response.json();

  console.log(responseJson.data)

  return {
    props: {
      article: responseJson.data?.blogArticles.data[0] || null,
    }
  }
}

export async function getStaticPaths() {
    const query = `
    query {
        blogArticles {
            data {
                attributes {
                    Slug
                }
            }
        }
    }` 

    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})  
    }

    const response = await fetch('http://localhost:1337/graphql', options)   
    const responseJson = await response.json();
    console.log(responseJson.data.blogArticles);

    const paths = responseJson.data.blogArticles.data.map((article) => { return `/blog/${article.attributes.Slug}` })
    console.log('paths', paths);

return {
    paths,
    fallback: false,
}
}
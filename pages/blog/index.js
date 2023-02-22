import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from 'next/link'

export default function Blog({articles}){
    return (
        <Layout>
            <Title>Liste des articles</Title>

            {articles.map(article => (
                <Link href={`/blog/${article.attributes.Slug}`}>
                    <h4 key={article.id}>{article.attributes.Title}</h4>
                </Link>
            ))}
        </Layout>
    )
}

export async function getStaticProps(){

    const query = `
    query {
        blogArticles {
          data {
            id
            attributes {
              Title
              Date
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

  return {
    props: {
      articles: responseJson.data?.blogArticles.data || [],
    }
  }
}
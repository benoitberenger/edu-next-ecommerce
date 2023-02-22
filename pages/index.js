import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Title from '../components/Title'
import styles from '../styles/Home.module.css'

export default function Home({products, categories}) {

  console.log(products);

  return (
    <>
    <Layout leftComponent={<Title>Gauche</Title>}>
      {
        products.map(product => (
          <>
          <Title key={product.id}>{product.attributes.name}</Title>
          </>
        ))
      }

      {
        products.map(product => {

          console.log(product.attributes.media)

          return (
              <>
              <Title key={product.id}>{product.attributes.name}</Title>
               <Image alt="Image du produit" src={`http://localhost:1337${product.attributes.media.data.attributes.url}`} width="500" height="300"/>
              </>
          )
        })
      }

          <Title customColor='yellow'>Titre du site</Title>
          <Title customColor='orange'>Titre du site</Title>
          <Title customColor='blue'>Titre du site</Title>
    </Layout>
    </>
  )
}

export async function getStaticProps(){

  console.log('TEST')

  const query = `
    query {
      products {
        data{
          id
          attributes{
            media {data{attributes{url}}}
            name
            category
            {
              data
              {
                attributes
                {
                  name
                }
              }
            }
          }
        }
      }  
    }
  ` 

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})  
  }

  const response = await fetch('http://localhost:1337/graphql', 
      options
    )   
  const responseJson = await response.json()

  return {
    props: {
      products: responseJson.data?.products.data || [],
      categories: []
    }
  }
}
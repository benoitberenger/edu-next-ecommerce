import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Title from '../components/Title'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
{/*       <h1>Bienvenue sur mon site de bonbons</h1> */}    
          <Title customColor='green'>Titre du site</Title>
          <Title customColor='yellow'>Titre du site</Title>
          <Title customColor='orange'>Titre du site</Title>
          <Title customColor='blue'>Titre du site</Title>
      </Layout>
  )
}
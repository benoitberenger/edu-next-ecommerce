import Layout from "../components/layout";
import Title from "../components/Title";

export default function Portfolio({spacex}){

    console.log(spacex);

    return(
        <Layout>
            
            <Title customColor="orange">Mon portfolio</Title>

            {
                spacex.map((launch, index) => (
                    <h2 key={index}>{launch.rocket.rocket_name}</h2>
                ))
            }
        </Layout>
    )
}

export async function getServerSideProps(){

    const res = await fetch('https://api.spacexdata.com/v3/launches/');
    const resp = await res.json();

    /* FETCH */
    let spacexData = resp;

    return {
        props: {
            spacex: spacexData
        }
    }
}
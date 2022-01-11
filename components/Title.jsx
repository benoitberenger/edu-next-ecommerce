import style from '../styles/Titre.module.css'

export default function Title({children, customColor}){
    return (
        <h1 className={style.heading} style={{color: customColor}}>Titre: {children}</h1>
    )
}
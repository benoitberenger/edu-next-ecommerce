export default function Title({children, customColor}){
    return (
        <h1 style={{color: customColor}}>{children}</h1>
    )
}
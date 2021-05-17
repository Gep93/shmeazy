import { StyledShoppingListCard } from "./style";

// const RecipeCard = ({children, ...rest}: {children: {listName: string, listCreated: string}, [key: string]: any}) => {
const RecipeCard = ({name, created, ...rest}: {name: string, created: string, [key: string]: any}) => {    
    return(
        <StyledShoppingListCard {...rest}>
            <div style={{textAlign: "right", fontSize:"14px", paddingBottom:"0"}}>{created}</div>
            <div>{name}</div>
            <div style={{textAlign: "right", fontSize:"14px", visibility:"hidden"}}>s</div>
        </StyledShoppingListCard>
    );
}

export default RecipeCard;
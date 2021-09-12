import FlexContainer from "../../FlexContainer";
import FlexItem from "../../FlexItem";
import { StyledShoppingListCard } from "./style";
import { background } from "../../../styles/colors";
import useToggleState from "../../../hooks/useToggleState";
import { boolean } from "joi";
import unixTimeToFullDate from "../../../helpers/dateTime";

// const RecipeCard = ({children, ...rest}: {children: {listName: string, listCreated: string}, [key: string]: any}) => {
const RecipeCard = ({id, name, created, click, updateIds, toDelete, deleteMany, ...rest}: {id: string, name: string, created: string, click:(id: string)=>void, updateIds: ({type, id}:{type: string, id: string})=>void, toDelete: boolean, deleteMany: boolean, [key: string]: any}) => {    

    const handleClick = () => {
        click(id);
    }

    const handleChange = () => {
        let type = 'ADD_ID';
        if(toDelete) type='REMOVE_ID';
        updateIds({type, id});
    }
    return(
        // <StyledShoppingListCard {...rest}>
        //     <div style={{textAlign: "right", fontSize:"14px", paddingBottom:"0"}}>{created}</div>
        //     <div>{name}</div>
        //     <div style={{textAlign: "right", fontSize:"14px", visibility:"hidden"}}>s</div>
        // </StyledShoppingListCard>
        <FlexContainer padding="20px" height="auto" background={background.shmeazyLightBlack} onClick={handleClick}>
            <FlexItem alignEnd fontSize="16px">
                {unixTimeToFullDate(created)}
            </FlexItem>
            <FlexContainer height="auto" row spaceBetween>
                <FlexItem>
                    {name}
                </FlexItem>
                <FlexItem>
                    { 
                        deleteMany ?
                        <input 
                            type="checkbox" 
                            checked={toDelete} 
                            style={{height: "15px", width:"15px"}} 
                            onChange={handleChange} 
                            onClick={(e)=>e.stopPropagation()}
                        /> : ""
                    }
                </FlexItem>
            </FlexContainer>
            <FlexItem alignEnd>
                <span style={{visibility: "hidden"}}>&nbsp;</span>
            </FlexItem>
        </FlexContainer>
    );
}

export default RecipeCard;
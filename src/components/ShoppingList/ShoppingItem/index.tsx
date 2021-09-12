import Button from "../../Button";
import FlexItem from "../../FlexItem";
import FlexContainer from "../../FlexContainer";
import { ICard, IItem } from "../../../../types";
import PopupContainer from "../../PopupContainer";
import { background } from "../../../styles/colors";
import { CLICK } from "../../../helpers/shoppingItems";
import useClickType from "../../../hooks/useClickType";
import { useTheme } from "../../../contexts/ThemeProvider";
import React, { ChangeEvent, FormEvent, useState } from "react";

const ShoppingItem = ({children}:{children:any}) => <>{children}</>;
const Card = ({id, item, toDelete, expandItem, editItem, deleteMany, updateIds, singleClick, doubleClick}: ICard & {id?:string}) => {
    const {theme} = useTheme();
    const singleOrDouble = useClickType();

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        editItem && editItem(item._id!);      
    }

    const handleCheck = (e: ChangeEvent) => {
        let type = 'ADD_ID';
        if(toDelete) type='REMOVE_ID';
        updateIds({type, id: item._id!});
    }

    const handleClickItem = async () => {
        const click = await singleOrDouble();
        if(click===CLICK.SINGLE) return item.note ? singleClick && singleClick(item._id!) : singleClick && singleClick();
        if(click===CLICK.DOUBLE) return doubleClick && doubleClick(item._id!);
    }

    let pencil = <i className="fas fa-pencil-alt" onClick={(e:React.MouseEvent)=>handleEdit(e)}></i>;
    if(deleteMany || item.checked) pencil = <i className="fas fa-pencil-alt" style={{color: "transparent"}}></i>;
    let note = <i className="far fa-sticky-note"></i>;
    if(deleteMany || item.checked || !item.note) note = <i className="far fa-sticky-note" style={{color: "transparent"}}></i>;

    const textDecoration = {textDecoration: item.checked && !expandItem ? "line-through" : ""}
    let _item =  <span style={textDecoration}>
                    <span>{item.name}</span>:{item.quantity ? <span> {item.quantity}{item.unit ? " " + item.unit : ""}</span> : ""}<span>{item.packaging ? " in " + item.packaging : ""} </span>
                </span>

    const backgroundColor = item.checked ? background.shmeazyLightBlack : background.shmeazyLightBlack;
    return(
        <FlexContainer row padding="0px" height="auto" onClick={handleClickItem} alignItems="center">
            <FlexContainer id={item._id!} padding="30px" background={backgroundColor} zIndex={2} height="auto" width="100%">
                <FlexItem alignEnd>
                    {pencil}
                </FlexItem>
                {/* <FlexItem zIndex="2"> */}
                    <FlexContainer row position="relative" height="auto" spaceBetween padding="10px 0px 10px 0px">
                        <FlexContainer height="auto" position="relative">
                            <FlexItem>
                                {_item}
                            </FlexItem>
                            <FlexItem>
                                {expandItem ? <><div style={{marginTop:"20px",...textDecoration}}>Note:</div>
                                <div style={{...textDecoration}}>{item.note}</div></> : <></>}
                            </FlexItem>
                        </FlexContainer>
                        <FlexItem>
                            {deleteMany ? <input type="checkbox" checked={toDelete} onChange={(e) => handleCheck(e)} onClick={(e)=>e.stopPropagation()}/> : <></>}
                            {item.checked && !deleteMany ? <i className="fas fa-check"></i> : <></>}
                        </FlexItem>
                    </FlexContainer> 
                {/* </FlexItem>  */}
                <FlexItem alignEnd>
                    {note}
                </FlexItem>
            </FlexContainer>
            <FlexItem zIndex={1} position="absolute" right="10%">
                <i className="fa fa-trash" aria-hidden="true"></i>
            </FlexItem>
        </FlexContainer>
    );
}
const Form = ({currentItem, inputs, textAreas, cancelForm, saveItem}:{currentItem: IItem & {[key:string]: string}, inputs: string[], textAreas: string[], cancelForm: () => void, saveItem: (item: IItem) => void}) => {
    const {theme} = useTheme();
    const [item, setItem] = useState(currentItem);

    const handleChange = (e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, name: string) => {
        setItem({...item, [name]: e.currentTarget.value});
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveItem(item);
    }

    return (
        <PopupContainer show>
        <FlexContainer center width="100%" padding="20px" height="auto" background={background.shmeazyLightBlack}>
            <FlexItem maxWidth="600px" width="100%" alignCenter justifyCenter>
                <form onSubmit={handleSubmit}>
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr style={{width:"100%"}}>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputs.map((input: string)=>{
                                return <Input name={input} value={item[input]} handleChange={handleChange}/>
                            })}
                            {textAreas.map((textArea)=>{
                                return <TextArea  name={textArea} value={item[textArea]} handleChange={handleChange}/>
                            })}
                        </tbody>
                    </table>
                    <FlexContainer row spaceBetween height="auto">
                        <Button border={theme.color.shmeazyWhite} margin="0px" width="30%" type="submit">Save</Button>
                        <Button border={theme.color.shmeazyWhite} width="30%" onClick={cancelForm}>Cancel</Button>
                    </FlexContainer>
                </form>
            </FlexItem>
        </FlexContainer>
    </PopupContainer>
    );
}
const Input = ({value, name, handleChange}: {value: string, name: string, handleChange: (e: FormEvent<HTMLInputElement>, name: string) => void}) => {
    return (
        <tr>
            <td style={{paddingRight:"20px"}}>
                <label htmlFor={name}>{name}:</label>
            </td>
            <td>
                <input style={{width:"100%"}} id={name} name={name} type="text" value={value} onChange={(e: FormEvent<HTMLInputElement>)=> handleChange(e,name)} />
            </td>
        </tr>
    );
}
const TextArea = ({name, value, handleChange}: {name: string, value: string, handleChange: (e: ChangeEvent<HTMLTextAreaElement>, name: string) => void}) => {
    return(
        <tr>
            <td style={{paddingRight:"20px"}}>
                <label htmlFor={name}>{name}:</label>
            </td>
            <td>
                <textarea style={{width: "100%"}} id={name} name={name} value={value} rows={5} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e, name)} />
            </td>
        </tr>
    )
}

ShoppingItem.Card = Card;
ShoppingItem.Form = Form;

export default ShoppingItem;
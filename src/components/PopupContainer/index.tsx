import React, { FormEvent } from "react";
import useInputState from "../../hooks/useInputState";
import Button from "../Button/index";
import StyledPopupContainer from "./style"

const PopupContainer = ({children, show}:{children: HTMLElement | JSX.Element | null, show: boolean}) => {
    return(
        show ? <StyledPopupContainer>
            {children}
        </StyledPopupContainer> : null
    );
}

const ShoppingListTitleForm = ({cancel, confirm}:{cancel: (e:any)=>void, confirm: (e:any) => void}) => {

    const [title, handleChange, reset] = useInputState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        confirm(title);
    }

    const handleCancel = (e:React.MouseEvent) => {
        e.preventDefault();
        cancel(e);
    }

    return(
        <div style={{width:"100%", background:"#0B0E11", padding: "50px", color: "#c8c8c8"}}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="titleName">Shopping list name:</label>
            <input id="titleName" name="titleName" type="text" value={title} onChange={handleChange} style={{padding:"10px", width:"100%"}} />
            <div style={{paddingTop:"10px"}}>
                <Button width="auto" light margin="0 10px 0 0" type="submit">Confirm</Button>
                <Button width="auto" light onClick={handleCancel}>Cancel</Button>
            </div>
        </form>
    </div>
    );
}

PopupContainer.ShoppingListTitleForm = ShoppingListTitleForm;

export default PopupContainer;
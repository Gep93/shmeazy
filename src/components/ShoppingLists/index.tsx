import Font from "../Font/index";
import ScrollY from "../ScrollY";
import BigHeader from "../BigHeader";
import FlexContainer from "../FlexContainer/index";
import HorizontalSpacer from "../HorizontalSpacer";
import VerticalSpacer from "../VerticalSpacer";
import ShoppingListCard from "../ShoppingListCard/index";

import {useEffect, useState} from "react";
import {getLists} from "../../services/httpServices";

import {localStorageHasJWT} from "../../helpers/localstorage";
//.blue::-webkit-scrollbar {
    //display: none;
//}
interface ILists {
    _id: string,
    shoppingLists: IList[]
}

interface IList {
    name: string,
    created: string,
    quantity: string,
    unit: string,
    packaging: string,
    note: string
}
const ShoppingLists = () => {
    const [lists, setLists] = useState<null | ILists>(null);

    useEffect(() => {
        if(!localStorageHasJWT()) return; 
        (async() => {
            let token: string = localStorage.getItem("jwt") as string;
            let lists: any = await getLists(token);
            setLists(lists.data);
        })();
    }, []);

    return (
        <FlexContainer>
            <BigHeader pTop="30px">Shopping Lists</BigHeader>
            <Font fontSize="ShmeazyMedium">
                <FlexContainer row spaceBetween height="auto" padding="0 10px 40px 10px">
                        <span>My Lists</span>
                        <FlexContainer row padding="0" height="auto">
                            <i className="fas fa-plus"></i>
                            <HorizontalSpacer />
                            <i className="far fa-clock"></i>
                            <HorizontalSpacer />
                            <i className="fas fa-trash"></i>
                        </FlexContainer>
                </FlexContainer>               
            </Font>
                <ScrollY>
                    {lists && lists.shoppingLists.map((list: IList) => {
                        const {name, created} = list;
                            return(
                                <>
                                    <ShoppingListCard shmeazyLightBlack name={name} created={created} />
                                    <VerticalSpacer smallSpacer/>
                                </>
                            );
                        })
                    }
                </ScrollY>
        </FlexContainer>
    );
}

export default ShoppingLists;
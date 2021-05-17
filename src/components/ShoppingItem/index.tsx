import FlexContainer from "../FlexContainer";
import FlexItem from "../FlexItem";
import Font from "../Font";


{
    /* <div style={{display: "flex", flexDirection:"column", background:"#15171F", width:"100%", padding:"20px", color:"#c8c8c8", fontSize:"20px"}}>
<div style={{alignSelf:"flex-end"}}>X</div>
<div style={{alignSelf:"flex-start"}}><span> Milk </span>-<span> 1x1,5l </span>-<span> glass bottle </span></div>
<div style={{alignSelf:"flex-end"}}>Y</div>
</div> */}
const ShoppingItem = () => {
    return(
        <Font>
            <FlexContainer padding="20px" height="auto" shmeazyLightBlack>
                <FlexItem alignEnd>X</FlexItem>
                <FlexItem alignStart><span><span> Milk </span>-<span> 1x1,5l </span>-<span> glass bottle </span></span></FlexItem>
                <FlexItem alignEnd>Y</FlexItem>
            </FlexContainer>
        </Font>
    );
}

export default ShoppingItem;